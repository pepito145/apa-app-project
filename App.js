import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './screens/AuthScreen';
import AppNavigator from './navigation/AppNavigator'; // Votre système de navigation

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('User Token:', userToken); // Vérifiez la valeur du token
        if (userToken) {
          setIsLoggedIn(true); // Définit l'utilisateur comme connecté
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
      setIsLoggedIn(true); // Définit l'utilisateur comme connecté
      console.log('Connexion réussie avec token :', token);
    } catch (e) {
      console.error('Erreur lors de la sauvegarde du token', e);
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
    <AppNavigator onLogout={handleLogout} /> // Navigation principale si connecté
  ) : (
    <AuthScreen onLogin={handleLogin} /> // Écran d'authentification si non connecté
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});