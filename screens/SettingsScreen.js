// screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Nécessaire : expo install expo-linear-gradient

const SettingsScreen = ({ navigation }) => {
  // Gestion des actions des boutons
  const handleProfileEdit = () => {
    // Naviguer vers une page "Modifier le profil"
    navigation.navigate('EditProfile');
  };

  const handlePreferences = () => {
    // Exemple d'alerte pour Préférences (ajouter une navigation si nécessaire)
    Alert.alert('Préférences', 'Options de préférences à venir.');
  };

  const handleNotifications = () => {
    // Naviguer vers une page Notifications
    navigation.navigate('Notifications');
  };

  const handleAbout = () => {
    // Exemple d'alerte pour "À propos de l'application"
    Alert.alert(
      'À propos de l’application',
      'Version : 1.0.0\nCréée par votre équipe.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <LinearGradient
      colors={['#6dd5ed', '#2193b0']} // Dégradé similaire aux autres écrans
      style={styles.container}
    >
      <Text style={styles.title}>Paramètres</Text>

      <View style={styles.optionContainer}>
        {/* Bouton Modifier le profil */}
        <TouchableOpacity style={styles.optionButton} onPress={handleProfileEdit}>
          <Text style={styles.optionText}>Modifier le profil</Text>
        </TouchableOpacity>

        {/* Bouton Préférences */}
        <TouchableOpacity style={styles.optionButton} onPress={handlePreferences}>
          <Text style={styles.optionText}>Préférences</Text>
        </TouchableOpacity>

        {/* Bouton Notifications */}
        <TouchableOpacity style={styles.optionButton} onPress={handleNotifications}>
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        {/* Bouton À propos */}
        <TouchableOpacity style={styles.optionButton} onPress={handleAbout}>
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