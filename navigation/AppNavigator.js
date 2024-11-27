// navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Exemple avec Ionicons
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = ({ onLogout }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            height: 60,
          },
          tabBarIcon: ({ focused, color, size }) => {
            // Définir une icône différente selon l'écran
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused ? 'home' : 'home-outline'; // Icône pour Home
            } else if (route.name === 'Statistiques') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline'; // Icône pour Stats
            } else if (route.name === 'Activités') {
              iconName = focused ? 'fitness' : 'fitness-outline'; // Icône pour Activities
            } else if (route.name === 'Paramètres') {
              iconName = focused ? 'settings' : 'settings-outline'; // Icône pour Settings
            }

            // Retourner l'icône Ionicons
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Accueil">
          {() => <HomeScreen onLogout={onLogout} />}
        </Tab.Screen>
        <Tab.Screen name="Statistiques" component={StatsScreen} />
        <Tab.Screen name="Activités" component={ActivitiesScreen} />
        <Tab.Screen name="Paramètres" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
