import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ProfileContext } from './ProfileContext'; // Import du contexte

const IPAQForm = ({ navigation }) => {
  const { profile, setProfile, saveProfile } = useContext(ProfileContext); // Accès au contexte
  const [currentBlock, setCurrentBlock] = useState(0);
  const [answers, setAnswers] = useState({
    intenseDays: '',
    intenseHours: '',
    intenseMinutes: '',
    moderateDays: '',
    moderateHours: '',
    moderateMinutes: '',
    walkingDays: '',
    walkingEpisodes: '',
    sittingHours: '',
    sittingMinutes: '',
  });

  // Passer au bloc suivant
  const nextBlock = () => {
    setCurrentBlock(currentBlock + 1);
  };

  // Calcul du score IPAQ en MET-minutes/semaine
  const calculateScore = () => {
    const intenseMET =
      (parseInt(answers.intenseDays) || 0) *
      ((parseInt(answers.intenseHours) || 0) * 60 + (parseInt(answers.intenseMinutes) || 0)) *
      8.0;
    const moderateMET =
      (parseInt(answers.moderateDays) || 0) *
      ((parseInt(answers.moderateHours) || 0) * 60 + (parseInt(answers.moderateMinutes) || 0)) *
      4.0;
    const walkingMET =
      (parseInt(answers.walkingDays) || 0) *
      ((parseInt(answers.walkingEpisodes) || 0) * 10) *
      3.3;

    return intenseMET + moderateMET + walkingMET;
  };

  // Soumet le formulaire et met à jour le profil
  const submitForm = () => {
    const ipaqScore = calculateScore();
    const updatedProfile = { ...profile, ipaqScore }; // Metà jour le score IPAQ dans le profil
    setProfile(updatedProfile); // Met à jour le contexte local
    saveProfile(updatedProfile); // Sauvegarde dans AsyncStorage
    navigation.goBack(); // Retour à l'écran précédent
  };

  // Contenu des blocs basé sur le vrai questionnaire IPAQ
  const blocks = [
    {
      title: 'Bloc 1 : Activités intenses des 7 derniers jours',
      questions: [
        { label: 'Combien de jours avez-vous effectué des activités physiques intenses ?', stateKey: 'intenseDays' },
        { label: 'Combien d’heures par jour en moyenne ? (heures)', stateKey: 'intenseHours' },
        { label: 'Combien de minutes par jour en moyenne ? (minutes)', stateKey: 'intenseMinutes' },
      ],
    },
    {
      title: 'Bloc 2 : Activités modérées des 7 derniers jours',
      questions: [
        { label: 'Combien de jours avez-vous effectué des activités physiques modérées ?', stateKey: 'moderateDays' },
        { label: 'Combien d’heures par jour en moyenne ? (heures)', stateKey: 'moderateHours' },
        { label: 'Combien de minutes par jour en moyenne ? (minutes)', stateKey: 'moderateMinutes' },
      ],
    },
    {
      title: 'Bloc 3 : Marche des 7 derniers jours',
      questions: [
        { label: 'Combien de jours avez-vous marché pendant au moins 10 minutes d’affilée ?', stateKey: 'walkingDays' },
        { label: 'Combien d’épisodes de marche d’au moins 10 minutes avez-vous effectués ?', stateKey: 'walkingEpisodes' },
      ],
    },
    {
      title: 'Bloc 4 : Temps passé assis au cours des 7 derniers jours',
      questions: [
        { label: 'Combien d’heures par jour en moyenne êtes-vous resté assis ?', stateKey: 'sittingHours' },
        { label: 'Combien de minutes par jour en moyenne êtes-vous resté assis ?', stateKey: 'sittingMinutes' },
      ],
    },
  ];

  // Gestion de l'affichage
  if (currentBlock === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue dans le questionnaire IPAQ</Text>
        <Text style={styles.subtitle}>
          Ce questionnaire mesure votre niveau d’activité physique au cours des 7 derniers jours. Veuillez répondre honnêtement.
        </Text>
        <TouchableOpacity style={styles.button} onPress={nextBlock}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentBlock > 0 && currentBlock <= blocks.length) {
    const block = blocks[currentBlock - 1];
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{block.title}</Text>
        {block.questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{question.label}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Votre réponse"
              value={answers[question.stateKey]}
              onChangeText={(text) => setAnswers({ ...answers, [question.stateKey]: text })}
            />
          </View>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={currentBlock <= blocks.length ? nextBlock : submitForm}
        >
          <Text style={styles.buttonText}>
            {currentBlock <= blocks.length ? 'Continuer' : 'Terminer'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (currentBlock > blocks.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Félicitations !</Text>
        <Text style={styles.subtitle}>
          Vous avez terminé le questionnaire IPAQ. Votre nouveau score sera sauvegardé.
        </Text>
        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text style={styles.buttonText}>Terminer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  questionContainer: {
    marginBottom: 16,
    width: '100%',
  },
  question: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IPAQForm;