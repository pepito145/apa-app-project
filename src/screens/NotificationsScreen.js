import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Configuration du gestionnaire de notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Fonction pour vérifier l'inactivité
const checkInactivity = async () => {
  try {
    console.log('Vérification de l\'inactivité...');
    const activitiesHistory = await AsyncStorage.getItem('activitiesHistory');
    
    if (!activitiesHistory) {
      console.log('Pas d\'historique d\'activités trouvé');
      return null;
    }

    const activities = JSON.parse(activitiesHistory);
    console.log('Historique des activités:', activities);

    if (activities.length === 0) {
      console.log('Historique des activités vide');
      return null;
    }

    // Trier les activités par date (la plus récente en premier)
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));
    const lastActivity = new Date(activities[0].date);
    const today = new Date();
    
    console.log('Dernière activité:', lastActivity);
    console.log('Aujourd\'hui:', today);

    const diffTime = Math.abs(today - lastActivity);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    console.log('Nombre de jours d\'inactivité:', diffDays);
    return diffDays;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'inactivité:', error);
    return null;
  }
};

const NotificationsScreen = () => {
  // États locaux pour chaque notification
  const [notifications, setNotifications] = useState({
    daily: false,
    weekly: false,
    inactivity: false
  });

  // État pour suivre les modifications
  const [hasChanges, setHasChanges] = useState(false);

  // Charger les préférences au montage
  useEffect(() => {
    loadNotificationSettings();
  }, []);

  // Sauvegarder les changements au démontage
  useEffect(() => {
    return () => {
      if (hasChanges) {
        saveNotificationSettings();
      }
    };
  }, [hasChanges, notifications]);

  // Charger les préférences
  const loadNotificationSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('notification_settings');
      if (settings) {
        setNotifications(JSON.parse(settings));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des préférences:', error);
    }
  };

  // Sauvegarder les préférences et programmer les notifications
  const saveNotificationSettings = async () => {
    try {
      // Sauvegarder les préférences
      await AsyncStorage.setItem('notification_settings', JSON.stringify(notifications));
      
      // Annuler toutes les notifications existantes
      console.log('Annulation des notifications existantes...');
      const scheduledNotifs = await Notifications.getAllScheduledNotificationsAsync();
      console.log('Notifications programmées:', scheduledNotifs);
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Reprogrammer les notifications activées
      if (notifications.daily) {
        console.log('Programmation de la notification quotidienne...');
        const dailyNotif = {
          content: {
            title: "🏃‍♂️ C'est l'heure de bouger !",
            body: "Votre séance d'APA vous attend. Un petit effort pour un grand bien-être !",
          },
          trigger: {
            hour: 10,
            minute: 0,
            repeats: true,
          },
          identifier: 'daily_reminder_' + Date.now()
        };
        await Notifications.scheduleNotificationAsync(dailyNotif);
        console.log('Notification quotidienne programmée:', dailyNotif);
      }

      if (notifications.weekly) {
        console.log('Programmation de la notification hebdomadaire...');
        const weeklyNotif = {
          content: {
            title: "📊 Bilan hebdomadaire",
            body: "Découvrez vos progrès de la semaine et fixez-vous de nouveaux objectifs !",
          },
          trigger: {
            weekday: 7,
            hour: 18,
            minute: 0,
            repeats: true,
          },
          identifier: 'weekly_summary_' + Date.now()
        };
        await Notifications.scheduleNotificationAsync(weeklyNotif);
        console.log('Notification hebdomadaire programmée:', weeklyNotif);
      }

      if (notifications.inactivity) {
        console.log('Configuration de la vérification d\'inactivité...');
        
        // Vérification immédiate
        const currentInactiveDays = await checkInactivity();
        console.log('Jours d\'inactivité actuels:', currentInactiveDays);

        if (currentInactiveDays && currentInactiveDays >= 3) {
          console.log('Envoi d\'une alerte d\'inactivité immédiate');
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "⚠️ Attention !",
              body: `Cela fait ${currentInactiveDays} jours que vous n'avez pas fait d'exercice. On s'y remet ensemble ?`,
            },
            trigger: null,
            identifier: 'inactivity_immediate_' + Date.now()
          });
        }

        // Programmer la vérification quotidienne
        console.log('Programmation de la vérification quotidienne');
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Vérification d'activité",
            body: "Vérification quotidienne de votre activité",
          },
          trigger: {
            hour: 18,
            minute: 0,
            repeats: true,
          },
          identifier: 'inactivity_check_' + Date.now()
        });
      }

      // Vérifier les notifications programmées
      const finalNotifs = await Notifications.getAllScheduledNotificationsAsync();
      console.log('Notifications finales programmées:', finalNotifs);

      setHasChanges(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
    }
  };

  // Gérer les changements de switch
  const handleToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    setHasChanges(true);
  };

  const NotificationItem = ({ title, description, icon, type }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialIcons name={icon} size={24} color="#2193b0" />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardDescription}>{description}</Text>
        <Switch
          value={notifications[type]}
          onValueChange={() => handleToggle(type)}
          trackColor={{ false: '#ccc', true: '#2193b0' }}
          thumbColor={notifications[type] ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#ccc"
        />
      </View>
    </View>
  );

  // Ajouter un listener pour les vérifications quotidiennes
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
      if (notification.request.content.title === "Vérification d'activité") {
        const inactiveDays = await checkInactivity();
        if (inactiveDays && inactiveDays >= 3) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "⚠️ Attention !",
              body: `Cela fait ${inactiveDays} jours que vous n'avez pas fait d'exercice. On s'y remet ensemble ?`,
            },
            trigger: null,
            identifier: 'inactivity_alert_' + Date.now()
          });
        }
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <LinearGradient 
      colors={['#6dd5ed', '#2193b0']} 
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rappels d'activité</Text>
          <NotificationItem
            type="daily"
            title="Rappel quotidien"
            description="Recevez un rappel chaque matin à 10h pour votre séance d'APA"
            icon="alarm"
          />

          <NotificationItem
            type="inactivity"
            title="Alerte d'inactivité"
            description="Soyez notifié après 3 jours sans activité"
            icon="running-with-errors"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suivi et progrès</Text>
          <NotificationItem
            type="weekly"
            title="Bilan hebdomadaire"
            description="Recevez un récapitulatif de vos activités chaque dimanche"
            icon="insert-chart"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
});

export default NotificationsScreen;