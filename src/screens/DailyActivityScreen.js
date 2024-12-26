import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileContext } from './ProfileContext';
import exerciseBank from '../data/exerciseBank';

const DailyActivityScreen = ({ navigation, route }) => {
  const { level, session, levelTitle } = route.params;
  const exercises = session.exercises || [];

  // Nouveaux états
const [completedExercises, setCompletedExercises] = useState(0);
const [elapsedTime, setElapsedTime] = useState(0);
const [timer, setTimer] = useState(null);


// Démarrage du timer au début
useEffect(() => {
  const startTime = Date.now();
  const interval = setInterval(() => {
    setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
  }, 1000);
  setTimer(interval);

  return () => clearInterval(interval);
}, []);

  const [currentExercise, setCurrentExercise] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isFeedbackPhase, setIsFeedbackPhase] = useState(false); // Phase de feedback
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [painRating, setPainRating] = useState(0);
  const [difficultyRatingSaved, setDifficultyRatingSaved] = useState(0);
  const [painRatingSaved, setPainRatingSaved] = useState(0);

  const handleExerciseFinished = () => {
    setShowCongrats(true);
    setCompletedExercises((prev) => prev + 1);
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setShowCongrats(false);
      setCurrentExercise(currentExercise + 1);
    } else {
      setIsFeedbackPhase(true); // Passe à la phase de feedback après le dernier exercice
    }
  };

  const handleSkipExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      setIsFeedbackPhase(true); // Passe à la phase de feedback après le dernier exercice
    }
  };

  const { profile, updateStreak, setProfile } = useContext(ProfileContext); // Accéder au streak depuis le contexte
  // Fonction pour incrémenter le streak
  const incrementStreak = async () => {
    const newStreak = profile.streak + 1;
    await updateStreak(newStreak);
  };

  const calculateNextSession = (difficultyRating, painRating, currentLevel) => {
    const averageRating = (difficultyRating + painRating) / 2;
    console.log('Moyenne des notes:', averageRating);
    console.log('Niveau actuel:', currentLevel);
    
    // Déterminer le prochain niveau en fonction de la moyenne
    let nextLevel = currentLevel;
    // Si la moyenne est élevée (trop difficile), on baisse le niveau
    if (averageRating > 3.8 && currentLevel !== 'niveau1') {
      nextLevel = `niveau${parseInt(currentLevel.slice(-1)) - 1}`; // Descendre d'un niveau
      console.log('Trop difficile, on descend au niveau:', nextLevel);
    } 
    // Si la moyenne est basse (trop facile), on monte le niveau
    else if (averageRating < 1.2 && currentLevel !== 'niveau3') {
      nextLevel = `niveau${parseInt(currentLevel.slice(-1)) + 1}`; // Monter d'un niveau
      console.log('Trop facile, on monte au niveau:', nextLevel);
    }

    return {
      level: nextLevel
    };
  };

  const handleSubmitFeedback = async () => {
    try {
      const minutesElapsed = Math.round(elapsedTime / 60);
      const currentDate = new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      // Calcul du prochain niveau recommandé
      const nextRecommendation = calculateNextSession(difficultyRating, painRating, route.params.level);
      console.log('Prochain niveau recommandé:', nextRecommendation);

      // Sauvegarder le niveau recommandé séparément
      await AsyncStorage.setItem('recommendedLevel', nextRecommendation.level);
      console.log('Niveau recommandé sauvegardé:', nextRecommendation.level);

      // Mise à jour du profil
      const updatedProfile = {
        ...profile,
        lastSessionFeedback: {
          difficulty: difficultyRating,
          pain: painRating,
          date: currentDate
        }
      };

      console.log('Profil mis à jour:', updatedProfile);
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);

      // Appel de la fonction pour incrémenter le streak
      const newStreak = await incrementStreak();

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

      // Récupérer l'historique existant
      const existingHistory = await AsyncStorage.getItem('activitiesHistory');
      const activities = existingHistory ? JSON.parse(existingHistory) : [];

      // Ajouter la nouvelle activité
      activities.unshift(newActivity);

      // Sauvegarder l'historique mis à jour
      await AsyncStorage.setItem('activitiesHistory', JSON.stringify(activities));

      setDifficultyRatingSaved(difficultyRating);
      setPainRatingSaved(painRating);
      Alert.alert(
        'Merci pour votre retour !', 
        `Exercices terminés : ${completedExercises}/${exercises.length}\nTemps total : ${minutesElapsed} minutes\nDifficulté : ${difficultyRating} étoiles\nDouleur : ${painRating} étoiles`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabs', params: { screen: 'Accueil', refresh: true } }],
              });
            }
          }
        ]
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la sauvegarde des données.');
    }
  };

  const renderStars = (rating, setRating) => {
    return [...Array(5)].map((_, index) => (
      <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
        <Icon
          name={index < rating ? 'star' : 'star-o'} // Affiche une étoile pleine ou vide
          size={24}
          color={index < rating ? '#FFD700' : '#CCCCCC'} // Jaune pour rempli, gris sinon
        />
      </TouchableOpacity>
    ));
  };

  const exercise = exercises[currentExercise];

  return (
    <View style={styles.container}>
      {!isFeedbackPhase ? (
        !showCongrats ? (
          <>
            <Text style={styles.title}>{session.title}</Text>
            <Text style={styles.subtitle}>Exercice {currentExercise + 1}/{exercises.length}</Text>
            <Image source={exercise.image} style={styles.exerciseImage} resizeMode="contain" />
            <Text style={styles.advice}>{exercise.description || exercise.advice}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.finishedButton} onPress={handleExerciseFinished}>
                <Text style={styles.buttonText}>Exercice fini !</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.skipButton} onPress={handleSkipExercise}>
                <Text style={styles.buttonText}>Passer</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.congratsContainer}>
            <Text style={styles.congratsTitle}>Bravo !</Text>
            <Text style={styles.congratsSubtitle}>+10 XP gagné !</Text>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextExercise}>
              <Text style={styles.buttonText}>Exercice suivant</Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <View style={styles.feedbackContainer}>
          <Text style={styles.title}>Félicitations !</Text>

          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackLabel}>
              Comment évalues-tu le niveau de difficulté de la séance ?
            </Text>
            <View style={styles.starsContainer}>
              {renderStars(difficultyRating, setDifficultyRating)}
            </View>
          </View>

          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackLabel}>
              Quel niveau de douleur as-tu ressenti ?
            </Text>
            <View style={styles.starsContainer}>
              {renderStars(painRating, setPainRating)}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (difficultyRating === 0 || painRating === 0) && styles.submitButtonDisabled, // Applique un style désactivé
            ]}
            onPress={handleSubmitFeedback}
            disabled={difficultyRating === 0 || painRating === 0} // Désactive le bouton si aucune étoile sélectionnée
          >
              <Text style={styles.submitButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 20,
  },
  advice: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
  exerciseImage: {
    width: '100%',
    height: 300,
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
  },
  finishedButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  skipButton: {
    flex: 1,
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  congratsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  congratsSubtitle: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  feedbackSection: {
    marginVertical: 20,
  },
  feedbackLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#FFB84D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC', // Gris pour montrer que le bouton est désactivé
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default DailyActivityScreen;
