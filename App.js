// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './screens/AuthScreen';
import AppNavigator from './navigation/AppNavigator'; // Navigation pour les utilisateurs connectés

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // TEMPORAIRE : Pour tester, retirez ceci après
        await AsyncStorage.clear();

        const userToken = await AsyncStorage.getItem('userToken');
        console.log('User Token:', userToken); // Pour vérifier la valeur du token
        if (userToken) {
          setIsLoggedIn(true); // L'utilisateur est connecté
        }
      } catch (e) {
        console.error('Erreur lors de la vérification du statut de connexion', e);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setIsLoggedIn(true); // Définir l'utilisateur comme connecté
    } catch (e) {
      console.error('Erreur lors de la connexion', e);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsLoggedIn(false); // Déconnexion
    } catch (e) {
      console.error('Erreur lors de la déconnexion', e);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return isLoggedIn ? (
    <AppNavigator onLogout={handleLogout} /> // Affiche la navigation principale si connecté
  ) : (
    <AuthScreen onLogin={handleLogin} /> // Affiche l'écran d'authentification si non connecté
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});