import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions, Alert } from 'react-native';
import { ProfileContext } from './ProfileContext';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const StepsDetailsScreen = () => {
  const { profile, updateStepsGoal } = useContext(ProfileContext);
  const [newGoal, setNewGoal] = useState('5000');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile && profile.stepsGoal) {
      setNewGoal(profile.stepsGoal.toString());
    }
  }, [profile.stepsGoal]);

  const handleUpdateGoal = async () => {
    const goalNumber = parseInt(newGoal);
    if (isNaN(goalNumber) || goalNumber < 100 || goalNumber > 100000) {
      Alert.alert(
        "Objectif invalide",
        "Veuillez entrer un nombre entre 100 et 100 000 pas"
      );
      return;
    }
    await updateStepsGoal(goalNumber);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewGoal((profile.stepsGoal || 5000).toString());
    setIsEditing(false);
  };

  const benefitCards = [
    {
      title: "Santé cardiovasculaire",
      description: "La marche régulière améliore la santé cardiaque et réduit les risques de maladies cardiovasculaires.",
      icon: "favorite"
    },
    {
      title: "Gestion du poids",
      description: "10 000 pas permettent de brûler environ 400-500 calories.",
      icon: "fitness-center"
    },
    {
      title: "Santé mentale",
      description: "La marche libère des endorphines, réduisant le stress et améliorant l'humeur.",
      icon: "psychology"
    }
  ];

  return (
    <LinearGradient 
      colors={['#6dd5ed', '#2193b0']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Suivi des Pas</Text>
          <Text style={styles.subtitle}>
            Votre activité quotidienne, pas à pas
          </Text>
        </View>

        <View style={styles.goalSection}>
          <Text style={styles.sectionTitle}>Votre Objectif Quotidien</Text>
          <View style={styles.goalContainer}>
            {isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.input}
                  value={newGoal}
                  onChangeText={setNewGoal}
                  keyboardType="numeric"
                  maxLength={6}
                />
                <View style={styles.editButtons}>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.saveButton]}
                    onPress={handleUpdateGoal}
                  >
                    <Text style={styles.editButtonText}>Sauvegarder</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.cancelButton]}
                    onPress={handleCancel}
                  >
                    <Text style={styles.editButtonText}>Annuler</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.goalDisplay}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.goalText}>
                  {profile.stepsGoal || 5000}
                </Text>
                <Text style={styles.goalLabel}>pas par jour</Text>
                <MaterialIcons name="edit" size={24} color="#fff" style={styles.editIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Pourquoi compter ses pas ?</Text>
          {benefitCards.map((benefit, index) => (
            <View key={index} style={styles.benefitCard}>
              <MaterialIcons name={benefit.icon} size={32} color="#2193b0" />
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Conseils pour atteindre votre objectif</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>• Prenez les escaliers plutôt que l'ascenseur</Text>
            <Text style={styles.tipText}>• Faites une promenade pendant votre pause déjeuner</Text>
            <Text style={styles.tipText}>• Descendez du bus un arrêt plus tôt</Text>
            <Text style={styles.tipText}>• Programmez des rappels pour bouger toutes les heures</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  goalSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  goalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  goalDisplay: {
    alignItems: 'center',
    position: 'relative',
  },
  goalText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  goalLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  editContainer: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  editButton: {
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#FF5722',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    marginBottom: 30,
  },
  benefitCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitContent: {
    marginLeft: 15,
    flex: 1,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2193b0',
    marginBottom: 5,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
  },
  tipsSection: {
    marginBottom: 30,
  },
  tipCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
  },
  tipText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default StepsDetailsScreen;