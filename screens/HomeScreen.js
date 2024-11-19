// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ onLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bon retour sur APA Tracker !</Text>
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
          <Text style={styles.statValue}>75</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Se Déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    width: '90%',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  button: {
    padding: 12,
    backgroundColor: '#ff0000',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '80%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default HomeScreen;