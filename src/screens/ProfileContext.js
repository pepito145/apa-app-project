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

  if (isLoading) {
    return null; // Ou un composant de chargement si vous préférez
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile, saveProfile, updateStreak, markFirstVisitComplete }}>
      {children}
    </ProfileContext.Provider>
  );
};