import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProfileContext } from './ProfileContext';
import { MaterialIcons } from '@expo/vector-icons';

const EditProfileScreen = ({ navigation }) => {
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
      'Réinitialisation du score IPAQ',
      'Êtes-vous sûr de vouloir réinitialiser votre score IPAQ ?',
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
      'Réinitialisation Withings',
      'Êtes-vous sûr de vouloir réinitialiser la liaison avec votre compte Withings ?',
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

  const EditableField = ({ label, value, icon, isEditing, tempValue, setTempValue, onEdit, onSave }) => (
    <View style={styles.field}>
      <View style={styles.labelContainer}>
        <MaterialIcons name={icon} size={18} color="#2193b0" />
        <Text style={styles.label}>{label}</Text>
      </View>
      {isEditing ? (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={tempValue}
            onChangeText={setTempValue}
            keyboardType={label.includes('Age') || label.includes('Poids') ? 'numeric' : 'default'}
            autoFocus
          />
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <MaterialIcons name="check" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.valueRow}>
          <Text style={styles.value}>{value}</Text>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <MaterialIcons name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            <EditableField
              label="Prénom"
              value={profile.firstName}
              icon="person"
              isEditing={editingField === 'firstName'}
              tempValue={tempValue}
              setTempValue={setTempValue}
              onEdit={() => startEditing('firstName')}
              onSave={() => saveField('firstName')}
            />

            <EditableField
              label="Nom"
              value={profile.lastName}
              icon="person-outline"
              isEditing={editingField === 'lastName'}
              tempValue={tempValue}
              setTempValue={setTempValue}
              onEdit={() => startEditing('lastName')}
              onSave={() => saveField('lastName')}
            />

            <View style={styles.field}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="wc" size={18} color="#2193b0" />
                <Text style={styles.label}>Genre</Text>
              </View>
              <View style={styles.genderContainer}>
                <View style={styles.radioContainer}>
                  <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => saveField('gender', 'Homme')}
                  >
                    <View style={styles.radio}>
                      {profile.gender === 'Homme' && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={styles.radioLabel}>Homme</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => saveField('gender', 'Femme')}
                  >
                    <View style={styles.radio}>
                      {profile.gender === 'Femme' && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={styles.radioLabel}>Femme</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <EditableField
              label="Âge"
              value={`${profile.age} ans`}
              icon="cake"
              isEditing={editingField === 'age'}
              tempValue={tempValue}
              setTempValue={setTempValue}
              onEdit={() => startEditing('age')}
              onSave={() => saveField('age')}
            />

            <EditableField
              label="Poids (kg)"
              value={profile.weight}
              icon="fitness-center"
              isEditing={editingField === 'weight'}
              tempValue={tempValue}
              setTempValue={setTempValue}
              onEdit={() => startEditing('weight')}
              onSave={() => saveField('weight')}
            />

            <View style={styles.field}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="assessment" size={18} color="#2193b0" />
                <Text style={styles.label}>Score IPAQ</Text>
              </View>
              <View style={styles.valueRow}>
                <Text style={styles.value}>
                  {profile.ipaqScore != null ? profile.ipaqScore : 'Non défini'}
                </Text>
                <TouchableOpacity style={styles.resetButton} onPress={resetIPAQScore}>
                  <MaterialIcons name="refresh" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="link" size={18} color="#2193b0" />
                <Text style={styles.label}>Compte Withings</Text>
              </View>
              <View style={styles.valueRow}>
                <Text style={styles.value}>
                  {profile.isWithingsLinked ? 'Lié' : 'Non lié'}
                </Text>
                <TouchableOpacity style={styles.resetButton} onPress={resetWithingsLink}>
                  <MaterialIcons name="refresh" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#6dd5ed',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  field: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2193b0',
    marginLeft: 6,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
  },
  value: {
    fontSize: 15,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#2193b0',
    padding: 6,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  resetButton: {
    backgroundColor: '#ff5047',
    padding: 6,
    borderRadius: 6,
  },
  genderContainer: {
    marginTop: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#2193b0',
    borderRadius: 10,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 12,
    height: 12,
    backgroundColor: '#2193b0',
    borderRadius: 6,
  },
  radioLabel: {
    fontSize: 15,
    color: '#333',
  },
});

export default EditProfileScreen;