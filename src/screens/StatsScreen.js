import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileContext } from './ProfileContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const StatsScreen = ({ navigation }) => {
  const { profile } = useContext(ProfileContext);
  const [activitiesHistory, setActivitiesHistory] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    averageDifficulty: 0,
    averagePain: 0,
    completionRate: 0,
    streak: profile.streak || 0,
    totalExercises: 0,
    totalDuration: 0,
    averageExercisesPerSession: 0,
    bestStreak: profile.bestStreak || 0,
    lastWeekSessions: 0,
    painProgress: 0,
    difficultyProgress: 0,
    averageHeartRate: 0,
    totalSteps: 0,
    averageStepsPerDay: 0,
    totalDistance: 0,
    averageDistance: 0,
    totalCalories: 0,
    averageCalories: 0,
    lastSyncDate: null,
    totalStreaks: 0,
    averageStreakLength: 0,
    streakHistory: [],
    lastStreakEnd: null,
  });

  useEffect(() => {
    loadActivitiesHistory();
    loadHealthData();
  }, []);

  const loadActivitiesHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('activitiesHistory');
      if (history) {
        const parsedHistory = JSON.parse(history);
        setActivitiesHistory(parsedHistory);
        calculateStats(parsedHistory);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
    }
  };

  const calculateStats = (history) => {
    if (!history || history.length === 0) {
      return;
    }

    // Calcul des sessions totales
    const totalSessions = history.length;

    // Calcul des sessions de la semaine
    const oneWeekAgo = new Date();
    oneWeekAgo.setHours(0, 0, 0, 0);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const activitiesThisWeek = history.filter(activity => {
      try {
        const activityDate = new Date(activity.date);
        activityDate.setHours(0, 0, 0, 0);
        return activityDate >= oneWeekAgo;
      } catch (error) {
        console.log('Erreur avec la date:', activity.date);
        return false;
      }
    });

    const lastWeekSessions = activitiesThisWeek.length;

    console.log("Debug sessions semaine:", {
      oneWeekAgo: oneWeekAgo.toISOString(),
      activitiesThisWeek: activitiesThisWeek.map(a => ({
        date: a.date,
        name: a.name
      })),
      lastWeekSessions
    });

    const totalDifficulty = history.reduce((sum, activity) => sum + activity.difficulty, 0);
    const totalPain = history.reduce((sum, activity) => sum + activity.painLevel, 0);
    const totalExercisesCompleted = history.reduce((sum, activity) => sum + activity.exercisesCompleted, 0);
    const totalExercises = history.reduce((sum, activity) => sum + activity.totalExercises, 0);
    
    // Calcul de la durée totale
    const totalDuration = history.reduce((sum, activity) => {
      const duration = activity.duration ? parseInt(activity.duration) : 0;
      return sum + duration;
    }, 0);

    console.log("Durées individuelles:", history.map(activity => activity.duration));
    console.log("Durée totale calculée:", totalDuration);

    const recentSessions = history.slice(-5);
    const oldSessions = history.slice(0, 5);
    const painProgress = oldSessions.length > 0 ? 
      ((oldSessions.reduce((sum, a) => sum + a.painLevel, 0) / oldSessions.length) - 
       (recentSessions.reduce((sum, a) => sum + a.painLevel, 0) / recentSessions.length)).toFixed(1) : 0;
    const difficultyProgress = oldSessions.length > 0 ?
      ((recentSessions.reduce((sum, a) => sum + a.difficulty, 0) / recentSessions.length) -
       (oldSessions.reduce((sum, a) => sum + a.difficulty, 0) / oldSessions.length)).toFixed(1) : 0;

    setStats(prevStats => ({
      ...prevStats,
      totalSessions,
      lastWeekSessions,
      streak: profile.streak || 0,
      bestStreak: profile.bestStreak || NaN,
      averageDifficulty: (totalDifficulty / totalSessions).toFixed(1),
      averagePain: (totalPain / totalSessions).toFixed(1),
      completionRate: ((totalExercisesCompleted / totalExercises) * 100).toFixed(0),
      totalExercises: totalExercisesCompleted,
      totalDuration: Math.round(totalDuration),
      averageExercisesPerSession: Math.round(totalExercisesCompleted / totalSessions),
      painProgress,
      difficultyProgress
    }));
  };

  const loadHealthData = async () => {
    try {
      if (!profile.access_token) {
        console.log('Pas de token Withings disponible');
        const lastData = await AsyncStorage.getItem('lastProcessedWithingsData');
        if (lastData) {
          const parsedData = JSON.parse(lastData);
          calculateHealthStats(parsedData);
        }
        return;
      }

      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const startdateymd = oneWeekAgo.toISOString().split('T')[0];
      const enddateymd = today.toISOString().split('T')[0];

      // Récupération des activités (BPM, pas, distance, calories)
      const activityResponse = await fetch('https://wbsapi.withings.net/v2/measure', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${profile.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=getactivity&startdateymd=${startdateymd}&enddateymd=${enddateymd}&data_fields=steps,distance,calories,hr_average`,
      });

      if (!activityResponse.ok) {
        throw new Error('Erreur lors de la récupération des données Withings');
      }

      const activityData = await activityResponse.json();

      if (activityData.status !== 0) {
        throw new Error('Erreur dans la réponse Withings');
      }

      const measurements = [];

      // Traiter les données d'activité
      if (activityData.body && activityData.body.activities) {
        activityData.body.activities.forEach(activity => {
          measurements.push({
            date: new Date(activity.date),
            heartRate: activity.hr_average || 0,
            steps: parseInt(activity.steps || 0),
            distance: parseInt(activity.distance || 0),
            calories: parseInt(activity.calories || 0)
          });
        });
      }

      // Sauvegarder les données traitées
      const processedData = {
        measurements,
        lastSync: new Date().toISOString()
      };

      await AsyncStorage.setItem('lastProcessedWithingsData', JSON.stringify(processedData));
      calculateHealthStats(processedData);

    } catch (error) {
      console.error('Erreur lors du chargement des données Withings:', error);
      const lastData = await AsyncStorage.getItem('lastProcessedWithingsData');
      if (lastData) {
        const parsedData = JSON.parse(lastData);
        calculateHealthStats(parsedData);
      }
    }
  };

  const calculateHealthStats = (data) => {
    if (!data || !data.measurements || data.measurements.length === 0) {
      setStats(prevStats => ({
        ...prevStats,
        averageHeartRate: 0,
        totalSteps: 0,
        averageStepsPerDay: 0,
        totalDistance: '0',
        averageDistance: '0',
        totalCalories: 0,
        averageCalories: 0,
        lastSyncDate: null,
      }));
      return;
    }

    const measurements = data.measurements;
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Filtrer les mesures des 7 derniers jours
    const recentMeasurements = measurements.filter(m => {
      const measureDate = new Date(m.date);
      return measureDate >= oneWeekAgo && measureDate <= today;
    });

    if (recentMeasurements.length === 0) {
      console.log('Aucune mesure récente disponible');
      return;
    }

    // Calcul de la fréquence cardiaque moyenne
    const heartRateMeasurements = recentMeasurements.filter(m => m.heartRate && m.heartRate > 0);
    const averageHeartRate = heartRateMeasurements.length > 0 
      ? Math.round(heartRateMeasurements.reduce((sum, m) => sum + m.heartRate, 0) / heartRateMeasurements.length)
      : 0;

    // Calcul des pas
    const stepMeasurements = recentMeasurements.filter(m => m.steps && m.steps > 0);
    const totalSteps = stepMeasurements.reduce((sum, m) => sum + m.steps, 0);
    const averageStepsPerDay = stepMeasurements.length > 0 
      ? Math.round(totalSteps / stepMeasurements.length)
      : 0;

    // Calcul des distances (conversion en km)
    const distanceMeasurements = recentMeasurements.filter(m => m.distance && m.distance > 0);
    const totalDistance = distanceMeasurements.reduce((sum, m) => sum + m.distance, 0) / 1000; // Conversion en km
    const averageDistance = distanceMeasurements.length > 0
      ? (totalDistance / distanceMeasurements.length).toFixed(1)
      : '0';

    // Calcul des calories
    const calorieMeasurements = recentMeasurements.filter(m => m.calories && m.calories > 0);
    const totalCalories = calorieMeasurements.reduce((sum, m) => sum + m.calories, 0);
    const averageCalories = calorieMeasurements.length > 0
      ? Math.round(totalCalories / calorieMeasurements.length)
      : 0;

    // Mise à jour des statistiques
    setStats(prevStats => ({
      ...prevStats,
      averageHeartRate,
      totalSteps,
      averageStepsPerDay,
      totalDistance: totalDistance.toFixed(1),
      averageDistance,
      totalCalories,
      averageCalories,
      lastSyncDate: data.lastSync || new Date().toISOString(),
    }));
  };

  const StatCard = ({ title, value, icon, unit = '', description = '' }) => (
    <View style={styles.statCard}>
      <MaterialIcons name={icon} size={24} color="#2193b0" style={styles.statIcon} />
      <View style={styles.statContent}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statValue}>{value}{unit}</Text>
        {description ? <Text style={styles.statDescription}>{description}</Text> : null}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.headerTitle}>Vos Statistiques</Text>

          <Text style={styles.sectionTitle}>Vue d'ensemble</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Sessions Totales"
              value={stats.totalSessions}
              icon="fitness-center"
            />
            <StatCard
              title="Cette Semaine"
              value={stats.lastWeekSessions}
              icon="date-range"
            />
            <StatCard
              title="Série Actuelle"
              value={stats.streak}
              icon="local-fire-department"
            />
            <StatCard
              title="Meilleure Série"
              value={stats.bestStreak}
              icon="emoji-events"
            />
          </View>

          <Text style={styles.sectionTitle}>Santé</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="BPM Moyen"
              value={stats.averageHeartRate}
              icon="favorite"
              unit=" bpm"
            />
            <StatCard
              title="Pas Quotidiens"
              value={stats.averageStepsPerDay}
              icon="directions-walk"
            />
            <StatCard
              title="Distance/Jour"
              value={stats.averageDistance}
              icon="place"
              unit=" km"
            />
            <StatCard
              title="Calories/Jour"
              value={stats.averageCalories}
              icon="whatshot"
              unit=" kcal"
            />
          </View>

          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Exercices Réalisés"
              value={stats.totalExercises}
              icon="sports"
            />
            <StatCard
              title="Moyenne par Session"
              value={stats.averageExercisesPerSession}
              icon="bar-chart"
            />
            <StatCard
              title="Temps Total"
              value={stats.totalDuration}
              icon="timer"
              unit=" min"
            />
            <StatCard
              title="Taux de Complétion"
              value={stats.completionRate}
              icon="pie-chart"
              unit="%"
            />
          </View>

          <Text style={styles.sectionTitle}>Progrès</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Difficulté Moyenne"
              value={stats.averageDifficulty}
              icon="speed"
              unit="/5"
            />
            <StatCard
              title="Douleur Moyenne"
              value={stats.averagePain}
              icon="healing"
              unit="/5"
            />
          </View>

          <Text style={styles.sectionTitle}>Totaux sur 7 jours</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Pas Totaux"
              value={stats.totalSteps}
              icon="directions-walk"
            />
            <StatCard
              title="Distance Totale"
              value={stats.totalDistance}
              icon="place"
              unit=" km"
            />
            <StatCard
              title="Calories Totales"
              value={stats.totalCalories}
              icon="whatshot"
              unit=" kcal"
            />
          </View>

          <Text style={styles.sectionTitle}>Séries d'activités</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Série Actuelle"
              value={stats.streak}
              icon="local-fire-department"
            />
            <StatCard
              title="Meilleure Série"
              value={stats.bestStreak}
              icon="emoji-events"
            />
            <StatCard
              title="Nombre de Séries"
              value={stats.totalStreaks}
              icon="format-list-numbered"
              description="Séries de 2 jours ou plus"
            />
            <StatCard
              title="Longueur Moyenne"
              value={stats.averageStreakLength}
              icon="show-chart"
              unit=" jours"
            />
          </View>

          {stats.lastStreakEnd && (
            <Text style={styles.streakInfo}>
              Dernière série terminée le {new Date(stats.lastStreakEnd).toLocaleDateString()}
            </Text>
          )}

          <Text style={styles.sectionTitle}>Dernières Activités</Text>
          {activitiesHistory.slice(0, 3).map((activity, index) => (
            <View key={index} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityDate}>{activity.date}</Text>
                <Text style={styles.activityName}>{activity.name}</Text>
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityDetail}>
                  Exercices: {activity.exercisesCompleted}/{activity.totalExercises}
                </Text>
                <Text style={styles.activityDetail}>
                  Difficulté: {activity.difficulty}/5
                </Text>
              </View>
            </View>
          ))}

          {stats.lastSyncDate && (
            <Text style={styles.syncInfo}>
              Dernière synchronisation: {new Date(stats.lastSyncDate).toLocaleDateString()}
            </Text>
          )}

          <TouchableOpacity 
            style={styles.historyButton}
            onPress={() => navigation.navigate('ActivitiesHistory')}
          >
            <Text style={styles.historyButtonText}>Voir tout l'historique</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#6dd5ed',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    marginTop: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2193b0',
  },
  statDescription: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
    fontStyle: 'italic',
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityDate: {
    fontSize: 14,
    color: '#666',
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2193b0',
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityDetail: {
    fontSize: 14,
    color: '#666',
  },
  historyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  syncInfo: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  streakInfo: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: -4,
    marginBottom: 16,
    fontStyle: 'italic',
  },
});

export default StatsScreen;