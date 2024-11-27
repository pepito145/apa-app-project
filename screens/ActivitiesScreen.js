// screens/ActivitiesScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Nécessaire : expo install expo-linear-gradient

const ActivitiesScreen = ({ onHistoryPress }) => {
  return (
    <LinearGradient
      colors={['#2193b0', '#6dd5ed']} // Dégradé ajusté pour correspondre à l'esthétique globale
      style={styles.container}
    >
      <Text style={styles.title}>Activités</Text>

      <ScrollView contentContainerStyle={styles.activitiesContainer}>
        {/* Placeholder pour les activités */}
        <TouchableOpacity style={styles.activityCard}>
          <Text style={styles.activityTitle}>Yoga</Text>
          <Text style={styles.activityDescription}>Relaxation et flexibilité</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.activityCard}>
          <Text style={styles.activityTitle}>Course</Text>
          <Text style={styles.activityDescription}>Améliorez votre endurance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.activityCard}>
          <Text style={styles.activityTitle}>Renforcement musculaire</Text>
          <Text style={styles.activityDescription}>Développez votre force</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.activityCard}>
          <Text style={styles.activityTitle}>Étirements</Text>
          <Text style={styles.activityDescription}>Améliorez votre souplesse</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bouton Historique */}
      <TouchableOpacity style={styles.historyButton} onPress={onHistoryPress}>
        <Text style={styles.historyButtonText}>Voir l'historique des activités</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  activitiesContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Blanc semi-transparent pour l'esthétique
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2193b0',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666666',
  },
  historyButton: {
    position: 'absolute', // Fixé en bas de l'écran
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  historyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2193b0',
  },
});

export default ActivitiesScreen;