import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
//import CustomButton from './components/CustomButton';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error('Erreur lors de la vérification du statut de connexion', e);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Bienvenue de retour sur APA Tracker !</Text>
        {/* Vous pouvez ajouter d'autres éléments ou navigation */}
        <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
          <Text style={styles.buttonText}>Se Déconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenue à l'application APA Tracker</Text>
      <Text style={styles.subtitle}>Pour continuer, veuillez vous connecter ou créer un compte.</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin('tokenExemple')}>
          <Text style={styles.buttonText}>Se Connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );

  async function handleLogin(token) {
    try {
      await AsyncStorage.setItem('userToken', token);
      setIsLoggedIn(true);
    } catch (e) {
      console.error('Erreur lors de la connexion', e);
    }
  }

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsLoggedIn(false);
    } catch (e) {
      console.error('Erreur lors de la déconnexion', e);
    }
  }
}

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
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    padding: 12,
    marginHorizontal: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    minWidth: '40%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});