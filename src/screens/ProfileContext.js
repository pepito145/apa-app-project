import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import api from '../../api';

// Crée un contexte
export const ProfileContext = createContext();

//charger le profil
export const ProfileProvider = ({ children }) => {
  const loadProfileFromBackend = async () => {
    try {
      
      let email = await AsyncStorage.getItem('email');

      
      console.log("email: ",email);
      const response = await api.get('get_profil/', {
        params: { email }
      });
      await saveProfile(response.data); 
    } catch (error) {
      console.error('Erreur lors du chargement du profil depuis le backend :', error);
    }
  };


// Context:

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    weight: '',
    ipaqScore: 0,
    streak: 0,
    isWithingsLinked: false,
    isFirstVisit: true,
    stepsGoal: 5000,
    isStreakPaused: false,
    XP: 0,
    level: 1,
    lastDailyXPDate: null,
    lastStepsXPDate: null,
    last_level: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const LEVEL_DATA = {
    // Chaque niveau nécessite 1.5x plus d'XP que le précédent
    getXPForLevel: (level) => Math.floor(1000 * Math.pow(1.5, level - 1)),
    
    // Titres et récompenses par niveau
    getTitleAndRewards: (level) => {
      const titles = {
        1: { 
          title: "Débutant",
          description: "Premiers pas vers une vie active",
          reward: "Déblocage des activités de base"
        },
        5: {
          title: "Sportif Amateur",
          description: "Développement d'habitudes saines",
          reward: "Déblocage des statistiques détaillées"
        },
        10: {
          title: "Athlète en Devenir",
          description: "Progression constante",
          reward: "Déblocage des défis hebdomadaires"
        },
        15: {
          title: "Athlète Confirmé",
          description: "Engagement régulier",
          reward: "Déblocage des objectifs personnalisés"
        },
        20: {
          title: "Expert Fitness",
          description: "Maîtrise de l'activité physique",
          reward: "Déblocage des programmes avancés"
        }
      };
      
      // Trouve le plus haut niveau débloqué
      const highestUnlockedLevel = Math.max(...Object.keys(titles)
        .map(Number)
        .filter(lvl => lvl <= level));
      
      return titles[highestUnlockedLevel];
    }
  };

  // Charge les données depuis AsyncStorage
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil :', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  // Sauvegarde les données dans AsyncStorage avec gestion de l'XP
  const saveProfile = async (updatedProfile) => {
    try {
      // Récupérer d'abord le profil le plus récent d'AsyncStorage
      const currentSavedProfile = await AsyncStorage.getItem('userProfile');
      const parsedCurrentProfile = currentSavedProfile ? JSON.parse(currentSavedProfile) : profile;

      // Fusionner avec les nouvelles données
      const finalProfile = {
        ...parsedCurrentProfile,
        ...updatedProfile
      };

      // Si l'XP a changé, calculer le nouveau niveau
      if (finalProfile.XP !== parsedCurrentProfile.XP) {
        const currentLevel = calculateLevel(parsedCurrentProfile.XP || 0);
        const newLevel = calculateLevel(finalProfile.XP);
        
        finalProfile.level = newLevel;

        console.log('Mise à jour XP:', {
          ancien: parsedCurrentProfile.XP,
          nouveau: finalProfile.XP,
          ancienNiveau: currentLevel,
          nouveauNiveau: newLevel
        });

        // Notification de niveau si nécessaire
        if (newLevel > currentLevel) {
          const levelData = LEVEL_DATA.getTitleAndRewards(newLevel);
          Alert.alert(
            '🎉 Niveau supérieur !',
            `Félicitations ! Vous avez atteint le niveau ${newLevel} !\n\n` +
            `Nouveau titre : ${levelData.title}\n` +
            `${levelData.description}\n\n` +
            `Récompense débloquée : ${levelData.reward}`,
            [{ text: 'Super !' }]
          );
        }
      }

      // Sauvegarder dans AsyncStorage
      await AsyncStorage.setItem('userProfile', JSON.stringify(finalProfile));
      
      // Mettre à jour le state
      setProfile(finalProfile);
      
      console.log('Profil sauvegardé avec succès. XP actuel:', finalProfile.XP);
      let email = await AsyncStorage.getItem('email');

      // ===== 🔽 POST 到后端 /update_profil/ 接口 =====
      const {
        firstName,
        lastName,
        age,
        weight,
        gender,
        XP,
        level,
        ipaqScore,
      } = finalProfile;
      const payload = {
        firstName,
        lastName,
        age,
        weight,
        gender,
        email,
        XP,
        level,
        ipaqScore,
      };
      await api.post('update_profil/', payload);





    } catch (error) {
      console.error('Erreur lors de la sauvegarde du profil :', error);
    }
  };

  // Méthode pour mettre à jour le streak
  const updateStreak = async (newStreak) => {
    const updatedProfile = { ...profile, streak: newStreak };
    await saveProfile(updatedProfile);
  };

  // Méthode pour marquer la première visite comme terminée
  const markFirstVisitComplete = async () => {
    const updatedProfile = { ...profile, isFirstVisit: false };
    await saveProfile(updatedProfile);
  };

  // Méthode pour mettre à jour l'objectif de pas
  const updateStepsGoal = async (newGoal) => {
    const updatedProfile = { ...profile, stepsGoal: newGoal };
    await saveProfile(updatedProfile);
  };

  // Méthode pour mettre en pause/reprendre le streak
  const toggleStreakPause = async () => {
    const updatedProfile = { 
      ...profile, 
      isStreakPaused: !profile.isStreakPaused 
    };
    await saveProfile(updatedProfile);
  };

  // Calcule le niveau actuel basé sur l'XP
  const calculateLevel = (xp) => {
    let level = 1;
    while (xp >= LEVEL_DATA.getXPForLevel(level + 1)) {
      level++;
    }
    return level;
  };

  // Simplifier addXP pour utiliser saveProfile
  const addXP = async (amount) => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      const currentProfile = savedProfile ? JSON.parse(savedProfile) : profile;
      const currentXP = Number(currentProfile.XP) || 0;
      const newXP = currentXP + amount;
  
      const updatedProfile = {
        ...currentProfile,
        XP: newXP
      };
  
      await saveProfile(updatedProfile);
    } catch (error) {
      console.error('Erreur dans addXP (avec AsyncStorage):', error);
    }
  };

  // Méthode pour vérifier et attribuer les XP de pas
  const checkStepsXP = async (steps) => {
    const today = new Date().toDateString();
    if (profile.lastStepsXPDate !== today && steps >= profile.stepsGoal) {
      await addXP(50);
    }
  };

  // Méthode pour attribuer les XP de streak
  const addStreakXP = async () => {
    await addXP(20);
  };

  // Méthode pour les XP d'activité
  const addActivityXP = async (duration, completedExercises, totalExercises) => {
    const baseXP = Math.floor(duration / 10) * 15; // 15 XP par 10 minutes
    const completionRate = completedExercises / totalExercises;
    const exerciseBonus = Math.floor(completionRate * 100); // Bonus basé sur le taux de complétion
    const sessionBonus = completedExercises === totalExercises ? 50 : 0; // Bonus pour session complète
    
    await addXP(baseXP + exerciseBonus + sessionBonus);
  };

  // Méthode pour attribuer les XP de questionnaire
  const addQuestionnaireXP = async () => {
    await addXP(200);
  };





  const printAllAsyncStorage = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allItems = await AsyncStorage.multiGet(allKeys);
  
      console.log('📦 Tous les éléments dans AsyncStorage :');
      allItems.forEach(([key, value]) => {
        console.log(`🔑 ${key} =>`, value);
      });
    } catch (error) {
      console.error('❌ Erreur lors de la lecture de AsyncStorage :', error);
    }
  };











  if (isLoading) {
    return null; // Ou un composant de chargement si vous préférez
  }

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      setProfile, 
      saveProfile, 
      updateStreak, 
      markFirstVisitComplete,
      updateStepsGoal,
      toggleStreakPause,
      addXP,
      checkStepsXP,
      addStreakXP,
      addActivityXP,
      addQuestionnaireXP,
      calculateLevel,
      loadProfileFromBackend, //nouveau
      printAllAsyncStorage,
      LEVEL_DATA,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};