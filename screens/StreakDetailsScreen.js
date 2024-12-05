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

        {/* Affichage actuel du stre