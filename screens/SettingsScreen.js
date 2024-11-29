// screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Nécessaire : expo install expo-linear-gradient

const SettingsScreen = ({ navigation, onLogout }) => {
  // Gestion des actions des boutons
  const handleProfileEdit = () => {
    navigation.navigate('EditProfile');
  };

  const handlePreferences = () => {
    Alert.alert('Préférences', 'Options de préférences à venir.');
  };

  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handleAbout = () => {
    Alert.alert(
      'À propos de l’application',
      'Version : 1.0.0\nCréée par votre équipe.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleLogout = () => {
    // Affiche une pop-up de confirmation
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnecter', style: 'destructive', onPress: onLogout }, // Appelle la fonction `onLogout`
      ]
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

      {/* Bouton Déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Blanc semi-transparent
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
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ff5047', // Rouge pour attirer l'attention
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    borderWidth: 2,
    borderColor: '#ffffff', // Bordure blanche
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoutText: {
    color: '#ffffff', // Texte en blanc
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;