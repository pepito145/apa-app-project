import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const NotificationsScreen = () => {
  // États pour chaque notification
  const [dailyReminder, setDailyReminder] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState(false);
  const [goalAchieved, setGoalAchieved] = useState(false);
  const [encouragementMessages, setEncouragementMessages] = useState(false);

  // Charger les préférences au démarrage
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await AsyncStorage.multiGet([
          'dailyReminder',
          'activityCompleted',
          'weeklyProgress',
          'goalAchieved',
          'encouragementMessages',
        ]);

        if (preferences) {
          setDailyReminder(JSON.parse(preferences[0][1] || 'false'));
          setActivityCompleted(JSON.parse(preferences[1][1] || 'false'));
          setWeeklyProgress(JSON.parse(preferences[2][1] || 'false'));
          setGoalAchieved(JSON.parse(preferences[3][1] || 'false'));
          setEncouragementMessages(JSON.parse(preferences[4][1] || 'false'));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des préférences :', error);
      }
    };

    loadPreferences();
  }, []);

  // Sauvegarder une préférence
  const savePreference = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      //Alert.alert('Préférence mise à jour', `Vos réglages pour "${key}" ont été sauvegardés.`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
    }
  };

  return (
    <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>

      {/* Section Activités */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activités</Text>

        {/* Rappel quotidien */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Rappel quotidien</Text>
          <Switch
            value={dailyReminder}
            onValueChange={(value) => {
              setDailyReminder(value);
              savePreference('dailyReminder', value);
            }}
            trackColor={{ false: '#ccc', true: '#007bff' }}
            thumbColor={dailyReminder ? '#007bff' : '#f4f3f4'}
          />
        </View>

        {/* Confirmation d’activité terminée */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Confirmation d’activité terminée</Text>
          <Switch
            value={activityCompleted}
            onValueChange={(value) => {
              setActivityCompleted(value);
              savePreference('activityCompleted', value);
            }}
            trackColor={{ false: '#ccc', true: '#007bff' }}
            thumbColor={activityCompleted ? '#007bff' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Section Objectifs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objectifs</Text>

        {/* Progrès vers l’objectif hebdomadaire */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Progrès hebdomadaire</Text>
          <Switch
            value={weeklyProgress}
            onValueChange={(value) => {
              setWeeklyProgress(value);
              savePreference('weeklyProgress', value);
            }}
            trackColor={{ false: '#ccc', true: '#007bff' }}
            thumbColor={weeklyProgress ? '#007bff' : '#f4f3f4'}
          />
        </View>

        {/* Atteinte d’un objectif */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Atteinte d’un objectif</Text>
          <Switch
            value={goalAchieved}
            onValueChange={(value) => {
              setGoalAchieved(value);
              savePreference('goalAchieved', value);
            }}
            trackColor={{ false: '#ccc', true: '#007bff' }}
            thumbColor={goalAchieved ? '#007bff' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Section Motivation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Motivation</Text>

        {/* Messages d’encouragement */}
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Messages d’encouragement</Text>
          <Switch
            value={encouragementMessages}
            onValueChange={(value) => {
              setEncouragementMessages(value);
              savePreference('encouragementMessages', value);
            }}
            trackColor={{ false: '#ccc', true: '#007bff' }}
            thumbColor={encouragementMessages ? '#007bff' : '#f4f3f4'}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default NotificationsScreen;