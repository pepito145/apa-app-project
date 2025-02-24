import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { ProfileContext } from './ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const XPDetailsScreen = () => {
  const { profile, setProfile, calculateLevel, LEVEL_DATA, addXP } = useContext(ProfileContext);

  useFocusEffect(
    React.useCallback(() => {
      // Recharger les données quand l'écran devient actif
      const loadProfile = async () => {
        try {
          const savedProfile = await AsyncStorage.getItem('userProfile');
          if (savedProfile) {
            const parsedProfile = JSON.parse(savedProfile);
            setProfile(parsedProfile);
          }
        } catch (error) {
          console.error('Erreur lors du rechargement du profil:', error);
        }
      };
      loadProfile();
    }, [])
  );

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
        }
      } catch (error) {
        console.error('Erreur lors du rechargement du profil:', error);
      }
    };
    loadProfile();
  }, [profile.XP]); // Se déclenche quand l'XP change

  const xpSources = [
    {
      title: "Activité quotidienne",
      description: "Gagnez de l'XP en atteignant vos objectifs quotidiens de pas",
      icon: "directions-walk"
    },
    {
      title: "Séances d'exercice",
      description: "Complétez des séances d'exercice programmées",
      icon: "fitness-center"
    },
    {
      title: "Maintien du streak",
      description: "Bonus pour chaque jour consécutif d'activité",
      icon: "local-fire-department"
    },
    {
      title: "Questionnaires",
      description: "Remplissez les questionnaires de suivi",
      icon: "assignment"    
    }
  ];

  // Fonction pour ajouter/retirer de l'XP (pour tests)
  const modifyXP = async (amount) => {
    await addXP(amount);
  };

  // Fonction pour réinitialiser l'XP
  const resetXP = async () => {
    const updatedProfile = {
      ...profile,
      XP: 0,
      level: 1
    };
    await saveProfile(updatedProfile);
    setProfile(updatedProfile);
  };

  // Calcul de la progression vers le prochain niveau
  const getProgressToNextLevel = () => {
    const currentLevel = calculateLevel(profile.XP);
    const currentLevelXP = LEVEL_DATA.getXPForLevel(currentLevel);
    const nextLevelXP = LEVEL_DATA.getXPForLevel(currentLevel + 1);
    const xpInCurrentLevel = profile.XP - currentLevelXP;
    const xpNeededForNextLevel = nextLevelXP - currentLevelXP;
    return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
  };

  return (
    <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Niveau {calculateLevel(profile.XP)}</Text>
          <Text style={styles.subtitle}>
            {LEVEL_DATA.getTitleAndRewards(calculateLevel(profile.XP)).title}
          </Text>
          
          <View style={styles.levelDisplay}>
            <View style={styles.progressBarContainer}>
              <View 
                style={[styles.progressBar, { width: `${getProgressToNextLevel()}%` }]} 
              />
            </View>
            <Text style={styles.xpProgress}>
              {profile.XP} / {LEVEL_DATA.getXPForLevel(calculateLevel(profile.XP) + 1)} XP
            </Text>
          </View>

          {/* Boutons de test XP */}
          <View style={styles.xpButtons}>
            <TouchableOpacity 
              style={[styles.xpButton, styles.addButton]}
              onPress={() => modifyXP(100)}
            >
              <Text style={styles.buttonText}>+100 XP</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.xpButton, styles.removeButton]}
              onPress={() => modifyXP(-100)}
            >
              <Text style={styles.buttonText}>-100 XP</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.xpButton, styles.resetButton]}
              onPress={resetXP}
            >
              <Text style={styles.buttonText}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progression des niveaux</Text>
          <Text style={styles.description}>
            Chaque niveau nécessite plus d'XP que le précédent. Continuez à être actif pour progresser !
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sources d'XP</Text>
          {xpSources.map((source, index) => (
            <View key={index} style={styles.sourceCard}>
              <MaterialIcons name={source.icon} size={24} color="#2193b0" />
              <View style={styles.sourceInfo}>
                <Text style={styles.sourceTitle}>{source.title}</Text>
                <Text style={styles.sourceDescription}>{source.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Récompenses débloquées</Text>
          {Object.entries(LEVEL_DATA.getTitleAndRewards(calculateLevel(profile.XP))).map(([key, value], index) => (
            <View key={index} style={styles.rewardCard}>
              <Text style={styles.rewardTitle}>{value}</Text>
            </View>
          ))}
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
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  levelDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  xpProgress: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  xpButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  xpButton: {
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  removeButton: {
    backgroundColor: '#f44336',
  },
  resetButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  sourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sourceInfo: {
    marginLeft: 10,
  },
  sourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sourceDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  rewardCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default XPDetailsScreen; 