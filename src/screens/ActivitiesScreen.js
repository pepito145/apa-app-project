// Imports nécessaires
import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  ScrollView, 
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileContext } from './ProfileContext';
import { useFocusEffect } from '@react-navigation/native';
import mascot from '../../assets/mascotte_haltère.png';
import exerciseBank from '../data/exerciseBank';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width > 600 ? width * 0.7 : width * 0.9;

// Composant principal
const ActivitiesScreen = ({ navigation }) => {
  const { profile } = useContext(ProfileContext);
  const [recommendedLevel, setRecommendedLevel] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  const getRecommendedLevel = (ipaqScore) => {
    if (ipaqScore <= 800) return 'niveau1';
    if (ipaqScore <= 1500) return 'niveau2';
    return 'niveau3';
  };

  const selectRandomSession = (level) => {
    const availableSessions = exerciseBank.levels[level]?.sessions || [];
    if (availableSessions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSessions.length);
      return availableSessions[randomIndex].id;
    }
    return null;
  };

  const saveCurrentSession = async (level, sessionId) => {
    try {
      await AsyncStorage.setItem('currentSession', JSON.stringify({
        level,
        sessionId,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la session:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadSession = async () => {
        try {
          const savedRecommendedLevel = await AsyncStorage.getItem('recommendedLevel');
          const recLevel = savedRecommendedLevel || getRecommendedLevel(profile.ipaqScore);

          if (!savedRecommendedLevel && profile.ipaqScore) {
            await AsyncStorage.setItem('recommendedLevel', recLevel);
          }
          console.log("savedRecommendedLevel：", savedRecommendedLevel);
          console.log("ipaqScore", profile.ipaqScore);
          console.log("活动难度：", recLevel);
          setRecommendedLevel(recLevel);

          const savedSession = await AsyncStorage.getItem('currentSession');
          if (savedSession) {
            const { level, sessionId } = JSON.parse(savedSession);
            if (level !== recLevel) {
              const newSessionId = selectRandomSession(recLevel);
              setSelectedLevel(recLevel);
              setSelectedSession(newSessionId);
              if (newSessionId) {
                await saveCurrentSession(recLevel, newSessionId);
              }
            } else {
              setSelectedLevel(level);
              setSelectedSession(sessionId);
            }
          } else {
            setSelectedLevel(recLevel);
            const newSessionId = selectRandomSession(recLevel);
            setSelectedSession(newSessionId);
            if (newSessionId) {
              await saveCurrentSession(recLevel, newSessionId);
            }
          }
        } catch (error) {
          console.error('Erreur lors du chargement de la session:', error);
        }
      };

      loadSession();
    }, [profile.ipaqScore])
  );

  const handleAccept = () => {
    if (selectedLevel && selectedSession && exerciseBank.levels[selectedLevel]) {
      const selectedSessionData = exerciseBank.levels[selectedLevel].sessions.find(
        session => session.id === selectedSession
      );
      if (selectedSessionData) {
        navigation.navigate('DailyActivity', {
          level: selectedLevel,
          session: selectedSessionData,
          levelTitle: exerciseBank.levels[selectedLevel].metadata.title
        });
      } else {
        alert('Une erreur est survenue lors de la sélection de la session.');
      }
    }
  };

  const [bubbleState, setBubbleState] = useState('initial');

  const handleNoPress = () => {
    setBubbleState('notGrave'); // Change la bulle pour afficher le message
    setTimeout(() => {
      setBubbleState('initial'); // Revient à la bulle initiale après 5 secondes
    }, 5000);
  };

  const handleReject = async () => {
    if (selectedLevel) {
      const newSessionId = selectRandomSession(selectedLevel);
      if (newSessionId) {
        await saveCurrentSession(selectedLevel, newSessionId);
        setSelectedSession(newSessionId);
        alert('Voici une nouvelle activité pour vous !');
      } else {
        alert('Désolé, aucune autre activité n\'est disponible pour ce niveau.');
      }
    }
  };

  const getDifficultyColor = (level) => {
    switch(level) {
      case 'niveau1':
        return '#4CAF50';
      case 'niveau2':
        return '#FF9800';
      case 'niveau3':
        return '#f44336';
      default:
        return '#2193b0';
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {!profile.ipaqScore ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="info" size={80} color="#fff" />
              <Text style={styles.emptyTitle}>Configuration requise</Text>
              <Text style={styles.emptyText}>
                Pour vous proposer des activités adaptées, nous avons besoin que vous complétiez toutes les informations demandées sur l'écran d'accueil.
              </Text>
              <TouchableOpacity 
                style={styles.homeButton}
                onPress={() => navigation.navigate('MainTabs', { screen: 'Accueil' })}
              >
                <MaterialIcons name="home" size={24} color="#2193b0" />
                <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
              </TouchableOpacity>
            </View>
          ) : selectedLevel && selectedSession && exerciseBank.levels[selectedLevel] ? (
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Séance proposée</Text>
                <Text style={styles.headerSubtitle}>
                  Basée sur votre niveau d'activité physique
                </Text>
              </View>

              <View style={styles.mascotContainer}>
                <Image 
                  source={mascot} 
                  style={styles.mascotte}  
                />
                {bubbleState === 'initial' ? (
                  <View style={styles.speechBubble}>
                    <Text style={styles.speechText}>Une petite séance de sport, ça te tente ?</Text>
                    <View style={styles.buttonContainer1}>
                      <TouchableOpacity style={styles.yesButton} onPress={handleAccept}>
                        <Text style={styles.buttonText}>Oui</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.noButton} onPress={handleNoPress}>
                        <Text style={styles.buttonText}>Non</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.speechBubbleTail} />
                  </View>
                ) : (
                  <View style={styles.speechBubble}>
                    <Text style={styles.speechText}>C'est pas grave 😊. Tu reviendras plus fort demain j'en suis sur !</Text>
                    <View style={styles.speechBubbleTail} />
                  </View>
                )}
              </View>

              <View style={styles.sessionCard}>
                <View style={styles.levelBadge}>
                  <MaterialIcons 
                    name="fitness-center" 
                    size={20} 
                    color={getDifficultyColor(selectedLevel)} 
                  />
                  <Text style={[styles.levelText, { color: getDifficultyColor(selectedLevel) }]}>
                    {exerciseBank.levels[selectedLevel]?.metadata?.title}
                  </Text>
                </View>

                <Text style={styles.sessionTitle}>
                  {exerciseBank.levels[selectedLevel]?.sessions.find(
                    session => session.id === selectedSession
                  )?.title || "Session"}
                </Text>

                <View style={styles.summaryContainer}>
                  <MaterialIcons name="info-outline" size={24} color="#2193b0" />
                  <Text style={styles.summaryText}>
                    {exerciseBank.levels[selectedLevel]?.sessions.find(
                      session => session.id === selectedSession
                    )?.resume || "Résumé à venir"}
                  </Text>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.acceptButton}
                    onPress={handleAccept}
                  >
                    <MaterialIcons name="play-arrow" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Commencer</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.rejectButton}
                    onPress={handleReject}
                  >
                    <MaterialIcons name="refresh" size={24} color="#2193b0" />
                    <Text style={styles.rejectButtonText}>Changer de séance</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

// Styles
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
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: width > 600 ? 32 : 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: width > 600 ? 18 : 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  mascotte: {
    width: width * 0.25,
    height: width * 0.3,
    marginRight: width * 0.05,
  },
  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
    width: '100%',
  },
  speechBubble: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: width * 0.03,
    maxWidth: width > 600 ? width * 0.4 : width * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  speechBubbleTail: {
    position: 'absolute', // Positionnement absolu pour placer la flèche
    top: '30%', // Aligne la flèche au centre vertical de la bulle
    left: -10, // Positionne la flèche sur la gauche de la bulle
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ffffff', // Couleur de la flèche (même que la bulle)
    transform: [{ translateY: -5 }], // Ajuste pour centrer précisément
  },
  
  speechText: {
    fontSize: width > 600 ? 18 : 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  yesButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  noButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  noMessageText: {
    marginTop: 10, // Espace entre les boutons et le message
    fontSize: 16,
    color: '#666', // Couleur du texte
    textAlign: 'center', // Centre le texte
  },
  buttonText: {
    fontSize: width > 600 ? 18 : 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  sessionCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: width * 0.05,
    alignSelf: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  summaryText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  buttonContainer: {
    marginTop: height * 0.02,
    width: '100%',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.02,
    borderRadius: 12,
    marginBottom: height * 0.015,
  },
  rejectButton: {
    backgroundColor: 'rgba(33, 147, 176, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
  },
  emptyTitle: {
    fontSize: width > 600 ? 32 : 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: width > 600 ? 20 : 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: height * 0.03,
    lineHeight: width > 600 ? 32 : 24,
    maxWidth: width * 0.8,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  homeButtonText: {
    fontSize: width > 600 ? 18 : 16,
    fontWeight: 'bold',
    color: '#2193b0',
    marginLeft: 8,
  },
});

export default ActivitiesScreen;
