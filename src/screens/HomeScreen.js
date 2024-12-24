import React, { useContext, useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, Pressable, SafeAreaView, BackHandler} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Nécessaire : expo install expo-linear-gradient
import { ProfileContext } from './ProfileContext'; // Import du contexte
import mascot from '../../assets/logo-test.png'; // Logo

const HomeScreen = ({ navigation }) => {
  const { profile, setProfile, saveProfile } = useContext(ProfileContext); // Accéder au profil partagé
  const [modalVisible, setModalVisible] = useState(false); // Gérer la visibilité du modal
  const [webModalVisible, setWebModalVisible] = useState(false); // Gérer la visibilité du modal WebView 
  const [webUrl, setWebUrl] = useState(''); // État pour l'URL du WebView
  const [currentUrl, setCurrentUrl] = useState(''); // État pour stocker l'URL actuelle
  const [extractedCode, setExtractedCode] = useState(''); // État pour stocker le code extrait

  // Vérification des données personnelles
  const isProfileIncomplete = !profile.firstName || !profile.lastName || !profile.gender || !profile.age || !profile.weight;

  const [steps, setSteps] = useState(0); // État pour les pas
  const [loading, setLoading] = useState(true); // État de chargement
  const [heartRateAverage, setHeartRateAverage] = useState(0); // État pour la moyenne BPM
  const [lastRefreshTime, setLastRefreshTime] = useState(0); // État pour stocker le dernier temps de rafraîchissement

  const fetchData = async () => {
    try {
      setLoading(true); // Début du chargement

      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // Formate la date au format YYYY-MM-DD

      // Requête pour récupérer les pas
      const stepsResponse = await fetch('https://wbsapi.withings.net/v2/measure', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${profile.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=getactivity&startdateymd=${formattedDate}&enddateymd=${formattedDate}`, // Utilise la date formatée
      });

      const stepsData = await stepsResponse.json();

      if (stepsData.status === 0 && stepsData.body.activities.length > 0) {
        setSteps(stepsData.body.activities[0].steps);
        console.log("Steps trouvés")
      } else {
        setSteps(0); // Aucune donnée trouvée
        console.log("Steps non trouvés")
      }

      // Obtenir la date actuelle
      const now = new Date();

      // Obtenir le timestamp Unix de maintenant
      const currentTimestamp = Math.floor(now.getTime() / 1000);

      // Obtenir la date actuelle à minuit
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Obtenir le timestamp Unix de minuit
      const midnightTimestamp = Math.floor(midnight.getTime() / 1000);

      //console.log('Timestamp Unix de maintenant :', currentTimestamp);
      //console.log('Timestamp Unix de minuit :', midnightTimestamp);

      // Requête pour récupérer la moyenne des BPM
      const bpmResponse = await fetch('https://wbsapi.withings.net/v2/measure', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${profile.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=getintradayactivity&startdate=${midnightTimestamp}&enddate=${currentTimestamp}`, // Utilise les timestamps Unix
      });

      const bpmData = await bpmResponse.json();

      if (bpmData.status === 0 && bpmData.body.series) {
        const seriesArray = Object.values(bpmData.body.series);
        const heartRates = seriesArray
          .filter(item => item.heart_rate != null)
          .map(item => item.heart_rate);

        if (heartRates.length > 0) {
          const averageBPM = heartRates.reduce((sum, rate) => sum + rate, 0) / heartRates.length;
          setHeartRateAverage(Math.round(averageBPM)); // Arrondi à l'entier
          console.log("BPM : ", averageBPM);
        } else {
          setHeartRateAverage(0); // Aucun heart_rate trouvéa
        }
      } else {
        setHeartRateAverage(0); // Erreur ou pas de données
        console.log("BPM non trouvé");
      } 
    } catch (error) {
      console.error('Erreur API :', error);
      setSteps(0);
      setHeartRateAverage(0);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  const handleLinkWithings = async (code) => {
    const url = 'https://wbsapi.withings.net/v2/oauth2'; // URL de l'API Withings
    const params = new URLSearchParams({
      action: 'requesttoken',
      grant_type: 'authorization_code',
      client_id: '8c470e0841b5b9219c53916974da08e69fa7334d5b51a2e607078404619cbf25', // Remplacez par votre client_id
      client_secret: '77f0088525010a3bd6ab17df6d34c0423aa4c16ced8ede88e00b8a26d9da288b', // Remplacez par votre client_secret
      code: code, // Le code obtenu
      redirect_uri: 'https://oauth.pstmn.io/v1/callback', // Remplacez par votre redirect_uri
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
        const accessToken = data.body.access_token; // Stocke l'access_token
        const refreshToken = data.body.refresh_token; // Stocke le refresh_token
    
        // Mettez à jour le profil
        const updatedProfile = {
          ...profile,
          access_token: accessToken,
          refresh_token: refreshToken,
          isWithingsLinked: true, // Met à jour l'état de liaison
        };
    
        setProfile(updatedProfile); // Mettez à jour l'état du profil
    
        // Sauvegarder le profil
        await saveProfile(updatedProfile);
      }

      // Vous pouvez mettre à jour l'état ou faire d'autres actions ici
    } catch (error) {
      console.error('Erreur lors de la requête à Withings :', error);
    }
  };

  useEffect(() => {
    let interval;

    if (webModalVisible) {
      // Démarrer l'intervalle pour vérifier l'URL toutes les x secondes
      interval = setInterval(() => {
        console.log('URL actuelle :', currentUrl); // Affiche l'URL actuelle dans la console

        // Vérifie si l'URL contient "code="
        const codeMatch = currentUrl.match(/code=([^&]+)/); // Utilise une expression régulière pour extraire le code
        if (codeMatch) {
          const code = codeMatch[1]; // Le code est dans le premier groupe de capture
          setExtractedCode(code); // Stocke le code extrait
          console.log('Code extrait :', code); // Affiche le code extrait dans la console
          setWebModalVisible(false); // Ferme le modal WebView

          // Appelle la fonction pour lier le compte Withings
          handleLinkWithings(code);
        }
      }, 5000); // Vérifie toutes les 5 secondes
    }

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, [webModalVisible, currentUrl]); // Dépendances : redémarre l'intervalle si l'URL actuelle change

  // Vérifiez si le compte Withings est lié lors du lancement de l'application
  useEffect(() => {
    if (profile.isWithingsLinked) {
      // Si le compte est lié, appelez fetchData après un délai de 3 secondes
      const timer = setTimeout(() => {
        fetchData(); // Appelle fetchData après 3 secondes
      }, 3000); // 3000 millisecondes = 3 secondes

      // Nettoyage du timer lors du démontage du composant
      return () => clearTimeout(timer);
    } else {
      // Si le compte n'est pas lié, vous pouvez afficher un message ou gérer cela comme vous le souhaitez
      console.log('Le compte Withings n\'est pas lié.');
      setSteps(0); // Ou toute autre logique que vous souhaitez appliquer
    }
  }, [profile.isWithingsLinked]); // Dépendance pour vérifier si le compte est lié


  const refreshToken = async () => {
    const url = 'https://wbsapi.withings.net/v2/oauth2'; // URL de l'API Withings
    const params = new URLSearchParams({
        action: 'requesttoken',
        grant_type: 'refresh_token',
        client_id: '8c470e0841b5b9219c53916974da08e69fa7334d5b51a2e607078404619cbf25', // Remplacez par votre client_id
        client_secret: '77f0088525010a3bd6ab17df6d34c0423aa4c16ced8ede88e00b8a26d9da288b', // Remplacez par votre client_secret
        refresh_token: profile.refresh_token, // Utilise le refresh_token du profil
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
          const accessToken = data.body.access_token; // Stocke l'access_token
          const refreshToken = data.body.refresh_token; // Stocke le refresh_token
      
          // Mettez à jour le profil
          const updatedProfile = {
            ...profile,
            access_token: accessToken,
            refresh_token: refreshToken,
          };
      
          setProfile(updatedProfile); // Mettez à jour l'état du profil
      
          // Sauvegarder le profil
          await saveProfile(updatedProfile);
        }
      } catch (error) {
          console.error('Erreur lors de la requête pour rafraîchir le token :', error);
      }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.welcomeText}>Bon retour sur APA App !</Text>
          <Image source={mascot} style={styles.mascotte} />

          {/* Vérification des données personnelles */}
          {isProfileIncomplete && (
            <TouchableOpacity
              style={styles.incompleteProfileButton}
              onPress={() => navigation.navigate('Paramètres', { screen: 'EditProfile' })}
            >
              <Text style={styles.incompleteProfileText}>
                Complétez vos informations personnelles
              </Text>
            </TouchableOpacity>
          )}

          {/* Lier le compte Withings */}
          {!profile.isWithingsLinked && !isProfileIncomplete && (
            <TouchableOpacity
              style={styles.linkWithingsButton}
              onPress={() => {
                setWebUrl('https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=8c470e0841b5b9219c53916974da08e69fa7334d5b51a2e607078404619cbf25&state=randomString&scope=user.activity,user.metrics&redirect_uri=https://oauth.pstmn.io/v1/callback');
                setWebModalVisible(true);
              }} 
            >
              <Text style={styles.linkWithingsText}>Lier son compte Withings</Text>
            </TouchableOpacity>
          )}

          {/* Vérification de la présence du score IPAQ */}
          {!isProfileIncomplete && profile.isWithingsLinked && (profile.ipaqScore == null || profile.ipaqScore === '') && (
            <TouchableOpacity
              style={styles.questionnaireButton}
              onPress={() => navigation.navigate('QuestionnaireIPAQ')}
            >
              <Text style={styles.questionnaireText}>Remplir le questionnaire IPAQ</Text>
            </TouchableOpacity>
          )}

          {/* Contenu principal - affiché uniquement quand tout est complété */}
          {!isProfileIncomplete && profile.isWithingsLinked && profile.ipaqScore && (
            <>
              {/* Boutons de rafraîchissement */}
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={fetchData}
              >
                <Text style={styles.refreshButtonText}>Rafraîchir les données</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.refreshButton}
                onPress={refreshToken}
              >
                <Text style={styles.refreshButtonText}>Rafresh token</Text>
              </TouchableOpacity>

              {/* Affichage des statistiques */}
              <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                  <Text style={styles.statTitle}>Nombre de pas</Text>
                  <Text style={styles.statValue}>{loading ? 'Chargement...' : steps.toLocaleString()}</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statTitle}>Fréquence Cardiaque moyenne</Text>
                  <Text style={styles.statValue}>{loading ? 'Chargement...' : `${heartRateAverage} BPM`}</Text>
                </View>
                <TouchableOpacity
                  style={styles.statCard}
                  onPress={() => navigation.navigate('StreakDetails')}
                >
                  <Text style={styles.statTitle}>Streak 🔥</Text>
                  <Text style={styles.statValue}>{profile.streak}</Text>
                </TouchableOpacity>
              </View>

              {/* Phrase motivante et bouton d'activité */}
              <Text style={styles.motivationalText}>
                Êtes-vous prêt à bouger et faire du sport aujourd'hui ?
              </Text>

              <TouchableOpacity
                style={styles.activityButton}
                onPress={() => navigation.navigate('Activités')}
              >
                <Text style={styles.activityText}>C'est parti !</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
        
        {/* Modal pour afficher le WebView */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={webModalVisible}
          onRequestClose={() => setWebModalVisible(false)}
        >
          <View style={{ flex: 1 }}>
            <WebView 
              source={{ uri: webUrl }} 
              onNavigationStateChange={(navState) => {
                setCurrentUrl(navState.url); // Met à jour l'URL actuelle
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setWebModalVisible(false)} // Ferme le modal WebView
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Modal pour afficher les détails du streak */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Comment est calculé le streak ?</Text>
              <Text style={styles.modalText}>
                Le streak est le nombre de jours consécutifs pendant lesquels vous avez atteint votre objectif quotidien d'activité physique.
                Continuez à bouger tous les jours pour maintenir votre streak !
              </Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)} // Ferme le modal
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Ajoute un espace en haut et en bas
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 16,
  },
  mascotte: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  statsContainer: {
    width: '90%',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Blanc semi-transparent
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statTitle: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#333',
  },
  questionnaireButton: {
    padding: 16,
    backgroundColor: '#4caf50', // Vert
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
    borderWidth: 2,
    borderColor: '#6dd5ed',
  },
  questionnaireText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  motivationalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  activityButton: {
    padding: 16,
    backgroundColor: '#FFC107', // Jaune
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 16,
    width: '45%',
    borderWidth: 2,
    borderColor: '#6dd5ed',
  },
  activityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  incompleteProfileButton: {
    padding: 16,
    backgroundColor: '#FF6347', // Rouge
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
    borderWidth: 2,
    borderColor: '#6dd5ed',
  },
  incompleteProfileText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#2193b0',
  },
  linkWithingsButton: {
    padding: 16,
    backgroundColor: '#007bff', 
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
    borderWidth: 2,
    borderColor: '#6dd5ed',
  },
  linkWithingsText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 10,
    backgroundColor: '#007bff', // Couleur du bouton
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 16,
    width: '40%',
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;