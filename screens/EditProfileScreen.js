import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = () => {
  // États pour les données principales
  const [profile, setProfile] = useState({
    firstName: 'Elliot',
    lastName: 'FamilyName',
    gender: 'Homme',
    age: '22',
    weight: '70',
    ipaqScore: '5000',
  });

  const [editingField, setEditingField] = useState(null); // Champ actuellement édité
  const [tempValue, setTempValue] = useState(''); // Valeur temporaire pour la saisie
  const [showDatePicker, setShowDatePicker] = useState(false); // Contrôle du DateTimePicker

  // Charger les données sauvegardées à partir d'AsyncStorage
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil :', error);
      }
    };
    loadProfile();
  }, []);

  // Sauvegarder les données dans AsyncStorage
  const saveProfile = async (updatedProfile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      console.log('Profil sauvegardé !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du profil :', error);
    }
  };

  // Gestion de la modification
  const startEditing = (field) => {
    setEditingField(field);
    setTempValue(profile[field]?.toString() || ''); // Charger la valeur actuelle
    if (field === 'birthDate') {
      setShowDatePicker(true); // Afficher le calendrier pour la date
    }
  };

  // Gestion de la sauvegarde
  const saveField = (field) => {
    const updatedProfile = {
      ...profile,
      [field]: field === 'birthDate' ? tempValue : tempValue.toString(),
    };
    setProfile(updatedProfile);
    saveProfile(updatedProfile); // Sauvegarde dans AsyncStorage
    setEditingField(null);
    if (field === 'birthDate') setShowDatePicker(false); // Cacher le calendrier après sauvegarde
  };

  // Gestion de la validation automatique pour le genre
  const handleGenderChange = (value) => {
    const updatedProfile = {
      ...profile,
      gender: value,
    };
    setProfile(updatedProfile);
    saveProfile(updatedProfile); // Sauvegarde dans AsyncStorage
    setEditingField(null);
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
              onValueChange={(itemValue) => handleGenderChange(itemValue)}
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
        <EditableField
          label="Score IPAQ"
          value={profile.ipaqScore}
          isEditing={editingField === 'ipaqScore'}
          tempValue={tempValue}
          setTempValue={setTempValue}
          onEdit={() => startEditing('ipaqScore')}
          onSave={() => saveField('ipaqScore')}
        />
      </View>
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    color: '#333',
  },
});

export default EditProfileScreen;