import React, { useContext, useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, Pressable, SafeAreaView, BackHandler, TextInput, Alert, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileContext } from './ProfileContext';
import mascot from '../../assets/logo-test.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../api';
import { Circle, G, Svg } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const CircularProgress = ({ steps = 2500, goal = 5000, radius = 50, unit = "pas" }) => {
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const percentage = Math.min((steps / goal) * 100, 100); // Limite à 100 %
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg height={radius * 2} width={radius * 2}>
        <G rotation="-90" origin={`${radius}, ${radius}`}>
          {/* Background Circle */}
          <Circle
            stroke="#d3d3d3"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Circle */}
          <Circle
            stroke="#4CAF50"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </G>
      </Svg>
      <Text style={styles.percentageText}>{`${percentage.toFixed(0)}%`}</Text>
      <Text style={styles.stepsText}>{`${steps} / ${goal} ${unit}`}</Text>
    </View>
  );
};

const HomeScreen = ({ navigation, route }) => {
  const { profile, setProfile, saveProfile, markFirstVisitComplete, checkStepsXP, calculateLevel, LEVEL_DATA } = useContext(ProfileContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [webModalVisible, setWebModalVisible] = useState(false);
  const [webUrl, setWebUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [extractedCode, setExtractedCode] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    weight: '',
    gender: ''
  });

  const isFormValid = () => {
    return formData.firstName.trim() !== '' &&
           formData.lastName.trim() !== '' &&
           formData.age.trim() !== '' &&
           formData.weight.trim() !== '' &&
           formData.gender !== '';
  };

  const isProfileIncomplete = !profile.firstName || !profile.lastName || !profile.gender || !profile.age || !profile.weight;

  const [steps, setSteps] = useState(0);
  const [loading, setLoading] = useState(true);
  const [heartRateAverage, setHeartRateAverage] = useState(0);
  const [lastRefreshTime, setLastRefreshTime] = useState(0);

  const [stepsError, setStepsError] = useState(false);
  const [heartRateError, setHeartRateError] = useState(false);

  const webViewRef = useRef(null);


//constructeur du lien vers api withings auth
  const buildWithingsUrl = async () => {
    console.log("⚠️ buildWithingsUrl called");
    try {
      let email = await AsyncStorage.getItem('email');
      
      // 请求后端获取 client_id
      const response = await api.post('client_id/', { email });
      const clientId = response.data.client_id;
  
      if (!clientId) {
        throw new Error('client_id non reçu du serveur');
      }
  
      // 构建完整的 redirect_uri
      const redirectUri = encodeURIComponent(api.defaults.baseURL + 'get_code/');
      email = encodeURIComponent(email);
      // 构建完整的 Withings OAuth URL
      const withingsUrl = `https://account.withings.com/oauth2_user/authorize2` +
        `?response_type=code` +
        `&client_id=${clientId}` +
        `&state=${clientId}` +
        `&scope=user.activity,user.metrics` +
        `&redirect_uri=${redirectUri}`;
  
      return withingsUrl;
  
    } catch (error) {
      console.error('Erreur lors de la génération URL:', error);
      throw error;
    }
  };




  useEffect(() => {
    if (profile.isFirstVisit) {
      markFirstVisitComplete();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const refresh = route.params?.refresh;
      if (refresh) {
        const loadProfile = async () => {
          try {
            const savedProfile = await AsyncStorage.getItem('userProfile');
            if (savedProfile) {
              const parsedProfile = JSON.parse(savedProfile);
              setProfile(parsedProfile);
            }
          } catch (error) {
            console.error('Erreur lors du rechargement du profil:', error);
          }
        };
        loadProfile();
      }
    }, [route.params?.refresh])
  );

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
        }
      } catch (error) {
        console.error('Erreur lors du rechargement du profil:', error);
      }
    };
    loadProfile();
  }, [profile.XP]);


  /*  update 
  const fetchData = async () => {
    try {
      setLoading(true);
      setStepsError(false);
      setHeartRateError(false);

      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];

      const stepsResponse = await fetch('https://wbsapi.withings.net/v2/measure', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${profile.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=getactivity&startdateymd=${formattedDate}&enddateymd=${formattedDate}`,
      });

      const stepsData = await stepsResponse.json();

      if (stepsData.status === 0) {
        const currentSteps = stepsData.body.activities.length > 0 ? stepsData.body.activities[0].steps : 0;
        setSteps(currentSteps);
        await checkStepsXP(currentSteps);
        console.log("Requête steps réussie")
      } else {
        setSteps('N/A');
        console.log("Erreur requête steps")
      }

      const now = new Date();
      const currentTimestamp = Math.floor(now.getTime() / 1000);
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const midnightTimestamp = Math.floor(midnight.getTime() / 1000);

      const bpmResponse = await fetch('https://wbsapi.withings.net/v2/measure', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${profile.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=getintradayactivity&startdate=${midnightTimestamp}&enddate=${currentTimestamp}`,
      });

      const bpmData = await bpmResponse.json();

      if (bpmData.status === 0) {
        if (bpmData.body.series) {
          const seriesArray = Object.values(bpmData.body.series);
          const heartRates = seriesArray
            .filter(item => item.heart_rate != null)
            .map(item => item.heart_rate);

          if (heartRates.length > 0) {
            const averageBPM = heartRates.reduce((sum, rate) => sum + rate, 0) / heartRates.length;
            setHeartRateAverage(Math.round(averageBPM));
            console.log("BPM trouvé :", averageBPM);
          } else {
            setHeartRateAverage('N/A');
            console.log("Pas de BPM dans les données");
          }
        } else {
          setHeartRateAverage('N/A');
          console.log("Pas de séries dans les données");
        }
      } else {
        setHeartRateAverage('N/A');
        console.log("Erreur requête BPM");
      }
    } catch (error) {
      console.error('Erreur API :', error);
      setSteps('N/A');
      setHeartRateAverage('N/A');
    } finally {
      setLoading(false);
    }
  };*/



  //get code from withings, obsolete
  /*
  const handleLinkWithings = async (code) => {
    const url = 'https://wbsapi.withings.net/v2/oauth2';
    const params = new URLSearchParams({
      action: 'requesttoken',
      grant_type: 'authorization_code',
      client_id: '8c470e0841b5b9219c53916974da08e69fa7334d5b51a2e607078404619cbf25',
      client_secret: '77f0088525010a3bd6ab17df6d34c0423aa4c16ced8ede88e00b8a26d9da288b',
      code: code,
      redirect_uri: 'https://oauth.pstmn.io/v1/callback',
    });
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
  
      const data = await response.json();
      console.log('Réponse de l\'API Withings :', data);

      if (data.body) {
        const accessToken = data.body.access_token;
        const refreshToken = data.body.refresh_token;
    
        const updatedProfile = {
          ...profile,
          access_token: accessToken,
          refresh_token: refreshToken,
          isWithingsLinked: true,
        };
    
        setProfile(updatedProfile);
    
        await saveProfile(updatedProfile);
      }

    } catch (error) {
      console.error('Erreur lors de la requête à Withings :', error);
    }
  };*/




  //lien vers withings auth
  useEffect(() => {
    let interval;
  
    if (webModalVisible) {
      interval = setInterval(async () => {
        console.log('URL actuelle :', currentUrl);
  
        const codeMatch = currentUrl.match(/code=([^&]+)/);
  
        if (currentUrl.includes('/api/get_code') && codeMatch) {
          const code = codeMatch[1];
  
          try {
            const response = await fetch(currentUrl, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
              }
            });
  
            const data = await response.json();
            console.log("✅ Réponse backend :", data);
  
            setExtractedCode(code);
  
            const updatedProfile = {
              ...profile,
              isWithingsLinked: true
            };
  
            await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            setProfile(updatedProfile); //更新内存中的状态
  
            console.log('✅ Redirection vers le backend détectée');
            setWebModalVisible(false);
            Alert.alert("Succès", "Compte Withings lié avec succès !");
          } catch (err) {
            console.error("❌ Erreur pendant la liaison Withings :", err);
            Alert.alert("Erreur", "Échec de la liaison Withings.");
          }
  
          clearInterval(interval); // 停止轮询
        }
      }, 500);
    }
  
    return () => {
      clearInterval(interval);
    };
  }, [webModalVisible, currentUrl]);
  





/*  refreshtoken, obsolete
  const refreshToken = async () => {
    const threeHoursInMs = 3 * 60 * 60 * 1000;
    const now = Date.now();
    
    if (profile.lastRefreshTime && (now - profile.lastRefreshTime) < threeHoursInMs) {
      const timeLeft = Math.ceil((threeHoursInMs - (now - profile.lastRefreshTime)) / (60 * 1000));
      Alert.alert(
        'Refresh non autorisé',
        `Vous devez attendre ${timeLeft} minutes avant de pouvoir rafraîchir le token.`
      );
      return;
    }

    const url = 'https://wbsapi.withings.net/v2/oauth2';
    const params = new URLSearchParams({
      action: 'requesttoken',
      grant_type: 'refresh_token',
      client_id: '8c470e0841b5b9219c53916974da08e69fa7334d5b51a2e607078404619cbf25',
      client_secret: '77f0088525010a3bd6ab17df6d34c0423aa4c16ced8ede88e00b8a26d9da288b',
      refresh_token: profile.refresh_token,
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const data = await response.json();
      console.log('Réponse de l\'API Withings pour le refresh token :', data);

      if (data.body) {
        const accessToken = data.body.access_token;
        const refreshToken = data.body.refresh_token;
    
        const updatedProfile = {
          ...profile,
          access_token: accessToken,
          refresh_token: refreshToken,
          lastRefreshTime: now,
        };
    
        setProfile(updatedProfile);
        await saveProfile(updatedProfile);
        Alert.alert('Succès', 'Le token a été rafraîchi avec succès.');
      }
    } catch (error) {
      console.error('Erreur lors de la requête pour rafraîchir le token :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors du rafraîchissement du token.');
    }
  };
*/
  const handleSaveProfile = async () => {
    if (!formData.firstName || !formData.lastName || !formData.age || !formData.weight) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const age = parseInt(formData.age);
    if (isNaN(age) || age < 0 || age > 120) {
      Alert.alert('Erreur', 'Veuillez entrer un âge valide');
      return;
    }

    const weight = parseFloat(formData.weight);
    if (isNaN(weight) || weight < 20 || weight > 300) {
      Alert.alert('Erreur', 'Veuillez entrer un poids valide');
      return;
    }

    const updatedProfile = {
      ...profile,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      weight: formData.weight,
      gender: formData.gender
    };

    try {
      await saveProfile(updatedProfile);
      setProfile(updatedProfile);
      setModalVisible(false);
      Alert.alert('Succès', 'Vos informations ont été enregistrées avec succès !');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement');
    }
  };

  const handleStepsNA = () => {
    if (steps === 'N/A') {
      Alert.alert(
        'Données non disponibles',
        'Les données ne sont pas accessibles. Essayez de rafraîchir votre token puis vos données.',
        [
          {
            text: 'OK',
            style: 'default'
          }
        ]
      );
    }
  };

  const getProgressToNextLevel = (currentXP) => {
    const level = calculateLevel(currentXP);
    const nextLevelXP = LEVEL_DATA.getXPForLevel(level + 1);
    const progress = (currentXP % nextLevelXP) / nextLevelXP * 100;
    return progress;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient 
        colors={['#6dd5ed', '#2193b0']} 
        style={[styles.container, { height: '100%' }]}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.welcomeText}>
            {profile.isFirstVisit ? 'Bienvenue sur APA App !' : 'Bon retour sur APA App !'}
          </Text>

          {isProfileIncomplete && (
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setModalVisible(true)}
              >
                <MaterialIcons name="person" size={width > 600 ? 28 : 24} color="#fff" />
                <Text style={styles.actionButtonText}>
                  Complétez vos informations personnelles
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalOverlay}
            >
              <View style={styles.modalContent}>

                  <Text style={styles.modalTitle}>Vos informations</Text>
                  
                  <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChangeText={(text) => setFormData({...formData, firstName: text})}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    value={formData.lastName}
                    onChangeText={(text) => setFormData({...formData, lastName: text})}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Âge"
                    keyboardType="numeric"
                    value={formData.age}
                    onChangeText={(text) => setFormData({...formData, age: text})}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Poids (kg)"
                    keyboardType="numeric"
                    value={formData.weight}
                    onChangeText={(text) => setFormData({...formData, weight: text})}
                  />

                  <View style={styles.genderContainer}>
                    <View style={styles.radioContainer}>
                      <Text style={styles.radioLabel}>Genre : </Text>
                      <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => setFormData({...formData, gender: 'Homme'})}
                      >
                        <View style={styles.radio}>
                          {formData.gender === 'Homme' && <View style={styles.radioSelected} />}
                        </View>
                        <Text style={styles.radioLabel}>Homme</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.radioOption}
                        onPress={() => setFormData({...formData, gender: 'Femme'})}
                      >
                        <View style={styles.radio}>
                          {formData.gender === 'Femme' && <View style={styles.radioSelected} />}
                        </View>
                        <Text style={styles.radioLabel}>Femme</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.modalButtonText}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.modalButton,
                        styles.saveButton,
                        !isFormValid() && styles.saveButtonDisabled
                      ]}
                      onPress={handleSaveProfile}
                      disabled={!isFormValid()}
                    >
                      <Text style={[
                        styles.modalButtonText,
                        !isFormValid() && styles.saveButtonTextDisabled
                      ]}>Enregistrer</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>

          {!profile.isWithingsLinked && !isProfileIncomplete && (
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={async () => {
                  try {
                    const url = await buildWithingsUrl();
                    console.log("url_lier_withings: ", url)
                    setWebUrl(url);
                    setWebModalVisible(true);} 
                  catch (error){}
                }}
              >
                <MaterialIcons name="link" size={width > 600 ? 28 : 24} color="#fff" />
                <Text style={styles.actionButtonText}>Lier son compte Withings</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isProfileIncomplete && profile.isWithingsLinked && (profile.ipaqScore == null || profile.ipaqScore === '') && (
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('QuestionnaireIPAQ')}
              >
                <MaterialIcons name="assignment" size={width > 600 ? 28 : 24} color="#fff" />
                <Text style={styles.actionButtonText}>Remplir le questionnaire IPAQ</Text>
              </TouchableOpacity>
            </View>
          )}

          {!isProfileIncomplete && profile.isWithingsLinked && profile.ipaqScore && (
            <>
            {/* Deprecated: This token refresh button is no longer used.
              <View style={styles.refreshButtonsContainer}>
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={fetchData}
                >
                  <Text style={styles.refreshButtonText}>Rafraîchir les données</Text>
                </TouchableOpacity>



                
                <TouchableOpacity
                  style={[
                    styles.refreshButton,
                    profile.lastRefreshTime && 
                    (Date.now() - profile.lastRefreshTime < 3 * 60 * 60 * 1000) && 
                    styles.refreshButtonDisabled
                  ]}
                  onPress={refreshToken}
                  disabled={profile.lastRefreshTime && (Date.now() - profile.lastRefreshTime < 3 * 60 * 60 * 1000)}
                >
                  <Text style={styles.refreshButtonText}>Rafraîchir le token</Text>
                </TouchableOpacity>
                
              </View>*/}

              <View style={styles.statsRow}>
                <TouchableOpacity 
                  style={styles.statCard}
                  onPress={() => navigation.navigate('XPDetails')}
                >
                  <Text style={styles.statTitle}>Niveau {calculateLevel(profile.XP || 0)}</Text>
                  <CircularProgress 
                    steps={profile.XP || 0} 
                    goal={LEVEL_DATA.getXPForLevel(calculateLevel(profile.XP || 0) + 1)} 
                    radius={30}
                    unit="XP"
                  />
                  <Text style={styles.levelTitle}>
                    {LEVEL_DATA.getTitleAndRewards(calculateLevel(profile.XP || 0)).title}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.statCard}
                  onPress={() => navigation.navigate('StreakDetails')}
                >
                  <Text style={styles.statTitle}>Streak 🔥</Text>
                  <View style={styles.streakContainer}>
                    <Text style={styles.streakValue}>{profile.streak}</Text>
                    <Text style={styles.streakUnit}>jours</Text>
                    {profile.isStreakPaused && (
                      <View style={styles.pauseIndicator}>
                        <MaterialIcons name="pause" size={16} color="#FF9800" />
                        <Text style={styles.pauseText}>En pause</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.mascotContainer}>
                <Image source={mascot} style={styles.mascotte} />
                <View style={styles.speechBubble}>
                  <Text style={styles.speechText}>
                    Êtes-vous prêt à bouger et faire du sport aujourd'hui ?
                  </Text>
                  <TouchableOpacity
                    style={styles.activityButtonInBubble}
                    onPress={() => navigation.navigate('Activités')}
                    >
                    <Text style={styles.activityText}>C'est parti ! 🎉</Text>
                  </TouchableOpacity>
                  <View style={styles.speechBubbleTail} />
                </View>
              </View>

            </>
          )}
        </ScrollView>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={webModalVisible}
          onRequestClose={() => setWebModalVisible(false)}
        >
          <View style={styles.webViewContainer}>
            <View style={styles.webViewHeader}>
              <TouchableOpacity
                style={styles.closeWebViewButton}
                onPress={() => setWebModalVisible(false)}
              >
                <Text style={styles.closeWebViewText}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.webViewTitle}>Connexion Withings</Text>
            </View>
            <WebView 
              ref={webViewRef}
              source={{ uri: webUrl }} 
              onNavigationStateChange={(navState) => {
                setCurrentUrl(navState.url);
              }}
              style={styles.webView}
              incognito={true}
              cacheEnabled={false}
              thirdPartyCookiesEnabled={false}
              sharedCookiesEnabled={false}
              javaScriptEnabled={true}
              domStorageEnabled={false}
              onShouldStartLoadWithRequest={(request) => {
                return request.url.includes('withings.com') || request.url.includes('oauth.pstmn.io');
              }}
            />
          </View>
        </Modal>

      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#6dd5ed',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  welcomeText: {
    fontSize: width > 600 ? 32 : 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  mascotte: {
    width: width * 0.25,
    height: width * 0.25,
    marginBottom: 20,
    alignSelf: 'center',
  },
  
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    marginTop: height * 0.02,
  },
  statCard: {
    width: width > 600 ? width * 0.22 : width * 0.28,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: width * 0.02,
    marginHorizontal: width * 0.01,
    marginBottom: height * 0.015,
    alignItems: 'center',
    minHeight: width * 0.28,
    justifyContent: 'center',
  },
  statTitle: {
    fontSize: width > 600 ? 16 : 14,
    color: '#2193b0',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  levelTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  streakContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 4,
  },
  streakValue: {
    fontSize: width > 600 ? 32 : 28,
    fontWeight: 'bold',
    color: '#2193b0',
    textAlign: 'center',
  },
  streakUnit: {
    fontSize: width > 600 ? 14 : 12,
    color: '#666',
    marginTop: 2,
  },

  incompleteProfileButton: {
    backgroundColor: '#ff9500',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  incompleteProfileText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkWithingsButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  linkWithingsText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionnaireButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 14,
    width: '100%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  questionnaireText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  refreshButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  motivationalText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: '600',
    paddingHorizontal: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  activityButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 16,
    width: '70%',
    alignSelf: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  activityText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2193b0',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF5722',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderContainer: {
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#2193b0',
    borderRadius: 10,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 12,
    height: 12,
    backgroundColor: '#2193b0',
    borderRadius: 6,
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  saveButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  saveButtonTextDisabled: {
    color: '#666666',
  },
  webViewContainer: {
    flex: 1,
    marginTop: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  webViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2193b0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeWebViewButton: {
    padding: 8,
  },
  closeWebViewText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  webViewTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  webView: {
    flex: 1,
  },
  actionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.04,
    width: '100%',
    marginTop: height * 0.1,
  },
  actionButton: {
    width: width > 600 ? '70%' : '85%',
    backgroundColor: '#2193b0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.06,
    borderRadius: 25,
    marginBottom: height * 0.125,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: width > 600 ? 22 : 18,
    fontWeight: 'bold',
    marginLeft: 12,
    textAlign: 'center',
  },

  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.04,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  speechBubble: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: width * 0.03,
    maxWidth: width > 600 ? width * 0.5 : width * 0.6,
  },
  speechText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold'
  },
  speechBubbleTail: {
    position: 'absolute',
    top: '55%',
    left: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ffffff',
    transform: [{ translateY: -5 }],
  },

  activityButtonInBubble: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  
  percentageText: {
    position: 'absolute',
    fontSize: 18,
    top: '18%',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
    
  stepsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },

  refreshButtonDisabled: {
    opacity: 0.5,
  },

  pauseIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  pauseText: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },

});

export default HomeScreen;
