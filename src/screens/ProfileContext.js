import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crée un contexte
export const ProfileContext = createContext();

// Context:
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    weight: '',
    ipaqScore: '',
    streak: 0,
    isWithingsLinked: false,
    access_token: '',
    refresh_token: '',
    isFirstVisit: true,
    stepsGoal: 5000,
    isStreakPaused: false,
    XP: 0,
    lastDailyXPDate: null,
    lastStepsXPDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);

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

  // Sauvegarde les données dans AsyncStorage
  const saveProfile = async (updatedProfile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      console.log('Profil sauvegardé !');
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

  // Méthode pour ajouter des XP
  const addXP = async (amount, source) => {
    const today = new Date().toDateString();
    let shouldAddXP = true;

    // Vérification pour les XP quotidiens
    if (source === 'daily' && profile.lastDailyXPDate === today) {
      shouldAddXP = false;
    }

    // Vérification pour les XP de pas
    if (source === 'steps' && profile.lastStepsXPDate === today) {
      shouldAddXP = false;
    }

    if (shouldAddXP) {
      const updatedProfile = {
        ...profile,
        XP: (profile.XP || 0) + amount,
        ...(source === 'daily' && { lastDailyXPDate: today }),
        ...(source === 'steps' && { lastStepsXPDate: today })
      };
      await saveProfile(updatedProfile);
    }
  };

  // Méthode pour vérifier et attribuer les XP de pas
  const checkStepsXP = async (steps) => {
    const today = new Date().toDateString();
    if (profile.lastStepsXPDate !== today && steps >= profile.stepsGoal) {
      await addXP(50, 'steps');
    }
  };

  // Méthode pour attribuer les XP de streak
  const addStreakXP = async () => {
    await addXP(20, 'streak');
  };

  // Méthode pour attribuer les XP d'activité
  const addActivityXP = async (duration) => {
    // 10 XP par tranche de 10 minutes d'activité
    const xpAmount = Math.floor(duration / 10) * 10;
    await addXP(xpAmount, 'activity');
  };

  // Méthode pour attribuer les XP de questionnaire
  const addQuestionnaireXP = async () => {
    await addXP(200, 'questionnaire');
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
      addQuestionnaireXP
    }}>
      {children}
    </ProfileContext.Provider>
  );
};