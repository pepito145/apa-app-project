import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crée un contexte
export const ProfileContext = createContext();

// Fournisseur de contexte
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    weight: '',
    ipaqScore: '',
  });

  // Charger les données depuis AsyncStorage
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil :', error);
      }
    };
    loadProfile();
  }, []);

  // Sauvegarder les données dans AsyncStorage
  const saveProfile = async (updatedProfile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      console.log('Profil sauvegardé !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du profil :', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, saveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};