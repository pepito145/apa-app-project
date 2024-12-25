import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { ProfileContext } from './ProfileContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const SettingsScreen = ({ navigation, onLogout }) => {
  const { setProfile } = useContext(ProfileContext);
  const [dataSize, setDataSize] = useState('Calcul...');

  // Calculer la taille des données stockées
  const calculateDataSize = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          // Calcul plus précis en comptant les caractères
          totalSize += new TextEncoder().encode(value).length;
        }
      }
      // Convertir en KB avec 2 décimales
      const sizeInKB = (totalSize / 1024).toFixed(2);
      setDataSize(sizeInKB + ' KB');
    } catch (error) {
      console.error('Erreur lors du calcul de la taille des données:', error);
      setDataSize('Erreur');
    }
  };

  // Calculer la taille au montage
  React.useEffect(() => {
    calculateDataSize();
  }, []);

  const handleProfileEdit = () => {
    navigation.navigate('EditProfile', { onLogout });
  };

  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handleDataExport = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = {};
      for (const key of keys) {
        data[key] = await AsyncStorage.getItem(key);
      }
      Alert.alert(
        'Export des données',
        'Données exportées avec succès !\n\n' + JSON.stringify(data, null, 2)
      );
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'exporter les données');
    }
  };

  const handleDataDelete = () => {
    Alert.alert(
      'Attention',
      'Voulez-vous vraiment supprimer toutes vos données ? Cette action est irréversible et supprimera :\n\n- Votre profil\n- Votre historique d\'activités\n- Vos paramètres de notifications\n- La liaison avec Withings\n- Votre score IPAQ\n- Toutes les autres données stockées',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Continuer',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmation finale',
              'Êtes-vous absolument sûr ? L\'application reviendra à son état initial.',
              [
                { text: 'Annuler', style: 'cancel' },
                {
                  text: 'Supprimer définitivement',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      // Supprimer toutes les données de AsyncStorage
                      await AsyncStorage.clear();

                      // Réinitialiser le profil
                      setProfile({
                        firstName: '',
                        lastName: '',
                        gender: '',
                        age: '',
                        weight: '',
                        ipaqScore: null,
                        isWithingsLinked: false,
                        streak: 0,
                        access_token: '',
                        refresh_token: '',
                        lastRefreshTime: null,
                      });

                      // Annuler toutes les notifications programmées
                      await Notifications.cancelAllScheduledNotificationsAsync();

                      Alert.alert(
                        'Succès',
                        'Toutes les données ont été supprimées. L\'application va redémarrer.',
                        [
                          {
                            text: 'OK',
                            onPress: () => {
                              calculateDataSize();
                              // Utiliser onLogout pour rediriger vers l'écran d'authentification
                              onLogout();
                            }
                          }
                        ]
                      );
                    } catch (error) {
                      console.error('Erreur lors de la suppression:', error);
                      Alert.alert('Erreur', 'Impossible de supprimer toutes les données');
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "À propos de l'application",
      "Version : 1.0.0\nCréée par l'équipe projet APA CentraleSupélec.\n\nCette application a pour but d'accompagner les utilisateurs dans leur pratique d'Activité Physique Adaptée (APA).",
      [{ text: "OK", style: "default" }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnecter',
          style: 'destructive',
          onPress: () => {
            setProfile({
              firstName: '',
              lastName: '',
              gender: '',
              age: '',
              weight: '',
              ipaqScore: null,
              isWithingsLinked: false,
              streak: 0,
              access_token: '',
              refresh_token: '',
            });
            onLogout();
          },
        },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, color = '#2193b0' }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        <MaterialIcons name={icon} size={24} color={color} />
      </View>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient
        colors={['#6dd5ed', '#2193b0']}
        style={styles.container}
      >
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Paramètres</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profil</Text>
            <SettingItem
              icon="person"
              title="Modifier le profil"
              subtitle="Informations personnelles"
              onPress={handleProfileEdit}
            />
            <SettingItem
              icon="notifications"
              title="Notifications"
              subtitle="Gérer les alertes"
              onPress={handleNotifications}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Données</Text>
            <SettingItem
              icon="storage"
              title="Stockage utilisé"
              subtitle={dataSize}
              onPress={calculateDataSize}
            />
            <SettingItem
              icon="delete"
              title="Supprimer les données"
              subtitle="Effacer toutes les données"
              onPress={handleDataDelete}
              color="#ff5047"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Application</Text>
            <SettingItem
              icon="info"
              title="À propos"
              subtitle="Informations sur l'application"
              onPress={handleAbout}
            />
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="#fff" />
            <Text style={styles.logoutText}>Se déconnecter</Text>
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
  section: {
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2193b0',
    marginBottom: 15,
    marginLeft: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#ff5047',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SettingsScreen;