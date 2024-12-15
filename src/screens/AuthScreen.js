import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, Image } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient'; // Nécessaire : expo install expo-linear-gradient
import logo from '../../assets/logo-test.png'; 

const { width, height } = Dimensions.get('window');

const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/api', // Utilisez l'IP correcte pour le backend
});

const AuthScreen = ({ onLogin }) => {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // État pour gérer la page active
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setName('');
    setFirstname('');
    setPassword('');
    setConfirmPassword('');
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSkip = () => {
    console.log('Authentification ignorée');
    onLogin('guest'); // Passe un token factice ou une valeur indiquant le mode invité
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erreur', 'Veuillez saisir un email valide.');
      return;
    }

    try {
      const response = await api.post('/login/', { email, password });
      if (response.data.token) {
        console.log('Connexion réussie avec token :', response.data.token);
        onLogin(response.data.token); // Passe le token à App.js
      } else {
        alert('Erreur : Token manquant');
      }
    } catch (error) {
      console.error('Erreur backend :', error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || 'Connexion échouée. Veuillez réessayer.';
      Alert.alert('Erreur', errorMessage); // Affiche le message d'erreur précis
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
  
    if (!email || !password || !name || !firstname || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
  
    if (!isValidEmail(email)) {
      Alert.alert('Erreur', 'Veuillez saisir un email valide.');
      return;
    }
  
    try {
      const response = await api.post('/register/', {
        email,
        password,
        last_name: name,
        first_name: firstname,
      });
      if (response.status === 201) {
        Alert.alert('Inscription réussie !', 'Vous pouvez maintenant vous connecter.');
        setCurrentScreen('login'); // Redirige vers le formulaire de connexion
        resetForm();
      }
    } catch (error) {
      console.error('Erreur backend (inscription) :', error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || 'Inscription échouée. Veuillez réessayer.';
      Alert.alert('Erreur', errorMessage); // Affiche le message d'erreur précis
    }
  };

  return (
    <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>

    
      {currentScreen === 'welcome' && (
        <>
          {/* Bouton Skip */}
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <Text style={styles.appTitle}>Bienvenue dans l'application APA !</Text>
          <Text style={styles.subtitle}>Chaque pas vous rapproche de vos objectifs !</Text>
          <Image source={logo} style={styles.logo} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.shadow]} onPress={() => setCurrentScreen('login')}>
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.shadow]} onPress={() => setCurrentScreen('signup')}>
              <Text style={[styles.buttonText, styles.gradientButtonText]}>Inscription</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {currentScreen === 'login' && (
        <>
          <Text style={styles.loginTitle}>Connexion</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#ffffff"
          />
          <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentScreen('welcome');
              resetForm();
            }}
          >
            <Text style={styles.secondaryButtonText}>Retour</Text>
          </TouchableOpacity>
          <Image source={logo} style={styles.logoSmall} />
        </>
      )}

      {currentScreen === 'signup' && (
        <>
          <Text style={styles.signupTitle}>Inscription</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={firstname}
            onChangeText={setFirstname}
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#ffffff"
          />
          <TouchableOpacity style={[styles.button, styles.gradientButton]} onPress={handleSignup}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentScreen('welcome');
              resetForm();
            }}
          >
            <Text style={styles.secondaryButtonText}>Retour</Text>
          </TouchableOpacity>
          <Image source={logo} style={styles.logoSmall} />
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: height * 0.04,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: height * 0.125,
  },
  loginTitle: {
    fontSize: height * 0.04,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: height * 0.32,
    marginBottom: height * 0.025,
  },
  signupTitle: {
    fontSize: height * 0.04,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: height * 0.19,
    marginBottom: height * 0.025,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: height * 0.03,
    marginHorizontal: width * 0.05,
  },
  input: {
    width: '80%',
    height: 50, // Hauteur fixe pour le champ
    paddingVertical: 0, // Supprimez tout padding vertical excessif
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 30,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'left', // Centre horizontalement
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute', // Place le conteneur en position absolue
    bottom: height * 0.05, // Distance du bas de l'écran
  },
  button: {
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // Supprimez ou ajustez ces propriétés si elles causent des problèmes :
    width: '40%', // Fixez une largeur
    alignSelf: 'center', // Centrez le bouton
    marginTop: height * 0.01,
  },
  buttonText: {
    color: '#2193b0', // Une couleur uniforme pour tous les boutons
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Centre le texte dans le bouton
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  secondaryButtonText: {
    marginTop: height * 0.02,
  },
  logo: {
    marginTop: height * 0.02,
    width: width * 1.1, // Ajustez la taille au besoin
    height: width * 1.1,
    resizeMode: 'contain', // Assurez un redimensionnement proportionnel
    alignSelf: 'center', // Centre horizontalement dans le conteneur
  },
  logoSmall: {
    width: width * 0.2, // Largeur du logo en bas des écrans de connexion et inscription
    height: width * 0.2,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.02, // Espacement pour éviter l’encombrement
  },
  // Autres styles existants
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    zIndex: 10, // S'assure que le bouton est au-dessus des autres composants
  },
  skipButtonText: {
    color: '#2193b0',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AuthScreen;