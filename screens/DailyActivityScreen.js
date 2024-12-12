import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import de FontAwesome depuis react-native-vector-icons

const DailyActivityScreen = ({ navigation }) => {
  const exercises = [
    {
      id: 1,
      image: require('../assets/activities/test/exo1.png'),
      advice: 'Montez les talons lentement pour renforcer vos mollets.',
    },
    {
      id: 2,
      image: require('../assets/activities/test/exo2.png'),
      advice: 'Levez les pointes des pieds pour renforcer vos tibias.',
    },
    {
      id: 3,
      image: require('../assets/activities/test/exo3.png'),
      advice: 'Effectuez des coups de pied pour travailler la mobilité.',
    },
    {
      id: 4,
      image: require('../assets/activities/test/exo4.png'),
      advice: 'Tenez un squat léger pour renforcer vos cuisses.',
    },
    {
      id: 5,
      image: require('../assets/activities/test/exo5.png'),
      advice: 'Effectuez des extensions de jambe pour activer vos quadriceps.',
    },
    {
      id: 6,
      image: require('../assets/activities/test/exo6.png'),
      advice: 'Marchez sur place pour stimuler votre circulation.',
    },
  ];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isFeedbackPhase, setIsFeedbackPhase] = useState(false); // Phase de feedback
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [painRating, setPainRating] = useState(0);

  const handleExerciseFinished = () => {
    setShowCongrats(true);
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

  const handleSubmitFeedback = () => {
    Alert.alert('Merci pour votre retour !', 'Nous avons enregistré vos évaluations.');
    navigation.navigate('MainTabs', { screen: 'Accueil' }); // Retourne à l'accueil
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
            <Text style={styles.title}>Exercice {exercise.id}</Text>
            <Image source={exercise.image} style={styles.exerciseImage} resizeMode="contain" />
            <Text style={styles.advice}>{exercise.advice}</Text>

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
          <Text style={styles.stats}>Fréquence cardiaque moyenne : 100 bpm</Text>
          <Text style={styles.stats}>Calories brûlées : 1000 kcal</Text>

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

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
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
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default DailyActivityScreen;