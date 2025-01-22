import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileContext } from './ProfileContext';
import { useWindowDimensions } from 'react-native';

const DailyActivityScreen = ({ navigation, route }) => {
  const { level, session, levelTitle } = route.params;
  const exercises = session.exercises || [];
  const { profile, updateStreak } = useContext(ProfileContext);

  // États
  const [completedExercises, setCompletedExercises] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isFeedbackPhase, setIsFeedbackPhase] = useState(false);
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [painRating, setPainRating] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const { width, height } = useWindowDimensions();

  // Empêcher le retour en arrière
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerLeft: null,
    });
  }, []);

  // Timer
  useEffect(() => {
    const startTime = Date.now();
    let interval;
    
    if (isTimerActive) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive]);

  // Formatage du temps écoulé
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleExerciseFinished = () => {
    setShowCongrats(true);
    setCompletedExercises(prev => prev + 1);
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setShowCongrats(false);
      setCurrentExercise(currentExercise + 1);
    } else {
      setIsTimerActive(false); // Arrêter le timer
      setIsFeedbackPhase(true);
    }
  };

  const handleSkipExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      setIsTimerActive(false); // Arrêter le timer
      setIsFeedbackPhase(true);
    }
  };

  const calculateNextSession = (difficultyRating, painRating, currentLevel) => {
    const averageRating = (difficultyRating + painRating) / 2;
    let nextLevel = currentLevel;
    
    if (averageRating > 3.8 && currentLevel !== 'niveau1') {
      nextLevel = `niveau${parseInt(currentLevel.slice(-1)) - 1}`;
    } else if (averageRating < 1.2 && currentLevel !== 'niveau3') {
      nextLevel = `niveau${parseInt(currentLevel.slice(-1)) + 1}`;
    }

    return { level: nextLevel };
  };

  const handleSubmitFeedback = async () => {
    try {
      const minutesElapsed = Math.round(elapsedTime / 60);
      const currentDate = new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      // Calcul du prochain niveau
      const nextRecommendation = calculateNextSession(difficultyRating, painRating, level);
      await AsyncStorage.setItem('recommendedLevel', nextRecommendation.level);

      // Mise à jour du profil
      const updatedProfile = {
        ...profile,
        lastSessionFeedback: {
          difficulty: difficultyRating,
          pain: painRating,
          date: currentDate
        }
      };
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));

      // Incrémenter le streak
      await updateStreak(profile.streak + 1);

      // Sauvegarder l'activité
      const newActivity = {
        date: currentDate,
        name: `${levelTitle} - ${session.title}`,
        duration: `${minutesElapsed} min`,
        calories: `${Math.round(minutesElapsed * 5)} kcal`,
        exercisesCompleted: completedExercises,
        totalExercises: exercises.length,
        painLevel: painRating,
        difficulty: difficultyRating
      };

      const existingHistory = await AsyncStorage.getItem('activitiesHistory');
      const activities = existingHistory ? JSON.parse(existingHistory) : [];
      activities.unshift(newActivity);
      await AsyncStorage.setItem('activitiesHistory', JSON.stringify(activities));

      Alert.alert(
        'Séance terminée !',
        'Félicitations pour avoir complété votre séance !',
        [{ text: 'OK', onPress: () => navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs', params: { screen: 'Accueil', refresh: true } }],
        })}]
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la sauvegarde.');
    }
  };

  const renderStars = (rating, setRating) => {
    return [...Array(5)].map((_, index) => (
      <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
        <MaterialIcons
          name={index < rating ? 'star' : 'star-outline'}
          size={32}
          color={index < rating ? '#FFD700' : '#CCCCCC'}
          style={styles.star}
        />
      </TouchableOpacity>
    ));
  };

  const exercise = exercises[currentExercise];

  const renderExerciseScreen = () => (
    <View style={styles.exerciseContainer}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.levelText}>{levelTitle}</Text>
          <Text style={styles.sessionText}>{session.title}</Text>
        </View>
        <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(currentExercise + 1) * 100 / exercises.length}%` }]} />
      </View>
      <Text style={styles.progress}>Exercice {currentExercise + 1}/{exercises.length}</Text>

      <TouchableOpacity
          style={styles.quitCircleButton}
            onPress={() => {
                Alert.alert(
                  'Quitter la séance',
                  'Es-tu sûr de vouloir quitter la séance ? 🥲',
                  [
                      {
                        text: 'Non',
                        onPress: () => console.log('Séance poursuivie'),
                        style: 'cancel', // Style du bouton "Non"
                      },
                      {
                              text: 'Oui',
                              onPress: () => navigation.reset({
                              index: 0,
                              routes: [{ name: 'MainTabs', params: { screen: 'Accueil', refresh: true } }],
                          }),
                      },
                  ],
                { cancelable: true } // Permet de fermer l'alerte en cliquant à l'extérieur
              );
          }}
      >
          <Text style={styles.quitIcon}>×</Text>
      </TouchableOpacity>


      <View style={styles.imageContainer}>
        <Image source={exercise.image} style={styles.exerciseImage} resizeMode="contain" />
      </View>
      
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkipExercise}>
        <MaterialIcons name="skip-next" size={24} color="#fff" />
        <Text style={styles.buttonText}>Passer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.completeButton} onPress={handleExerciseFinished}>
        <MaterialIcons name="check-circle" size={24} color="#fff" />
        <Text style={styles.buttonText}>Terminé</Text>
      </TouchableOpacity>
    </View>
    
    </View>
  );

  const renderCongratsScreen = () => (
    <View style={styles.congratsContainer}>
      <MaterialIcons name="emoji-events" size={80} color="#FFD700" />
      <Text style={styles.congratsTitle}>Bravo !</Text>
      <Text style={styles.congratsText}>Exercice complété avec succès</Text>
      <Text style={styles.xpText}>+10 XP</Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNextExercise}>
        <Text style={styles.buttonText}>Exercice suivant</Text>
        <MaterialIcons name="arrow-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderFeedbackScreen = () => (
    <View style={styles.feedbackContainer}>
      <MaterialIcons name="assessment" size={60} color="#2193b0" />
      <Text style={styles.feedbackTitle}>Séance terminée !</Text>
      
      <View style={styles.statsCard}>
        <View style={styles.statRow}>
          <MaterialIcons name="timer" size={24} color="#2193b0" />
          <Text style={styles.statText}>Durée : {formatTime(elapsedTime)}</Text>
        </View>
        <View style={styles.statRow}>
          <MaterialIcons name="fitness-center" size={24} color="#2193b0" />
          <Text style={styles.statText}>Exercices : {completedExercises}/{exercises.length}</Text>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>Difficulté de la séance</Text>
        <View style={styles.starsContainer}>
          {renderStars(difficultyRating, setDifficultyRating)}
        </View>

        <Text style={styles.ratingTitle}>Niveau de douleur ressenti</Text>
        <View style={styles.starsContainer}>
          {renderStars(painRating, setPainRating)}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, (!difficultyRating || !painRating) && styles.submitButtonDisabled]}
        onPress={handleSubmitFeedback}
        disabled={!difficultyRating || !painRating}
      >
        <Text style={styles.submitButtonText}>Terminer la séance</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeContainer, { backgroundColor: '#6dd5ed' }]}>
      <LinearGradient
        colors={['#6dd5ed', '#2193b0']}
        style={styles.container}
      >
        {!isFeedbackPhase ? (
          !showCongrats ? renderExerciseScreen() : renderCongratsScreen()
        ) : (
          renderFeedbackScreen()
        )}
      </LinearGradient>
      <View style={[styles.bottomSafeArea, { backgroundColor: '#2193b0' }]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  bottomSafeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34, // Hauteur de la barre de navigation iOS
  },
  exerciseContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sessionText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progress: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  
  buttonContainer: {
    flexDirection: 'row', // Les boutons "Passer" et "Terminer" restent côte à côte
    justifyContent: 'space-between', // Distribution équitable des boutons
    marginTop: 20, // Espace au-dessus du conteneur
  },
  
  skipButton: {
    backgroundColor: '#ff5047',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 0.45,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 0.45,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  congratsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  congratsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  congratsText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  xpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 20,
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  feedbackContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 30,
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  ratingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2193b0',
    marginBottom: 15,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 'auto',
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  quitCircleButton: {
    position: 'absolute',
    top: '18%', // Utilisation de pourcentages directement
    right: '6%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.31)', // Cercle transparent
    justifyContent: 'center',
    alignItems: 'center',
  },

quitIcon: {
    fontSize: 24,
    color: '#fff', // Couleur blanche pour la croix
    fontWeight: 'bold',
},
  
  
});

export default DailyActivityScreen;
