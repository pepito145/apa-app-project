import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ProfileContext } from './ProfileContext';


const IPAQForm = ({ navigation }) => {
  const { profile, setProfile, saveProfile } = useContext(ProfileContext);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
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

  const nextBlock = () => {
    const block = blocks[currentBlock - 1];
    const hasEmptyFields = block.questions.some((question) => !answers[question.stateKey]?.trim());

    if (hasEmptyFields) {
      setErrorMessage('Veuillez remplir tous les champs avant de continuer.');
    } else {
      setErrorMessage('');
      setCurrentBlock(currentBlock + 1);
    }
  };

  const previousBlock = () => {
    if (currentBlock > 1) {
      setCurrentBlock(currentBlock - 1);
      setErrorMessage('');
    }
  };

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

  const submitForm = () => {
    const ipaqScore = calculateScore();
    const updatedProfile = { ...profile, ipaqScore };

    const block = blocks[currentBlock - 1];
    const hasEmptyFields = block.questions.some((question) => !answers[question.stateKey]?.trim());


    if (hasEmptyFields) {
      setErrorMessage('Veuillez remplir tous les champs avant de continuer.');
    } else {
      setProfile(updatedProfile);
      saveProfile(updatedProfile);
      navigation.goBack();
    }
  };

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

  if (currentBlock === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue dans le questionnaire IPAQ</Text>
        <Text style={styles.subtitle}>
          Ce questionnaire mesure votre niveau d’activité physique au cours des 7 derniers jours. Veuillez répondre honnêtement.
        </Text>
        <TouchableOpacity style={styles.buttonThin} onPress={() => setCurrentBlock(1)}>
          <Text style={styles.buttonThinText}>Commencer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonThinText}>Remplir le questionnaire plus tard</Text>
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
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TouchableOpacity
          style={styles.buttonThin}
          onPress={currentBlock < blocks.length ? nextBlock : submitForm}
        >
          <Text style={styles.buttonThinText}>
            {currentBlock < blocks.length ? 'Continuer' : 'Terminer'}
          </Text>
        </TouchableOpacity>

        {currentBlock > 1 && (
          <TouchableOpacity style={styles.backButton} onPress={previousBlock}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
  buttonThin: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
    width: '80%',
  },
  buttonThinText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    marginTop: 12,
  },
  backButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default IPAQForm;
