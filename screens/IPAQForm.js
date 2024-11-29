import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IPAQForm = ({ navigation }) => {
  // Gestion des états pour les blocs et réponses
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

  // Contenu des blocs basé sur le vrai questionnaire IPAQ
  const blocks = [
    {
      title: 'Bloc 1 : Activités intenses des 7 derniers jours',
      questions: [
        {
          label:
            'Combien de jours avez-vous effectué des activités physiques intenses au cours des 7 derniers jours (port de charges lourdes, football, etc.) ?',
          stateKey: 'intenseDays',
        },
        {
          label: 'Combien d’heures et de minutes par jour en moyenne ? (heures)',
          stateKey: 'intenseHours',
        },
        {
          label: 'Combien de minutes par jour en moyenne ? (minutes)',
          stateKey: 'intenseMinutes',
        },
      ],
    },
    {
      title: 'Bloc 2 : Activités modérées des 7 derniers jours',
      questions: [
        {
          label:
            'Combien de jours avez-vous effectué des activités physiques modérées au cours des 7 derniers jours (port de charges légères, vélo tranquille, etc.) ?',
          stateKey: 'moderateDays',
        },
        {
          label: 'Combien d’heures et de minutes par jour en moyenne ? (heures)',
          stateKey: 'moderateHours',
        },
        {
          label: 'Combien de minutes par jour en moyenne ? (minutes)',
          stateKey: 'moderateMinutes',
        },
      ],
    },
    {
      title: 'Bloc 3 : Marche des 7 derniers jours',
      questions: [
        {
          label: 'Combien de jours avez-vous marché pendant au moins 10 minutes d’affilée ?',
          stateKey: 'walkingDays',
        },
        {
          label:
            'Combien d’épisodes de marche d’au moins 10 minutes d’affilée avez-vous effectués ?',
          stateKey: 'walkingEpisodes',
        },
      ],
    },
    {
      title: 'Bloc 4 : Temps passé assis au cours des 7 derniers jours',
      questions: [
        {
          label:
            'Pendant combien de temps en moyenne par jour êtes-vous resté assis (heures) ?',
          stateKey: 'sittingHours',
        },
        {
          label: 'Pendant combien de temps en moyenne par jour êtes-vous resté assis (minutes) ?',
          stateKey: 'sittingMinutes',
        },
      ],
    },
  ];

  // Gestion de l'affichage des blocs et de l'écran final
  if (currentBlock === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue dans le questionnaire IPAQ</Text>
        <Text style={styles.subtitle}>
          Ce questionnaire mesure votre niveau d’activité physique au cours des 7 derniers jours.
          Veuillez répondre honnêtement.
        </Text>
        <TouchableOpacity style={styles.button} onPress={nextBlock}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentBlock <= blocks.length) {
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
              onChangeText={(text) =>
                setAnswers({ ...answers, [question.stateKey]: text })
              }
            />
          </View>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={currentBlock < blocks.length ? nextBlock : () => setCurrentBlock(currentBlock + 1)}
        >
          <Text style={styles.buttonText}>
            {currentBlock < blocks.length ? 'Continuer' : 'Terminer'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Félicitations !</Text>
      <Text style={styles.subtitle}>
        Vous avez terminé le questionnaire IPAQ. Voici votre score :
      </Text>
      <Text style={styles.score}>{calculateScore()} MET-minutes/semaine</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Retour à l’accueil</Text>
      </TouchableOpacity>
    </View>
  );
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
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 16,
  },
});

export default IPAQForm;