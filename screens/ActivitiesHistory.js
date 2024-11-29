import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ActivitiesHistory = ({ navigation }) => {
  // Données fictives pour les activités
  const activities = [
    { date: '28 Nov 2024', name: 'Yoga Matinal', duration: '30 min', calories: '150 kcal' },
    { date: '27 Nov 2024', name: 'Course à pied', duration: '45 min', calories: '300 kcal' },
    { date: '26 Nov 2024', name: 'HIIT', duration: '20 min', calories: '250 kcal' },
    { date: '25 Nov 2024', name: 'Cyclisme', duration: '60 min', calories: '400 kcal' },
    { date: '24 Nov 2024', name: 'Étirements', duration: '15 min', calories: '50 kcal' },
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