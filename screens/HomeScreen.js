// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Nécessaire : expo install expo-linear-gradient
import mascot from '../assets/logo-test.png'; // Assurez-vous que l'image existe dans assets

const HomeScreen = ({ onLogout }) => {
  return (
    <LinearGradient
      colors={['#2193b0', '#6dd5ed']} // Dégradé ajusté pour être similaire mais différent
      style={styles.container}
    >
      <Text style={styles.welcomeText}>Bon retour sur APA App !</Text>
      <Image source={mascot} style={styles.mascotte} />
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Nombre de pas</Text>
          <Text style={styles.statValue}>7,500</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Calories dépensées</Text>
          <Text style={styles.statValue}>350 kcal</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>BPM</Text>
          <Text style={styles.statValue}>75 ❤️</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Streak 🔥</Text>
          <Text style={styles.statValue}>5</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Se Déconnecter</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 16,
  },
  mascotte: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  statsContainer: {
    width: '90%',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Blanc semi-transparent
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statTitle: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#333',
  },
  button: {
    padding: 12,
    backgroundColor: '#ff5047',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '80%',
    borderWidth: 2,
    borderColor: '#6dd5ed', // Contour bleu clair
  },
  buttonText: {
    color: '#2193b0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;