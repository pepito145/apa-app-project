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
    streak: '0',
  });

  // Charge les données depuis AsyncStorage
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
    const updatedProfile = { ...profile, streak: ne