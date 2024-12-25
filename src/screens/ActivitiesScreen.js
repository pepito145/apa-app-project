import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import exerciseBank from '../data/exerciseBank';
import DropDownPicker from 'react-native-dropdown-picker';
import { ProfileContext } from './ProfileContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivitiesScreen = ({ navigation }) => {
  const { profile } = useContext(ProfileContext);
  const [recommendedLevel, setRecommendedLevel] = useState(null);

  // Fonction pour déterminer le niveau recommandé
  const getRecommendedLevel = async (ipaqScore) => {
    try {
      // D'abord, essayer de récupérer le niveau recommandé stocké
      const storedLevel = await AsyncStorage.getItem('recommendedLevel');
      console.log("Niveau recommandé stocké:", storedLevel);
      
      if (storedLevel) {
        console.log("Utilisation du niveau recommandé stocké:", storedLevel);
        return storedLevel;
      }
      
      // Si pas de niveau stocké, utiliser le score IPAQ
      console.log("Aucun niveau recommandé trouvé, utilisation du score IPAQ:", ipaqScore);
      if (ipaqScore < 600) {
        console.log("Score IPAQ < 600 -> niveau1");
        return 'niveau1';
      }
      if (ipaqScore >= 600 && ipaqScore <= 3000) {
        console.log("600 ≤ Score IPAQ ≤ 3000 -> niveau2");
        return 'niveau2';
      }
      console.log("Score IPAQ > 3000 -> niveau3");
      return 'niveau3';
    } catch (error) {
      console.error("Erreur lors de la récupération du niveau recommandé:", error);
      return 'niveau1';
    }
  };

  const levels = Object.keys(exerciseBank.levels).filter(level => level);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openLevel, setOpenLevel] = useState(false);
  const [levelItems, setLevelItems] = useState(levels.map(level => ({
    label: exerciseBank.levels[level].metadata.title,
    value: level,
  })));

  // Utiliser useFocusEffect pour mettre à jour le niveau recommandé à chaque fois qu'on revient sur l'écran
  useFocusEffect(
    React.useCallback(() => {
      const loadRecommendedLevel = async () => {
        console.log("useFocusEffect déclenché");
        const level = await getRecommendedLevel(profile.ipaqScore);
        console.log("Niveau recommandé chargé:", level);
        setSelectedLevel(level);
        setRecommendedLevel(level);
        
        // Sélectionner une session aléatoire du niveau recommandé
        if (level) {
          const availableSessions = exerciseBank.levels[level]?.sessions || [];
          if (availableSessions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableSessions.length);
            console.log("Session aléatoire sélectionnée:", availableSessions[randomIndex].title);
            setSelectedSession(availableSessions[randomIndex].id);
          } else {
            setSelectedSession(null);
          }
        }
      };
      
      loadRecommendedLevel();
    }, [profile])
  );

  const [selectedSession, setSelectedSession] = useState(null);
  const [openSession, setOpenSession] = useState(false);
  const sessions = selectedLevel ? exerciseBank.levels[selectedLevel]?.sessions || [] : [];
  const sessionItems = sessions.map(session => ({
    label: `${session.title} - ${session.duration}`,
    value: session.id,
  }));

  // Ajouter un message de recommandation
  const getRecommendationMessage = () => {
    const levelTitle = exerciseBank.levels[selectedLevel]?.metadata.title;
    let message = '';
    
    if (profile.lastSessionFeedback && profile.recommendedSession) {
      const averageRating = (profile.lastSessionFeedback.difficulty + profile.lastSessionFeedback.pain) / 2;
      message = `Basé sur votre dernier feedback (moyenne: ${averageRating.toFixed(1)}/5), nous vous recommandons : ${levelTitle}`;
    } else {
      message = `En fonction de votre score IPAQ (${profile.ipaqScore}), nous vous recommandons : ${levelTitle}`;
    }
    
    return message;
  };

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

  const handleLevelChange = (newLevel) => {
    setSelectedLevel(newLevel);
    // Sélectionner une session aléatoire du niveau
    const newSessions = newLevel ? exerciseBank.levels[newLevel]?.sessions || [] : [];
    if (newSessions.length > 0) {
      const randomIndex = Math.floor(Math.random() * newSessions.length);
      setSelectedSession(newSessions[randomIndex].id);
    } else {
      setSelectedSession(null);
    }
    setOpenSession(false);
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.pickerLabel}>Sélectionne un niveau :</Text>
    
      <DropDownPicker
        open={openLevel}
        value={selectedLevel}
        items={levelItems}
        setOpen={setOpenLevel}
        setValue={setSelectedLevel}
        setItems={setLevelItems}
        placeholder="Aucun niveau sélectionné"
        onChangeValue={handleLevelChange}
      />

      {selectedLevel && sessions.length > 0 && (
        <>
          <Text style={styles.pickerLabel}>Sélectionne une session :</Text>
          <DropDownPicker
            open={openSession}
            value={selectedSession}
            items={sessionItems}
            setOpen={(open) => {
              setOpenSession(open);
              if (open) setOpenLevel(false);
            }}
            setValue={setSelectedSession}
            placeholder="Aucune session sélectionnée"
            zIndex={2000}
          />
        </>
      )}

      {selectedLevel && selectedSession && (
        <>
          <Text style={styles.title}>Excellent !</Text>
          <Text style={styles.subtitle}>
            Voici l'APA que nous t'avons choisi : {'\n'}
            {exerciseBank.levels[selectedLevel].metadata.title} - {
              exerciseBank.levels[selectedLevel].sessions.find(
                session => session.id === selectedSession
              ).title
            }
          </Text>

          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Résumé de la séance :</Text>
            <Text style={styles.summaryText}>Résumé à venir</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
              <Text style={styles.buttonText}>Commencer !</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
              <Text style={[styles.buttonText, styles.rejectButtonText]}>
                Cette activité{'\n'}ne me convient pas
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginVertical: 15,
    lineHeight: 24,
  },
  summaryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  homeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  homeButtonText: {
    fontSize: 24,
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
    gap: 10,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  rejectButtonText: {
    fontSize: 14,
    lineHeight: 20,
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
  recommendationText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default ActivitiesScreen;