import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const StreakDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.headerTitle}>Comprendre les Séries</Text>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="local-fire-department" size={24} color="#2193b0" />
              <Text style={styles.cardTitle}>Qu'est-ce qu'une série ?</Text>
            </View>
            <Text style={styles.cardText}>
              Une série représente le nombre de jours consécutifs pendant lesquels vous avez effectué des activités. 
              Plus votre série est longue, plus vous êtes régulier dans votre pratique !
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="calendar-today" size={24} color="#2193b0" />
              <Text style={styles.cardTitle}>Comment maintenir une série ?</Text>
            </View>
            <Text style={styles.cardText}>
              Pour maintenir votre série active, vous devez réaliser au moins une activité par jour.
              Si vous manquez un jour, votre série sera réinitialisée.
            </Text>
          </View>

          <View style={styles.exampleCard}>
            <Text style={styles.exampleTitle}>Exemple :</Text>
            <View style={styles.example}>
              <View style={styles.dayBox}>
                <Text style={styles.dayText}>Lundi</Text>
                <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
              </View>
              <View style={styles.dayBox}>
                <Text style={styles.dayText}>Mardi</Text>
                <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
              </View>
              <View style={styles.dayBox}>
                <Text style={styles.dayText}>Mercredi</Text>
                <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.streakResult}>= Série de 3 jours ! 🎉</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="emoji-events" size={24} color="#2193b0" />
              <Text style={styles.cardTitle}>Objectifs</Text>
            </View>
            <Text style={styles.cardText}>
              Essayez de maintenir une série aussi longue que possible ! Voici quelques objectifs :
            </Text>
            <View style={styles.goalsList}>
              <View style={styles.goalItem}>
                <MaterialIcons name="star" size={20} color="#FFD700" />
                <Text style={styles.goalText}>3 jours : Bon début !</Text>
              </View>
              <View style={styles.goalItem}>
                <MaterialIcons name="star" size={20} color="#FFD700" />
                <Text style={styles.goalText}>5 jours : Excellente régularité !</Text>
              </View>
              <View style={styles.goalItem}>
                <MaterialIcons name="star" size={20} color="#FFD700" />
                <Text style={styles.goalText}>7 jours : Champion de la semaine !</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="tips-and-updates" size={24} color="#2193b0" />
              <Text style={styles.cardTitle}>Conseils</Text>
            </View>
            <Text style={styles.cardText}>
              • Choisissez un moment régulier dans la journée{'\n'}
              • Activez les notifications de rappel{'\n'}
              • Commencez doucement et augmentez progressivement{'\n'}
              • Célébrez chaque petit progrès !
            </Text>
          </View>
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
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2193b0',
    marginLeft: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  exampleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2193b0',
    marginBottom: 12,
  },
  example: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  dayBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dayText: {
    fontSize: 16,
    color: '#666',
  },
  streakResult: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2193b0',
    textAlign: 'center',
    marginTop: 12,
  },
  goalsList: {
    marginTop: 12,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  goalText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
});

export default StreakDetailsScreen;