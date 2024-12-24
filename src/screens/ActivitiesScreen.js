import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import exerciseBank from '../data/exerciseBank'; // Import de ton fichier des niveaux
import DropDownPicker from 'react-native-dropdown-picker';


const ActivitiesScreen = ({ navigation }) => {

  const pdfSource = require('../../assets/exercices-pdfs/1etoile.pdf');

  const openPDF = async () => {
    try {
      const path = pdfSource; // Chemin vers le fichier PDF
      await RNFileViewer.open(path, { showOpenWithDialog: true });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ouvrir le PDF');
      console.error(error);
    }
  };

  const levels = Object.keys(exerciseBank.levels).filter(level => level);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openLevel, setOpenLevel] = useState(false);
  const [levelItems, setLevelItems] = useState(levels.map(level => ({
    label: exerciseBank.levels[level].metadata.title,
    value: level,
  })));

  const [selectedSession, setSelectedSession] = useState(null);
  const [openSession, setOpenSession] = useState(false);
  const sessions = selectedLevel ? exerciseBank.levels[selectedLevel]?.sessions || [] : [];
  const sessionItems = sessions.map(session => ({
    label: `${session.title} - ${session.duration}`,
    value: session.id,
  }));

  const handleAccept = () => {
    if (selectedLevel && selectedSession) {
      const selectedSessionData = exerciseBank.levels[selectedLevel].sessions.find(
        session => session.id === selectedSession
      );
      navigation.navigate('DailyActivity', {
        level: selectedLevel,
        session: selectedSessionData,
        levelTitle: exerciseBank.levels[selectedLevel].metadata.title
      });
    } else {
      alert('Veuillez sélectionner un niveau et une session avant de commencer.');
    }
  };

  const handleReject = () => {
    alert('D\'accord, nous choisirons une autre activité.');
    navigation.navigate('Accueil'); // Retourne à l'écran précédent
  };

  const handleLevelChange = (newLevel) => {
    setSelectedLevel(newLevel);
    const newSessions = newLevel ? exerciseBank.levels[newLevel]?.sessions || [] : [];
    setSelectedSession(newSessions[0]?.id || null); // Sélectionne la première session par défaut
    setOpenSession(false); // Ferme le picker de session
  };

  return (
    <View style={styles.container}>

<Text style={styles.pickerLabel}>Sélectionne un niveau :</Text>
    
<DropDownPicker
      open={openLevel}
      value={selectedLevel}
      items={levelItems}
      setOpen={(open) => {
        setOpenLevel(open);
        if (open) {
          setSelectedLevel(null); // Réinitialise selectedLevel lorsque le menu est ouvert
          setSelectedSession(null); // Réinitialise la sélection de session
          setOpenSession(false); // Ferme le picker de session
        }
      }}
      setValue={setSelectedLevel}
      setItems={setLevelItems}
      placeholder="Aucun niveau sélectionné"
      onChangeValue={handleLevelChange} // Assurez-vous d'appeler cette fonction
    />

    {selectedLevel && sessions.length > 0 && ( // Affiche le picker de session seulement si un niveau est sélectionné
      <>
        <Text style={styles.pickerLabel}>Sélectionne une session :</Text>
        <DropDownPicker
          open={openSession}
          value={selectedSession}
          items={sessionItems}
          setOpen={(open) => {
            setOpenSession(open);
            if (open) {
              setOpenLevel(false); // Ferme le picker de niveau si le picker de session est ouvert
            }
          }}
          setValue={setSelectedSession}
          placeholder="Aucune session sélectionnée"
        />
      </>
    )}

      <Text style={styles.title}>Excellent !</Text>
      <Text style={styles.subtitle}>Voici l'APA que nous t'avons choisi.</Text>

      <Image
        source={require('../../assets/activities/test/seance-test.png')}
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
  pdf: {
    width: '90%', // Largeur du PDF
    height: '80%', // Hauteur du PDF
  },
});

export default ActivitiesScreen;