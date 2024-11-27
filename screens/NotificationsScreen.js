// screens/NotificationsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Nécessaire : expo install expo-linear-gradient

const NotificationsScreen = () => {
  // États pour les switches
  const [dailyReminder, setDailyReminder] = useState(false);
  const [activityUpdates, setActivityUpdates] = useState(true);
  const [goalProgress, setGoalProgress] = useState(false);

  return (
    <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>

      <View style={styles.optionContainer}>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Rappel quotidien</Text>
          <Switch
            value={dailyReminder}
            onValueChange={setDailyReminder}
            trackColor={{ false: '#ccc', true: '#007bff' }}
            thumbColor={dailyReminder ? '#007bff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Mises à jour d'activités</Text>
          <Switch
            value={activityUpdates}
            onValueChange={setActivityUpdates}
            trackColor={{ false: '#ccc', true: '#007bff' }}
            thumbColor={activityUpdates ? '#007bff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Progression des objectifs</Text>
          <Switch
            value={goalProgress}
            onValueChange={setGoalProgress}
            trackColor={{ false: '#ccc', true: '#007bff' }}
            thumbColor={goalProgress ? '#007bff' : '#f4f3f4'}
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
  optionContainer: {
    marginTop: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fond blanc semi-transparent
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Ombre pour Android
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default NotificationsScreen;