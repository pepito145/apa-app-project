import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { ProfileContext } from './ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const StreakDetailsScreen = () => {
  const { profile, toggleStreakPause, addStreakXP } = useContext(ProfileContext);

  useEffect(() => {
    // Attribuer des XP chaque fois que le streak augmente
    if (profile.streak > 0 && !profile.isStreakPaused) {
      addStreakXP();
    }
  }, [profile.streak]);

  const handleTogglePause = async () => {
    Alert.alert(
      profile.isStreakPaused ? 'Reprendre la série' : 'Mettre en pause',
      profile.isStreakPaused 
        ? 'Êtes-vous sûr de vouloir reprendre votre série ?' 
        : 'Êtes-vous sûr de vouloir mettre en pause votre série ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Confirmer',
          onPress: async () => {
            await toggleStreakPause();
          }
        }
      ]
    );
  };

  const streakMilestones = [
    { days: 7, reward: "Déblocage du badge 'Semaine Active'" },
    { days: 30, reward: "Déblocage du badge 'Mois Sportif'" },
    { days: 100, reward: "Déblocage du badge 'Champion'" },
  ];

  return (
    <LinearGradient 
      colors={['#6dd5ed', '#2193b0']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* En-tête avec le streak actuel */}
        <View style={styles.header}>
          <Text style={styles.title}>Votre Série Active</Text>
          <View style={styles.streakDisplay}>
            <Text style={styles.streakNumber}>{profile.streak}</Text>
            {profile.isStreakPaused && (
              <View style={styles.pauseBadge}>
                <Text style={styles.pauseText}>EN PAUSE</Text>
              </View>
            )}
          </View>
        </View>

        {/* Section explicative */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="info-outline" size={24} color="#fff" />
            <Text style={styles.sectionTitle}>Comment ça fonctionne ?</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.explanationText}>
              Votre série augmente chaque jour où vous atteignez vos objectifs quotidiens :
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Atteindre votre objectif de pas</Text>
              <Text style={styles.bulletPoint}>• Compléter une activité physique</Text>
              <Text style={styles.bulletPoint}>• Maintenir une activité régulière</Text>
            </View>
          </View>
        </View>

        {/* Section de pause */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="timer" size={24} color="#fff" />
            <Text style={styles.sectionTitle}>Besoin d'une pause ?</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.explanationText}>
              Nous comprenons que parfois, il n'est pas possible de maintenir une activité quotidienne
              (maladie, voyage, contraintes professionnelles...). Vous pouvez mettre votre série en pause
              pour la préserver.
            </Text>
            <TouchableOpacity
              style={[
                styles.pauseButton,
                profile.isStreakPaused ? styles.resumeButton : styles.pauseButtonColor
              ]}
              onPress={handleTogglePause}
            >
              <Text style={styles.pauseButtonText}>
                {profile.isStreakPaused ? 'Reprendre la série' : 'Mettre en pause'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  streakDisplay: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  streakLabel: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  pauseBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  pauseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
  },
  explanationText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  bulletPoints: {
    marginTop: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    lineHeight: 24,
  },
  milestoneCard: {
    marginBottom: 10,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  milestoneDays: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2193b0',
  },
  milestoneReward: {
    fontSize: 16,
    color: '#666',
  },
  pauseButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  pauseButtonColor: {
    backgroundColor: '#FF5722',
  },
  resumeButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StreakDetailsScreen;