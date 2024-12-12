import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, Pressable, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Nécessaire : expo install expo-linear-gradient
import { ProfileContext } from './ProfileContext'; // Import du contexte
import mascot from '../assets/logo-test.png'; // Logo

const HomeScreen = ({ navigation }) => {
  const { profile } = useContext(ProfileContext); // Accéder au profil partagé
  const [modalVisible, setModalVisible] = useState(false); // Gérer la visibilité du modal

  // Vérification des données personnelles
  const isProfileIncomplete = !profile.firstName || !profile.lastName || !profile.gender || !profile.age || !profile.weight;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.welcomeText}>Bon retour sur APA App !</Text>
          <Image source={mascot} style={styles.mascotte} />

          {/* Vérification de la présence du score IPAQ */}
          {(profile.ipaqScore == null || profile.ipaqScore === '') && (
            <TouchableOpacity
              style={styles.questionnaireButton}
              onPress={() => navigation.navigate('QuestionnaireIPAQ')} // Naviguer vers la page du questionnaire
            >
              <Text style={styles.questionnaireText}>Remplir le questionnaire IPAQ</Text>
            </TouchableOpacity>
          )}

          {/* Vérification des données personnelles */}
          {isProfileIncomplete && (
            <TouchableOpacity
              style={styles.incompleteProfileButton}
              onPress={() => navigation.navigate('Paramètres', { screen: 'EditProfile' })}
            >
              <Text style={styles.incompleteProfileText}>Complétez vos informations personnelles</Text>
            </TouchableOpacity>
          )}

          {/* Affichage des statistiques */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Nombre de pas</Text>
              <Text style={styles.statValue}>7,500</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Fréquence Cardiaque moyenne</Text>
              <Text style={styles.statValue}>65</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statTitle}>Calories brulées</Text>
              <Text style={styles.statValue}>350</Text>
            </View>
            <TouchableOpacity
              style={styles.statCard}
              onPress={() => navigation.navigate('StreakDetails')}
            >
              <Text style={styles.statTitle}>Streak 🔥</Text>
              <Text style={styles.statValue}>{profile.streak}</Text>
            </TouchableOpacity>
          </View>

          {/* Phrase motivante */}
          <Text style={styles.motivationalText}>
            Êtes-vous prêt à bouger et faire du sport aujourd’hui ?
          </Text>

          <TouchableOpacity
            style={styles.activityButton}
            onPress={() => navigation.navigate('Activités')}
          >
            <Text style={styles.activityText}>C'est parti !</Text>
          </TouchableOpacity>
        </ScrollView>
        

        {/* Modal pour afficher les détails du streak */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Comment est calculé le streak ?</Text>
              <Text style={styles.modalText}>
                Le streak est le nombre de jours consécutifs pendant lesquels vous avez atteint votre objectif quotidien d'activité physique.
                Continuez à bouger tous les jours pour maintenir votre streak !
              </Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)} // Ferme le modal
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Ajoute un espace en haut et en bas
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 16,
  },
  mascotte: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  statsContainer: {
    width: '90%',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Blanc semi-transparent
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  statTitle: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#333',
  },
  questionnaireButton: {
    padding: 16,
    backgroundColor: '#4caf50', // Vert
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
    borderWidth: 2,
    borderColor: '#6dd5ed',
  },
  questionnaireText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  motivationalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  activityButton: {
    padding: 16,
    backgroundColor: '#FFC107', // Jaune
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 16,
    width: '45%',
    borderWidth: 2,
    borderColor: '#6dd5ed',
  },
  activityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  incompleteProfileButton: {
    padding: 16,
    backgroundColor: '#FF6347', // Rouge
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
    borderWidth: 2,
    borderColor: '#6dd5ed',
  },
  incompleteProfileText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#2193b0', // Même couleur que l'en-tête
  },
});

export default HomeScreen;