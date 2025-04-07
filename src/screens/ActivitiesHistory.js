import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useActivity } from './ActivityContext';
import { useFocusEffect } from '@react-navigation/native';


const ActivitiesHistory = ({ navigation }) => {
  const { activities, syncActivities } = useActivity();
  // Données fictives pour les activités
  /*replaced by useActivity
  const defaultActivities = [];
  const [activities, setActivities] = useState([]); */

  //useEffect(() => {
    /* No longer use
    const loadActivities = async () => {
      
      try {
        const savedActivities = await AsyncStorage.getItem('activitiesHistory');
        if (savedActivities) {
          const parsedActivities = JSON.parse(savedActivities);
          setActivities(parsedActivities);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'historique:', error);
      }
    };*/
    useFocusEffect(
      useCallback(() => {
        syncActivities();
      }, [])
    );

  return (
    <SafeAreaView style={styles.safeContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>Historique des activités</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <Text style={styles.date}>{activity.date}</Text>
            <Text style={styles.name}>{activity.name}</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.details}>{activity.duration}</Text>
              {activity.calories != null && (
                <Text style={styles.details}>calories: {activity.calories}</Text>
              )}
              {activity.hr_average != null && (
                <Text style={styles.details}>bpm: {activity.hr_average}</Text>
              )}
              {activity.intensity != null && (
                <Text style={styles.details}>intensity: {activity.intensity}</Text>
              )}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#6dd5ed', // Même couleur que l'en-tête
  },
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