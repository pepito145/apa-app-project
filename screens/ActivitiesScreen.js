import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const ActivitiesScreen = ({ navigation }) => {
  const handleAccept = () => {
    navigation.navigate('DailyActivity'); // Navigue vers la page des activités quotidiennes
  };

  const handleReject = () => {
    alert('D\'accord, nous choisirons une autre activité.');
    navigation.navigate('Accueil'); // Retourne à l'écran précédent
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Excellent !</Text>
      <Text style={styles.subtitle}>Voici l'APA que nous t'avons choisi.</Text>

      <Image
        source={require('../assets/activities/test/seance-test.png')}
        style={styles.activityImage}
        resizeMode="contain"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>C'est parfait !</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.buttonText}>Non</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0', // Couleur beige claire pour correspondre au design
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  homeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  homeButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  activityImage: {
    width: '100%',
    height: 300, // Hauteur de l'image pour l'exemple
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#FFC107', // Couleur dorée pour "C'est parfait"
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FF5722', // Couleur rouge pour "Non"
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ActivitiesScreen;