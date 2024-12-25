import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { ProfileContext } from './ProfileContext'; // Import du contexte
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = ({ navigation, route }) => {
  const { onLogout } = route.params;
  const { profile, setProfile, saveProfile } = useContext(ProfileContext);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const startEditing = (field) => {
    setEditingField(field);
    setTempValue(profile[field]?.toString() || '');
  };

  const saveField = (field, value = tempValue) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
    setEditingField(null);
  };

  const resetIPAQScore = () => {
    Alert.alert(
      'Réinitialisation',
      'Êtes-vous sûr de vouloir réinitialiser le score IPAQ ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => {
            const updatedProfile = { ...profile, ipaqScore: null };
            setProfile(updatedProfile);
            saveProfile(updatedProfile);
          },
        },
      ]
    );
  };

  const resetWithingsLink = () => {
    Alert.alert(
      'Réinitialisation',
      'Êtes-vous sûr de vouloir réinitialiser la liaison au compte Withings ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => {
            const updatedProfile = { ...profile, isWithingsLinked: false };
            setProfile(updatedProfile);
            saveProfile(updatedProfile);
          },
        },
      ]
    );
  };

  const handleResetAll = () => {
    Alert.alert(
      'Attention !',
      'Êtes-vous sûr de vouloir réinitialiser complètement l\'application ?\n\nCette action est irréversible et supprimera :\n\n- Votre profil\n- Votre historique d\'activités\n- Vos paramètres\n- La liaison Withings\n- Toutes les données enregistrées\n\nVous serez déconnecté de l\'application.',
      [
        { 
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Dernière confirmation',
              'Êtes-vous vraiment sûr de vouloir tout supprimer ? Cette action est définitive.',
              [
                { 
                  text: 'Non, annuler',
                  style: 'cancel'
                },
                {
                  text: 'Oui, tout supprimer',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      // Supprimer toutes les données stockées
                      await AsyncStorage.clear();
                      
                      // Réinitialiser le profil
                      const emptyProfile = {
                        firstName: '',
                        lastName: '',
                        gender: '',
                        age: '',
                        weight: '',
                        ipaqScore: null,
                        isWithingsLinked: false,
                        streak: 0,
                        access_token: '',
                        refresh_token: '',
                      };
                      setProfile(emptyProfile);
                      
                      // Déconnecter l'utilisateur
                      onLogout();
                    } catch (error) {
                      console.error('Erreur lors de la réinitialisation:', error);
                      Alert.alert('Erreur', 'Une erreur est survenue lors de la réinitialisation.');
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>
      <View style={styles.form}>
        {/* Prénom */}
        <EditableField
          label="Prénom"
          value={profile.firstName}
          isEditing={editingField === 'firstName'}
          tempValue={tempValue}
          setTempValue={setTempValue}
          onEdit={() => startEditing('firstName')}
          onSave={() => saveField('firstName')}
        />

        {/* Nom */}
        <EditableField
          label="Nom"
          value={profile.lastName}
          isEditing={editingField === 'lastName'}
          tempValue={tempValue}
          setTempValue={setTempValue}
          onEdit={() => startEditing('lastName')}
          onSave={() => saveField('lastName')}
        />

        {/* Genre */}
        <View style={styles.field}>
          <Text style={styles.label}>Genre</Text>
          {editingField === 'gender' ? (
            <Picker
              selectedValue={profile.gender}
              style={styles.picker}
              onValueChange={(itemValue) => saveField('gender', itemValue)}
            >
              <Picker.Item label="Homme" value="Homme" />
              <Picker.Item label="Femme" value="Femme" />
              <Picker.Item label="Autre" value="Autre" />
            </Picker>
          ) : (
            <View style={styles.valueRow}>
              <Text style={styles.value}>{profile.gender}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => startEditing('gender')}
              >
                <Text style={styles.editButtonText}>Modifier</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Age */}
        <EditableField
          label="Age"
          value={profile.age + ' ans'}
          isEditing={editingField === 'age'}
          tempValue={tempValue}
          setTempValue={setTempValue}
          onEdit={() => startEditing('age')}
          onSave={() => saveField('age')}
        />

        {/* Poids */}
        <EditableField
          label="Poids (kg)"
          value={profile.weight}
          isEditing={editingField === 'weight'}
          tempValue={tempValue}
          setTempValue={setTempValue}
          onEdit={() => startEditing('weight')}
          onSave={() => saveField('weight')}
        />

        {/* Score IPAQ */}
        <View style={styles.field}>
          <Text style={styles.label}>Score IPAQ</Text>
          <View style={styles.valueRow}>
            <Text style={styles.value}>
              {profile.ipaqScore != null ? profile.ipaqScore : 'Non défini'}
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetIPAQScore}
            >
              <Text style={styles.resetButtonText}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Liaison compte withings */}
        <View style={styles.field}>
          <Text style={styles.label}>Liaison compte withings</Text>
          <View style={styles.valueRow}>
            <Text style={styles.value}>
              {profile.isWithingsLinked ? 'Lié' : 'Non lié'}            
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetWithingsLink}
            >
              <Text style={styles.resetButtonText}>Réinitialiser</Text>
            </TouchableOpacity>
          </View>
        </View>

        
      </View>

      {/* Bouton de réinitialisation */}
      <TouchableOpacity 
        style={styles.resetAllButton} 
        onPress={handleResetAll}
      >
        <Text style={styles.resetAllButtonText}>Réinitialiser l'application</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

// Composant réutilisable pour les champs modifiables
const EditableField = ({ label, value, isEditing, tempValue, setTempValue, onEdit, onSave }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    {isEditing ? (
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={tempValue}
          onChangeText={(text) => setTempValue(text)}
          keyboardType={label === 'Poids (kg)' || label === 'Score IPAQ' ? 'numeric' : 'default'}
        />
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>✔</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#ff5047',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#6dd5ed',
    paddingVertical: 12,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  saveButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#28a745',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  resetAllButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 15,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  resetAllButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;