import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ProfileContext } from './ProfileContext'; // Import du contexte

const StreakDetailsScreen = () => {
  const { profile, updateStreak } = useContext(ProfileContext); // Accéder au streak depuis le contexte

  // Incrémente le streak
  const handleIncrement = async () => {
    const newStreak = profile.streak + 1;
    await updateStreak(newStreak);
  };

  // Réinitialise le streak
  const handleReset = async () => {
    await updateStreak(0);
  };

  return (
    <View style={styles.container}>
      {/* Contenu principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Comment est calculé le streak ?</Text>
        <Text style={styles.text}>
          Le streak correspond au nombre de jours consécutifs pendant lesquels vous avez atteint
          vos objectifs quotidiens d'activité physique.
        </Text>
        <Text style={styles.text}>
          Plus précisément, un streak augmente chaque jour où vous remplissez vos objectifs (comme
          faire 10 000 pas ou brûler 500 calories).
        </Text>
        <Text style={styles.text}>
          Si vous manquez un jour, le streak est réinitialisé à 0. Alors, continuez à bouger pour
          maintenir votre progression !
        </Text>

        {/* Astuce ou information motivante */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>Astuce :</Text>
          <Text style={styles.tipText}>
            Essayez de planifier des pauses actives chaque jour pour ne jamais casser votre streak.
          </Text>
        </View>

        {/* Boutons pour gérer le streak */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.incrementButton} onPress={handleIncrement}>
            <Text style={styles.buttonText}>Incrémenter le streak</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Réinitialiser le streak</Text>
          </TouchableOpacity>
        </View>

        {/* Affichage actuel du streak */}
        <View style={styles.streakDisplay}>
          <Text style={styles.streakTitle}>Streak actuel :</Text>
          <Text style={styles.streakValue}>{profile.streak}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 16,
  },
  tipContainer: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    color: '#007bff',
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row', // Positionne les boutons côte à côte
    justifyContent: 'space-between', // Ajoute un espace égal entre les boutons
    width: '100%', // Prend toute la largeur de l'écran
    paddingHorizontal: 20, // Ajoute des marges sur les côtés
  },
  incrementButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1, // Permet de répartir également les boutons
    alignItems: 'center',
    marginRight: 10, // Ajoute un espace entre les boutons
  },
  resetButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1, // Permet de répartir également les boutons
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  streakDisplay: {
    marginTop: 30,
    alignItems: 'center',
  },
  streakTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  streakValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default StreakDetailsScreen;