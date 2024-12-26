import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import exerciseBank from '../data/exerciseBank';
import { ProfileContext } from './ProfileContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivitiesScreen = ({ navigation }) => {
  const { profile } = useContext(ProfileContext);
  const [recommendedLevel, setRecommendedLevel] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  // Fonction pour obtenir le niveau recommandé en fonction du score IPAQ
  const getRecommendedLevel = (ipaqScore) => {
    if (ipaqScore <= 600) return 'niveau1';
    if (ipaqScore <= 1500) return 'niveau2';
    return 'niveau3';
  };

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

  // Charger la session au montage du composant
  useFocusEffect(
    React.useCallback(() => {
      const loadSession = async () => {
        try {
          // Obtenir le niveau recommandé
          const recLevel = getRecommendedLevel(profile.ipaqScore);
          setRecommendedLevel(recLevel);
          
          // Charger la session sauvegardée ou en créer une nouvelle
          const savedSession = await AsyncStorage.getItem('currentSession');
          if (savedSession) {
            const { level, sessionId } = JSON.parse(savedSession);
            setSelectedLevel(level);
            setSelectedSession(sessionId);
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

  return (
    <View style={styles.container}>
      {selectedLevel && selectedSession && exerciseBank.levels[selectedLevel] && (
        <>
          <Text>
            <Text style={styles.presentationText}>
              Voici l'APA que nous t'avons choisi :
            </Text>
            {'\n\n'}
            <Text style={styles.sessionText}>
              {exerciseBank.levels[selectedLevel]?.metadata?.title} - {
                exerciseBank.levels[selectedLevel]?.sessions.find(
                  session => session.id === selectedSession
                )?.title || "Session"
              }
            </Text>
          </Text>

          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Résumé de la séance :</Text>
            <Text style={styles.summaryText}>
              {exerciseBank.levels[selectedLevel]?.sessions.find(
                session => session.id === selectedSession
              )?.resume || "Résumé à venir"}
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
  presentationText: {
    fontSize: 20,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
  },
  sessionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 26,
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
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rejectButtonText: {
    color: '#666',
    textAlign: 'center',
  },
});

export default ActivitiesScreen;