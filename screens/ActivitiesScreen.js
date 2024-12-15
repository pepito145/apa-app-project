import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import exerciseBank from '../src/data/exerciseBank'; // Import de ton fichier des niveaux
import { Picker } from '@react-native-picker/picker'; // Import depuis le nouveau package

const ActivitiesScreen = ({ navigation }) => {
  
  // Extraire les niveaux valides depuis exerciseBank
  const levels = Object.keys(exerciseBank.levels).filter(level => level);

  // État initial pour le niveau sélectionné (par défaut null)
  const [selectedLevel, setSelectedLevel] = useState(null);

  // État pour les sessions associées au niveau sélectionné
  const sessions = selectedLevel ? exerciseBank.levels[selectedLevel]?.sessions || [] : [];

  // État pour la session sélectionnée
  const [selectedSession, setSelectedSession] = useState(null);

  // Mettre à jour les sessions et la session sélectionnée
  const handleLevelChange = (newLevel) => {
    setSelectedLevel(newLevel);
    const newSessions = newLevel ? exerciseBank.levels[newLevel]?.sessions || [] : [];
    setSelectedSession(newSessions[0]?.id || null);
  };

  const handleAccept = () => {
    navigation.navigate('DailyActivity'); // Navigue vers la page des activités quotidiennes
  };

  const handleReject = () => {
    alert('D\'accord, nous choisirons une autre activité.');
    navigation.navigate('Accueil'); // Retourne à l'écran précédent
  };

  return (
    <View style={styles.container}>
{/* Picker pour sélectionner le niveau */}
<View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Sélectionne un niveau :</Text>
        <Picker
          selectedValue={selectedLevel}
          onValueChange={handleLevelChange}
          style={styles.picker}
        >
          <Picker.Item label="" value={null} />
          {levels.map((level) => (
            <Picker.Item
              key={level}
              label={exerciseBank.levels[level].metadata.title}
              value={level}
            />
          ))}
        </Picker>
      </View>

      {/* Picker pour sélectionner la session */}
      {sessions.length > 0 && (
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Sélectionne une session :</Text>
          <Picker
            selectedValue={selectedSession}
            onValueChange={(itemValue) => setSelectedSession(itemValue)}
            style={styles.picker}
          >
            {sessions.map((session) => (
              <Picker.Item
                key={session.id}
                label={`${session.title} - ${session.duration}`}
                value={session.id}
              />
            ))}
          </Picker>
        </View>
      )}

      <Text style={styles.title}>Excellent !</Text>
      <Text style={styles.subtitle}>Voici l'APA que nous t'avons choisi.</Text>

      <Image
        source={require('../assets/activities/test/seance-test.png')}
        style={styles.activityImage}
        resizeMode="contain"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.buttonText}>Commencer !</Text>
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
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '60%',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  levelDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ActivitiesScreen;