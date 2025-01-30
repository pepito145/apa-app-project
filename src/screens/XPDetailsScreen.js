import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ProfileContext } from './ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const XPDetailsScreen = () => {
  const { profile } = useContext(ProfileContext);

  const xpSources = [
    {
      title: "Activité quotidienne",
      description: "Gagnez de l'XP en atteignant vos objectifs quotidiens de pas",
      icon: "directions-walk"
    },
    {
      title: "Séances d'exercice",
      description: "Complétez des séances d'exercice programmées",
      icon: "fitness-center"
    },
    {
      title: "Maintien du streak",
      description: "Bonus pour chaque jour consécutif d'activité",
      icon: "local-fire-department"
    },
    {
      title: "Questionnaires",
      description: "Remplissez les questionnaires de suivi",
      icon: "assignment"    
    }
  ];

  return (
    <LinearGradient 
      colors={['#6dd5ed', '#2193b0']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* En-tête avec l'XP actuel */}
        <View style={styles.header}>
          <Text style={styles.title}>Votre Progression</Text>
          <View style={styles.xpDisplay}>
            <MaterialIcons name="stars" size={40} color="#FFD700" />
            <Text style={styles.xpNumber}>{profile.XP || 0}</Text>
            <Text style={styles.xpLabel}>XP</Text>
          </View>
        </View>

        {/* Section "Qu'est-ce que l'XP ?" */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="info-outline" size={24} color="#fff" />
            <Text style={styles.sectionTitle}>Qu'est-ce que l'XP ?</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.explanationText}>
              Les points d'expérience (XP) reflètent votre progression globale dans votre parcours de remise en forme. 
              Ils représentent votre engagement et votre constance dans la pratique d'activités physiques.
            </Text>
          </View>
        </View>

        {/* Section "Comment gagner de l'XP" */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="emoji-events" size={24} color="#fff" />
            <Text style={styles.sectionTitle}>Comment gagner de l'XP ?</Text>
          </View>
          {xpSources.map((source, index) => (
            <View key={index} style={[styles.card, styles.xpCard]}>
              <View style={styles.xpCardHeader}>
                <View style={styles.xpCardTitleContainer}>
                  <MaterialIcons name={source.icon} size={24} color="#2193b0" />
                  <Text style={styles.xpCardTitle}>{source.title}</Text>
                </View>
                <Text style={styles.xpAmount}>{source.xp}</Text>
              </View>
              <Text style={styles.xpCardDescription}>{source.description}</Text>
            </View>
          ))}
        </View>

        {/* Section "Pourquoi c'est important" */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="psychology" size={24} color="#fff" />
            <Text style={styles.sectionTitle}>Pourquoi c'est important ?</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.explanationText}>
              Le système d'XP est conçu pour :
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Maintenir votre motivation au quotidien</Text>
              <Text style={styles.bulletPoint}>• Visualiser vos progrès à long terme</Text>
              <Text style={styles.bulletPoint}>• Récompenser votre régularité</Text>
              <Text style={styles.bulletPoint}>• Encourager une pratique variée</Text>
            </View>
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
    marginBottom: 20,
  },
  xpDisplay: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  xpNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  xpLabel: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  bulletPoints: {
    marginTop: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    lineHeight: 24,
  },
  xpCard: {
    marginBottom: 10,
  },
  xpCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  xpCardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2193b0',
    marginLeft: 10,
  },
  xpAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  xpCardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default XPDetailsScreen; 