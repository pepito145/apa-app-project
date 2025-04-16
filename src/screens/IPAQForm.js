import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
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

  const validateInput = (text, type) => {
    if (type === 'days') {
      return /^([0-7])?$/.test(text);
    } else if (type === 'hours') {
      return /^([0-9]|1[0-9]|2[0-3])?$/.test(text);
    } else if (type === 'minutes') {
      return /^([0-5]?[0-9])?$/.test(text);
    } else if (type === 'episodes') {
      return /^([0-9]|[1-9][0-9])?$/.test(text);
    }
    return /^\d*$/.test(text);
  };

  const handleInputChange = (text, stateKey, type) => {
    if (validateInput(text, type)) {
      setAnswers({ ...answers, [stateKey]: text });
      setErrorMessage('');
    }
  };

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
    const intenseDays = Math.max(0, parseInt(answers.intenseDays) || 0);
    const intenseHours = Math.max(0, parseInt(answers.intenseHours) || 0);
    const intenseMinutes = Math.max(0, parseInt(answers.intenseMinutes) || 0);
    const moderateDays = Math.max(0, parseInt(answers.moderateDays) || 0);
    const moderateHours = Math.max(0, parseInt(answers.moderateHours) || 0);
    const moderateMinutes = Math.max(0, parseInt(answers.moderateMinutes) || 0);
    const walkingDays = Math.max(0, parseInt(answers.walkingDays) || 0);
    const walkingEpisodes = Math.max(0, parseInt(answers.walkingEpisodes) || 0);

    const intenseMinutesTotal = intenseDays * ((intenseHours * 60) + intenseMinutes);
    const moderateMinutesTotal = moderateDays * ((moderateHours * 60) + moderateMinutes);
    const walkingMinutesTotal = walkingDays * (walkingEpisodes * 10);

    const intenseMET = intenseMinutesTotal * 8.0;
    const moderateMET = moderateMinutesTotal * 4.0;
    const walkingMET = walkingMinutesTotal * 3.3;

    const totalScore = intenseMET + moderateMET + walkingMET;

    if (totalScore === 0) {
        return 1;
    }

    return Math.max(1, Math.round(totalScore));
  };

  const submitForm = () => {
    const ipaqScore = calculateScore();
    
    if (isNaN(ipaqScore) || ipaqScore < 1) {
      setErrorMessage('Erreur dans le calcul du score. Veuillez vérifier vos réponses.');
      return;
    }

    const updatedProfile = { 
      ...profile, 
      ipaqScore: Math.max(1, Math.round(ipaqScore))
    };

    const block = blocks[currentBlock - 1];
    const hasEmptyFields = block.questions.some((question) => !answers[question.stateKey]?.trim());

    if (hasEmptyFields) {
      setErrorMessage('Veuillez remplir tous les champs avant de continuer.');
    } else {
      try {
        setProfile(updatedProfile);
        saveProfile(updatedProfile);
        navigation.goBack();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du profil:', error);
        setErrorMessage('Une erreur est survenue lors de la sauvegarde.');
      }
    }
  };

  const blocks = [
    {
      title: 'Activités intenses',
      subtitle: 'Au cours des 7 derniers jours',
      description: 'Les activités physiques intenses font référence aux activités qui demandent un effort physique important et font respirer beaucoup plus difficilement que normalement.',
      questions: [
        { 
          label: 'Nombre de jours', 
          stateKey: 'intenseDays',
          type: 'days',
          placeholder: '0-7 jours',
          icon: 'calendar-today'
        },
        { 
          label: 'Heures par jour', 
          stateKey: 'intenseHours',
          type: 'hours',
          placeholder: '0-23 heures',
          icon: 'schedule'
        },
        { 
          label: 'Minutes par jour', 
          stateKey: 'intenseMinutes',
          type: 'minutes',
          placeholder: '0-59 minutes',
          icon: 'timer'
        },
      ],
    },
    {
      title: 'Activités modérées',
      subtitle: 'Au cours des 7 derniers jours',
      description: 'Les activités physiques modérées font référence aux activités qui demandent un effort physique modéré et font respirer un peu plus difficilement que normalement.',
      questions: [
        { 
          label: 'Nombre de jours', 
          stateKey: 'moderateDays',
          type: 'days',
          placeholder: '0-7 jours',
          icon: 'calendar-today'
        },
        { 
          label: 'Heures par jour', 
          stateKey: 'moderateHours',
          type: 'hours',
          placeholder: '0-23 heures',
          icon: 'schedule'
        },
        { 
          label: 'Minutes par jour', 
          stateKey: 'moderateMinutes',
          type: 'minutes',
          placeholder: '0-59 minutes',
          icon: 'timer'
        },
      ],
    },
    {
      title: 'Marche',
      subtitle: 'Au cours des 7 derniers jours',
      description: 'La marche inclut la marche au travail et à la maison, la marche pour se déplacer d\'un lieu à un autre, et toute autre marche que vous auriez pu faire pour la récréation, le sport ou les loisirs.',
      questions: [
        { 
          label: 'Nombre de jours de marche (min. 10 minutes)', 
          stateKey: 'walkingDays',
          type: 'days',
          placeholder: '0-7 jours',
          icon: 'directions-walk'
        },
        { 
          label: 'Nombre d\'épisodes de marche par jour', 
          stateKey: 'walkingEpisodes',
          type: 'episodes',
          placeholder: '0-99 épisodes',
          icon: 'repeat'
        },
      ],
    },
    {
      title: 'Temps assis',
      subtitle: 'Au cours des 7 derniers jours',
      description: 'Le temps passé assis comprend le temps passé au travail, à la maison, en cours et pendant les loisirs. Il peut s\'agir du temps passé assis à un bureau, chez des amis, à lire, à être assis ou allongé pour regarder la télévision.',
      questions: [
        { 
          label: 'Heures par jour', 
          stateKey: 'sittingHours',
          type: 'hours',
          placeholder: '0-23 heures',
          icon: 'event-seat'
        },
        { 
          label: 'Minutes par jour', 
          stateKey: 'sittingMinutes',
          type: 'minutes',
          placeholder: '0-59 minutes',
          icon: 'timer'
        },
      ],
    },
  ];

  const renderWelcomeScreen = () => (
    <View style={styles.container}>
      <MaterialIcons name="directions-run" size={60} color="#2193b0" style={styles.welcomeIcon} />
      <Text style={styles.title}>Questionnaire IPAQ</Text>
      <Text style={styles.subtitle}>
        Ce questionnaire évalue votre niveau d'activité physique des 7 derniers jours pour mieux adapter vos exercices.
      </Text>
      
      <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentBlock(1)}>
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryButtonText}>Remplir plus tard</Text>
      </TouchableOpacity>
    </View>
  );

  const renderQuestionBlock = (block) => (
    <ScrollView contentContainerStyle={styles.blockContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.blockTitle}>{block.title}</Text>
        <Text style={styles.blockSubtitle}>{block.subtitle}</Text>
        <Text style={styles.description}>{block.description}</Text>
      </View>

      {block.questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <View style={styles.labelContainer}>
            <MaterialIcons name={question.icon} size={24} color="#2193b0" />
            <Text style={styles.questionLabel}>{question.label}</Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={question.placeholder}
            value={answers[question.stateKey]}
            onChangeText={(text) => handleInputChange(text, question.stateKey, question.type)}
            maxLength={2}
          />
        </View>
      ))}

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <View style={styles.buttonContainer}>
        {currentBlock > 1 && (
          <TouchableOpacity style={styles.secondaryButton} onPress={previousBlock}>
            <View style={styles.row}>
            <MaterialIcons name="arrow-back" size={24} color="#666" />
            <Text style={styles.secondaryButtonText}>Retour</Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.primaryButton, currentBlock === 1 && styles.fullWidthButton]}
          onPress={currentBlock < blocks.length ? nextBlock : submitForm}
        ><View style={styles.row}>
          <Text style={styles.buttonText}>
            {currentBlock < blocks.length ? 'Continuer' : 'Terminer'}
          </Text>
          <MaterialIcons 
            name={currentBlock < blocks.length ? "arrow-forward" : "check"} 
            size={24} 
            color="#fff" 
          /></View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient
        colors={['#6dd5ed', '#2193b0']}
        style={styles.gradient}
        end={{ x: 0, y: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          {currentBlock === 0 
            ? renderWelcomeScreen()
            : renderQuestionBlock(blocks[currentBlock - 1])
          }
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#2193b0',
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeIcon: {
    marginBottom: 20,
  },
  blockContainer: {
    padding: 20,
  },
  headerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  blockTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2193b0',
    marginBottom: 8,
  },
  blockSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  questionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  questionLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#2193b0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fullWidthButton: {
    flex: 1,
    marginLeft: 0,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  error: {
    color: '#ff3b30',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default IPAQForm;
