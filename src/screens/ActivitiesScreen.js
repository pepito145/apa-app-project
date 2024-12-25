import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import exerciseBank from '../data/exerciseBank';
import DropDownPicker from 'react-native-dropdown-picker';
import { ProfileContext } from './ProfileContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivitiesScreen = ({ navigation }) => {
  const { profile } = useContext(ProfileContext);
  const [recommendedLevel, setRecommendedLevel] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [openLevel, setOpenLevel] = useState(false);
  const [openSession, setOpenSession] = useState(false);

  const levels = Object.keys(exerciseBank.levels).filter(level => level);
  const [levelItems, setLevelItems] = useState(levels.map(level => ({
    label: exerciseBank.levels[level].metadata.title,
    value: level,
  })));

  // Fonction pour sélectionner une session aléatoire
  const selectRandomSession = (level) => {
    const availableSessions = exerciseBank.levels[level]?.sessions || [];
    if (availableSessions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSessions.length);
      return availableSessions[randomIndex].id;
    }
    return null;
  };

  // Fonction pour sauvegarder la session actuelle
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

  // Fonction pour charger la session sauvegardée
  const loadSavedSession = async (level) => {
    try {
      const savedSessionData = await AsyncStorage.getItem('currentSession');
      if (savedSessionData) {
        const { level: savedLevel, sessionId, timestamp } = JSON.parse(savedSessionData);
        
        // Si le niveau a changé ou si c'est une nouvelle journée, sélectionner une nouvelle session
        const now = new Date();
        const savedDate = new Date(timestamp);
        if (level !== savedLevel || now.getDate() !== savedDate.getDate()) {
          const newSessionId = selectRandomSession(level);
          await saveCurrentSession(level, newSessionId);
          return newSessionId;
        }
        
        return sessionId;
      }
      
      // Si pas de session sauvegardée, en sélectionner une nouvelle
      const newSessionId = selectRandomSession(level);
      await saveCurrentSession(level, newSessionId);
      return newSessionId;
    } catch (error) {
      console.error('Erreur lors du chargement de la session:', error);
      return selectRandomSession(level);
    }
  };

  // Fonction pour déterminer le niveau recommandé
  const getRecommendedLevel = async (ipaqScore) => {
    try {
      // D'abord, essayer de récupérer le niveau recommandé stocké
      const storedLevel = await AsyncStorage.getItem('recommendedLevel');
      console.log("Niveau recommandé stocké:", storedLevel);
      
      if (storedLevel) {
        console.log("Utilisation du niveau recommandé stocké:", storedLevel);
        return storedLevel;
      }
      
      // Si pas de niveau stocké, vérifier si l'IPAQ score existe
      if (!ipaqScore && ipaqScore !== 0) {
        console.log("Pas de score IPAQ -> niveau1 par défaut");
        return 'niveau1';
      }
      
      // Si le score IPAQ existe, utiliser la logique normale
      console.log("Utilisation du score IPAQ:", ipaqScore);
      if (ipaqScore < 600) {
        console.log("Score IPAQ < 600 -> niveau1");
        return 'niveau1';
      }
      if (ipaqScore >= 600 && ipaqScore <= 3000) {
        console.log("600 ≤ Score IPAQ ≤ 3000 -> niveau2");
        return 'niveau2';
      }
      console.log("Score IPAQ > 3000 -> niveau3");
      return 'niveau3';
    } catch (error) {
      console.error("Erreur lors de la récupération du niveau recommandé:", error);
      return 'niveau1';
    }
  };

  // Utiliser useFocusEffect pour mettre à jour le niveau recommandé
  useFocusEffect(
    React.useCallback(() => {
      const loadRecommendedLevel = async () => {
        console.log("useFocusEffect déclenché");
        const level = await getRecommendedLevel(profile.ipaqScore);
        console.log("Niveau recommandé chargé:", level);
        setSelectedLevel(level);
        setRecommendedLevel(level);
        
        if (level) {
          const sessionId = await loadSavedSession(level);
          setSelectedSession(sessionId);
        }
      };
      
      loadRecommendedLevel();
    }, [profile])
  );

  const handleLevelChange = async (newLevel) => {
    setSelectedLevel(newLevel);
    if (newLevel && exerciseBank.levels[newLevel]) {
      const sessionId = await loadSavedSession(newLevel);
      setSelectedSession(sessionId);
    } else {
      setSelectedSession(null);
    }
    setOpenSession(false);
  };

  const sessions = selectedLevel ? exerciseBank.levels[selectedLevel]?.sessions || [] : [];
  const sessionItems = sessions.map(session => ({
    label: `${session.title} - ${session.duration}`,
    value: session.id,
  }));

  // Ajouter un message de recommandation
  const getRecommendationMessage = () => {
    const levelTitle = exerciseBank.levels[selectedLevel]?.metadata.title;
    let message = '';
    
    if (profile.lastSessionFeedback && profile.recommendedSession) {
      const averageRating = (profile.lastSessionFeedback.difficulty + profile.lastSessionFeedback.pain) / 2;
      message = `Basé sur votre dernier feedback (moyenne: ${averageRating.toFixed(1)}/5), nous vous recommandons : ${levelTitle}`;
    } else {
      message = `En fonction de votre score IPAQ (${profile.ipaqScore}), nous vous recommandons : ${levelTitle}`;
    }
    
    return message;
  };

  const pdfSource = require('../../assets/exercices-pdfs/1etoile.pdf');

  const openPDF = async () => {
    try {
      const path = pdfSource; // Chemin vers le fichier PDF
      await RNFileViewer.open(path, { showOpenWithDialog: true });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ouvrir le PDF');
      console.error(error);
    }
  };

  // Fonction pour sélectionner une session aléatoire différente de la session actuelle
  const selectDifferentRandomSession = (level, currentSessionId) => {
    const availableSessions = exerciseBank.levels[level]?.sessions || [];
    if (availableSessions.length > 1) {
      let newSessionId;
      do {
        const randomIndex = Math.floor(Math.random() * availableSessions.length);
        newSessionId = availableSessions[randomIndex].id;
      } while (newSessionId === currentSessionId);
      return newSessionId;
    } else if (availableSessions.length === 1) {
      return availableSessions[0].id;
    }
    return null;
  };

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
    } else {
      alert('Veuillez sélectionner un niveau et une session avant de commencer.');
    }
  };

  const handleReject = async () => {
    if (selectedLevel) {
      const newSessionId = selectDifferentRandomSession(selectedLevel, selectedSession);
      if (newSessionId) {
        await saveCurrentSession(selectedLevel, newSessionId);
        setSelectedSession(newSessionId);
        alert('Voici une nouvelle activité pour vous !');
      } else {
        alert('Désolé, aucune autre activité n\'est disponible pour ce niveau.');
      }
    }
  };

  return (
    <View style={styles.container}>
    
      {/* Pickers pour le développement - à décommenter si besoin
      <DropDownPicker
        open={openLevel}
        value={selectedLevel}
        items={levelItems}
        setOpen={setOpenLevel}
        setValue={setSelectedLevel}
        setItems={setLevelItems}
        placeholder="Aucun niveau sélectionné"
        onSelectItem={(item) => {
          handleLevelChange(item.value);
        }}
      />

      {selectedLevel && sessions.length > 0 && (
        <>
          <DropDownPicker
            open={openSession}
            value={selectedSession}
            items={sessionItems}
            setOpen={(open) => {
              setOpenSession(open);
              if (open) setOpenLevel(false);
            }}
            setValue={setSelectedSession}
            placeholder="Aucune session sélectionnée"
            zIndex={2000}
          />
        </>
      )}
      */}

      {selectedLevel && selectedSession && (
        <>
          <Text>
            <Text style={styles.presentationText}>
              Voici l'APA que nous t'avons choisi :
            </Text>
            {'\n\n'}
            <Text style={styles.sessionText}>
              {exerciseBank.levels[selectedLevel].metadata.title} - {
                exerciseBank.levels[selectedLevel].sessions.find(
                  session => session.id === selectedSession
                ).title
              }
            </Text>
          </Text>

          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Résumé de la séance :</Text>
            <Text style={styles.summaryText}>
              {exerciseBank.levels[selectedLevel].sessions.find(
                session => session.id === selectedSession
              ).resume || "Résumé à venir"}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
              <Text style={styles.buttonText}>Commencer !</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
              <Text style={[styles.buttonText, styles.rejectButtonText]}>
                Cette activité{'\n'}ne me convient pas
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 32,
  },
  summaryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  homeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  homeButtonText: {
    fontSize: 24,
  },
  activityImage: {
    width: '100%',
    height: 300, // Hauteur de l'image pour l'exemple
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  rejectButtonText: {
    fontSize: 14,
    lineHeight: 20,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '60%',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  levelDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  pdf: {
    width: '90%', // Largeur du PDF
    height: '80%', // Hauteur du PDF
  },
  recommendationText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  presentationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
    width: '100%',
    paddingHorizontal: 10,
  },
  sessionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 26,
    marginTop: 5,
  },
});

export default ActivitiesScreen;