import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import exerciseBank from '../data/exerciseBank';
import { ProfileContext } from './ProfileContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

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

  // Charger la session au montage du composant et quand le niveau recommandé change
  useFocusEffect(
    React.useCallback(() => {
      const loadSession = async () => {
        try {
          // Obtenir le niveau recommandé depuis le stockage ou le score IPAQ
          const savedRecommendedLevel = await AsyncStorage.getItem('recommendedLevel');
          const recLevel = savedRecommendedLevel || getRecommendedLevel(profile.ipaqScore);
          
          // Sauvegarder immédiatement le niveau recommandé si basé sur IPAQ
          if (!savedRecommendedLevel && profile.ipaqScore) {
            await AsyncStorage.setItem('recommendedLevel', recLevel);
          }
          
          setRecommendedLevel(recLevel);
          
          // Charger la session sauvegardée ou en créer une nouvelle
          const savedSession = await AsyncStorage.getItem('currentSession');
          if (savedSession) {
            const { level, sessionId, timestamp } = JSON.parse(savedSession);
            // Si le niveau recommandé a changé, on met à jour la session
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

  const getDifficultyColor = (level) => {
    switch(level) {
      case 'niveau1':
        return '#4CAF50'; // Vert pour débutant
      case 'niveau2':
        return '#FF9800'; // Orange pour intermédiaire
      case 'niveau3':
        return '#f44336'; // Rouge pour avancé
      default:
        return '#2193b0';
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient
        colors={['#6dd5ed', '#2193b0']}
        style={styles.container}
      >
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
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  sessionCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
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
    backgroundColor: 'rgba(33, 147, 176, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  sessionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(33, 147, 176, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  summaryText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  rejectButton: {
    backgroundColor: 'rgba(33, 147, 176, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
  },
  rejectButtonText: {
    color: '#2193b0',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 30,
    lineHeight: 24,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2193b0',
    marginLeft: 8,
  },
});

export default ActivitiesScreen;