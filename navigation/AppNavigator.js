import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../src/screens/HomeScreen';
import StatsScreen from '../src/screens/StatsScreen';
import ActivitiesScreen from '../src/screens/ActivitiesScreen';
import SettingsScreen from '../src/screens/SettingsScreen';
import EditProfileScreen from '../src/screens/EditProfileScreen';
import NotificationsScreen from '../src/screens/NotificationsScreen';
import IPAQForm from '../src/screens/IPAQForm';
import ProfileScreen from '../src/screens/ProfileScreen';
import DailyActivityScreen from '../src/screens/DailyActivityScreen';
import ActivitiesHistory from '../src/screens/ActivitiesHistory';
import StreakDetailsScreen from '../src/screens/StreakDetailsScreen';
import StepsDetailsScreen from '../src/screens/StepsDetailsScreen';
import XPDetailsScreen from '../src/screens/XPDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack pour l'onglet Accueil
const HomeStack = ({ onLogout }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        // Injecte `onLogout` dans HomeScreen
        children={(props) => <HomeScreen {...props} onLogout={onLogout} />}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Stack pour Paramètres et ses écrans secondaires
const SettingsStack = ({ onLogout }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Paramètres "
        children={(props) => <SettingsScreen {...props} onLogout={onLogout} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ 
          title: 'Modifier le profil',
          headerShown: true
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen name="ActivitiesHistory" component={ActivitiesHistory} />
    </Stack.Navigator>
  );
};

// Tab.Navigator pour les onglets principaux
const TabNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      initialRouteName="Accueil" // Définit "Accueil" comme l'onglet par défaut
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          height: 80,
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#666',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Statistiques') {
            iconName = focused ? 'stats-chart' : 'stats-chart';
          } else if (route.name === 'Activités') {
            iconName = focused ? 'fitness' : 'fitness';
          } else if (route.name === 'Paramètres') {
            iconName = focused ? 'settings' : 'settings';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Statistiques" component={StatsScreen} />
      <Tab.Screen name="Activités" component={ActivitiesScreen} />
      <Tab.Screen name="Accueil">{() => <HomeStack onLogout={onLogout} />}</Tab.Screen>
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Paramètres">
        {() => <SettingsStack onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

// Stack encapsulant tout, avec possibilité de masquer la tab bar
const AppNavigator = ({ onLogout }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tab Navigator pour les écrans principaux */}
        <Stack.Screen
          name="MainTabs"
          children={() => <TabNavigator onLogout={onLogout} />}
          options={{ headerShown: false }}
        />
        {/* Écran du Questionnaire IPAQ, indépendant */}
        <Stack.Screen
          name="QuestionnaireIPAQ"
          component={IPAQForm}
          options={{
            headerShown: false, // Pas d'en-tête
            presentation: 'modal', // Style modal (affichage séparé)
          }}
        />
        <Stack.Screen
          name="DailyActivity"
          component={DailyActivityScreen}
          options={{ title: 'Activité du jour', headerShown: false, }}
        />        
        <Stack.Screen
          name="ActivitiesHistory"
          component={ActivitiesHistory}
          options={{ title: 'Historique des Activités', headerShown: false }}
        />
        <Stack.Screen
          name="StreakDetails"
          component={StreakDetailsScreen}
          options={{ 
            title: 'Fonctionnement des streaks', 
            headerShown: true,
            headerBackTitle: 'Retour'
          }}
        />
        <Stack.Screen
          name="StepsDetails"
          component={StepsDetailsScreen}
          options={{ 
            title: 'Suivi des pas', 
            headerShown: true,
            headerBackTitle: 'Retour'
          }}
        />
        <Stack.Screen
          name="XPDetails"
          component={XPDetailsScreen}
          options={{ 
            title: 'Système d\'XP', 
            headerShown: true,
            headerBackTitle: 'Retour'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;