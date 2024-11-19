// screens/AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AuthScreen = ({ onLogin }) => {
  const [showLoginForm, setShowLoginForm] = useState(false); // État pour afficher le formulaire de connexion
  const [showSignupForm, setShowSignupForm] = useState(false); // État pour afficher le formulaire d'inscription
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Champ supplémentaire pour l'inscription

  const resetForm = () => {
    setEmail('');
    setName('');
    setFirstname('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleLogin = () => {
    if (email && password) {
      onLogin('tokenExemple');
    } else {
      alert('Veuillez entrer un email et un mot de passe.');
    }
  };

  const handleSignup = () => {
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        // Logique d'inscription (ex. : appel à une API)
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        setShowSignupForm(false);
        setShowLoginForm(false);
      } else {
        alert('Les mots de passe ne correspondent pas.');
      }
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  // Déterminer le titre dynamique
  const getTitle = () => {
    if (showLoginForm) {
      return 'Connexion à APA Tracker';
    } else if (showSignupForm) {
      return 'Inscription à APA Tracker';
    }
    return 'Bienvenue à l\'application APA Tracker';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{getTitle()}</Text>

      {!showLoginForm && !showSignupForm && (
        <>
          <Text style={styles.subtitle}>Pour continuer, veuillez vous connecter ou créer un compte.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setShowLoginForm(true)}>
              <Text style={styles.buttonText}>Se Connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowSignupForm(true)}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {showLoginForm && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se Connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => { setShowLoginForm(false); resetForm(); }}>
            <Text style={styles.secondaryButtonText}>Retour</Text>
          </TouchableOpacity>
        </>
      )}

      {showSignupForm && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            keyboardType="email-address"
            autoCapitalize="words"
            value={firstname}
            onChangeText={setFirstname}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => { setShowSignupForm(false); resetForm(); }}>
            <Text style={styles.secondaryButtonText}>Retour</Text>
          </TouchableOpacity>
        </>
      )}
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
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
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
  secondaryButton: {
    padding: 12,
    marginTop: 16,
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default AuthScreen;