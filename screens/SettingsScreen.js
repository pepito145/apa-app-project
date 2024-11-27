// screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Nécessaire : expo install expo-linear-gradient

const SettingsScreen = () => {
  return (
    <LinearGradient
      colors={['#6dd5ed', '#2193b0']} // Dégradé similaire aux autres écrans
      style={styles.container}
    >
      <Text style={styles.title}>Paramètres</Text>

      {/* Placeholder pour les futurs paramètres */}
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Modifier le profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Préférences</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>À propos de l'application</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  optionContainer: {
    width: '80%',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Blanc semi-transparent pour correspondre au design
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  optionText: {
    color: '#2193b0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;