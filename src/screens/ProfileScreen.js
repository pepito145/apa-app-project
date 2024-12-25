import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ProfileContext } from './ProfileContext';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = ({ navigation }) => {
  const { profile } = useContext(ProfileContext);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.firstName?.[0]}{profile.lastName?.[0]}
            </Text>
          </View>
          <Text style={styles.headerName}>
            {profile.firstName} {profile.lastName}
          </Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* Section des informations */}
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.label}>Nom</Text>
              <Text style={styles.value}>{profile.lastName}</Text>
            </View>
            <View style={styles.separator} />
            
            <View style={styles.row}>
              <Text style={styles.label}>Prénom</Text>
              <Text style={styles.value}>{profile.firstName}</Text>
            </View>
            <View style={styles.separator} />
            
            <View style={styles.row}>
              <Text style={styles.label}>Genre</Text>
              <Text style={styles.value}>{profile.gender}</Text>
            </View>
            <View style={styles.separator} />
            
            <View style={styles.row}>
              <Text style={styles.label}>Âge</Text>
              <Text style={styles.value}>{profile.age + ' ans'}</Text>
            </View>
            <View style={styles.separator} />
            
            <View style={styles.row}>
              <Text style={styles.label}>Poids</Text>
              <Text style={styles.value}>{profile.weight + ' kg'}</Text>
            </View>
            <View style={styles.separator} />
            
            <View style={styles.row}>
              <Text style={styles.label}>Score IPAQ</Text>
              <Text style={styles.value}>{profile.ipaqScore ?? 'Non défini'}</Text>
            </View>
          </View>

          {/* Bouton Historique des activités */}
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => navigation.navigate('ActivitiesHistory')}
          >
            <Text style={styles.historyButtonText}>Historique des activités</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#2193b0',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  avatarText: {
    fontSize: 40,
    color: '#2193b0',
    fontWeight: 'bold',
  },
  headerName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2193b0',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 2,
  },
  historyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  historyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2193b0',
  },
});

export default ProfileScreen;