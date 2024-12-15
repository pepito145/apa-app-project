import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';

// Configuration des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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

      const requestPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission requise',
            'Les notifications sont nécessaires pour vous rappeler vos activités.'
          );
        }
      };
  
      requestPermissions();
      loadPreferences();
    };

    loadPreferences();
  }, []);


  // Programmer les notifications
  const scheduleDailyReminder = async (enabled) => {
    if (enabled) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "C'est l'heure de votre activité !",
          body: "N'oubliez pas votre séance d'exercices quotidienne 💪",
        },
        trigger: {
          hour: 13, // Notification à 10h
          minute: 30,
          repeats: true,
        },
      });
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const scheduleWeeklyProgress = async (enabled) => {
    if (enabled) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Récapitulatif hebdomadaire',
          body: 'Consultez vos progrès de la semaine ! 📊',
        },
        trigger: {
          weekday: 7, // Dimanche
          hour: 18,
          minute: 0,
          repeats: true,
        },
      });
    }
  };

  // Modifier la fonction savePreference existante
  const savePreference = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      
      // Gérer les différents types de notifications
      switch (key) {
        case 'dailyReminder':
          await scheduleDailyReminder(value);
          break;
        case 'weeklyProgress':
          await scheduleWeeklyProgress(value);
          break;
        case 'activityCompleted':
          // Ces notifications seront déclenchées après chaque activité
          break;
        case 'goalAchieved':
          // Ces notifications seront déclenchées lors de l'atteinte d'objectifs
          break;
        case 'encouragementMessages':
          // Ces notifications peuvent être programmées aléatoirement
          break;
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde :', error);
    }
  };
  
  // Fonction pour envoyer une notification immédiate (pour les tests)
  const sendImmediateNotification = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Notifications désactivées', 'Activez les notifications dans les paramètres.');
      return;
    }
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Test de notification',
        body: 'Cette notification apparaît immédiatement !',
      },
      trigger: null, // null signifie notification immédiate
    });
  
    Alert.alert('Notification envoyée !', 'La notification devrait apparaître.');
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

      {/* Bouton de test */}
      <TouchableOpacity
        style={styles.testButton}
        onPress={sendImmediateNotification}
      >
        <Text style={styles.testButtonText}>Tester les notifications</Text>
      </TouchableOpacity>

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
  testButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2193b0',
    textAlign: 'center',
  },
});

export default NotificationsScreen;