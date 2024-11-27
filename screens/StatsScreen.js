// screens/StatsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Nécessaire : expo install expo-linear-gradient

const StatsScreen = () => {
  return (
    <LinearGradient
      colors={['#6dd5ed', '#2193b0']} // Dégradé similaire aux autres écrans
      style={styles.container}
    >
      <Text style={styles.title}>Statistiques</Text>

      <ScrollView contentContainerStyle={styles.statsContainer}>
        {/* Placeholder pour les statistiques */}
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Nombre de pas</Text>
          <Text style={styles.statValue}>7,500</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Calories brûlées</Text>
          <Text style={styles.statValue}>350 kcal</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>BPM moyen</Text>
          <Text style={styles.statValue}>72</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Activités complétées</Text>
          <Text style={styles.statValue}>12</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Streak actuel</Text>
          <Text style={styles.statValue}>5 jours</Text>
        </View>
      </ScrollView>

      {/* Bouton pour plus de détails */}
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Voir les détails complets</Text>
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
  statsContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fond blanc semi-transparent
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
  statTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2193b0',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  detailsButton: {
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
  detailsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2193b0',
  },
});

export default StatsScreen;