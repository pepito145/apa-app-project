import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ActivitiesHistory = ({ navigation }) => {
  // Données fictives pour les activités
  const activities = [
    {
      date: '28 Nov 2024',
      name: 'Séance 2 étoiles numéro 3',
      duration: '30 min',
      calories: '150 kcal',
      exercisesCompleted: 8,
      totalExercises: 10,
      painLevel: 3,
      difficulty: 2,
    },
    {
      date: '27 Nov 2024',
      name: 'Séance 3 étoiles numéro 5',
      duration: '45 min',
      calories: '300 kcal',
      exercisesCompleted: 12,
      totalExercises: 12,
      painLevel: 4,
      difficulty: 3,
    },
    {
      date: '26 Nov 2024',
      name: 'Séance 1 étoile numéro 1',
      duration: '20 min',
      calories: '250 kcal',
      exercisesCompleted: 5,
      totalExercises: 8,
      painLevel: 1,
      difficulty: 1,
    },
    {
      date: '25 Nov 2024',
      name: 'Séance 3 étoiles numéro 8',
      duration: '60 min',
      calories: '400 kcal',
      exercisesCompleted: 15,
      totalExercises: 15,
      painLevel: 5,
      difficulty: 4,
    },
    {
      date: '24 Nov 2024',
      name: 'Séance 2 étoiles numéro 6',
      duration: '15 min',
      calories: '50 kcal',
      exercisesCompleted: 3,
      totalExercises: 5,
      painLevel: 2,
      difficulty: 2,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des activités</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <Text style={styles.date}>{activity.date}</Text>
            <Text style={styles.name}>{activity.name}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.details}>{activity.duration}</Text>
              <Text style={styles.details}>{activity.calories}</Text>
            </View>
            <Text style={styles.exercises}>
              {activity.exercisesCompleted} exercices sur {activity.totalExercises} réalisés
            </Text>
            <View style={styles.additionalDetailsRow}>
              <Text style={styles.additionalDetails}>
                Douleur ressentie : {activity.painLevel}/5
              </Text>
              <Text style={styles.additionalDetails}>
                Difficulté : {activity.difficulty}/5
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bouton Retour */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6dd5ed',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2193b0',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    fontSize: 14,
    color: '#666666',
  },
  exercises: {
    fontSize: 14,
    color: '#333333',
    marginTop: 10,
    marginBottom: 5,
  },
  additionalDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  additionalDetails: {
    fontSize: 14,
    color: '#666666',
  },
  backButton: {
    backgroundColor: '#2193b0',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ActivitiesHistory;