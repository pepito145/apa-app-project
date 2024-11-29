import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ProfileScreen = () => {
  // Données fictives
  const userData = {
    first_name: 'Elliot',
    last_name: 'Cabanau',
    birth_date: '15 juin 2002 (22 ans)',
    gender: 'Homme',
    weight: '75 kg',
    ipaq_score: 'Moyen',
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userData.first_name[0]}{userData.last_name[0]}
            </Text>
          </View>
          <Text style={styles.headerName}>
            {userData.first_name} {userData.last_name}
          </Text>
        </View>

        {/* Section des informations */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Nom</Text>
            <Text style={styles.value}>{userData.last_name}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Prénom</Text>
            <Text style={styles.value}>{userData.first_name}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Genre</Text>
            <Text style={styles.value}>{userData.gender}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Date de naissance</Text>
            <Text style={styles.value}>{userData.birth_date}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Poids</Text>
            <Text style={styles.value}>{userData.weight}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>Score IPAQ</Text>
            <Text style={styles.value}>{userData.ipaq_score}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6dd5ed', // Couleur bleu clair dégradée d'avant
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#2193b0', // Couleur bleu foncé d'avant
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF', // Fond blanc pour l'avatar
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    color: '#2193b0', // Texte bleu foncé pour l'avatar
    fontWeight: 'bold',
  },
  headerName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF', // Nom en blanc dans l'en-tête
  },
  section: {
    backgroundColor: '#FFFFFF', // Fond blanc pour les sections
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Légère ombre
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10, // Espacement vertical pour chaque ligne
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2193b0', // Bleu foncé pour les labels
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333', // Texte noir pour les valeurs
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5', // Ligne de séparation grise
    marginVertical: 5,
  },
});

export default ProfileScreen;