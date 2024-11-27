// screens/EditProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const EditProfileScreen = () => {
  // États pour chaque champ de profil
  const [firstName, setFirstName] = useState('Elliot');
  const [lastName, setLastName] = useState('FamilyName');
  const [email, setEmail] = useState('elliot@example.com');
  const [phone, setPhone] = useState('0123456789');
  const [isEditing, setIsEditing] = useState(null); // Champ actuellement édité

  const handleSave = (field, value) => {
    if (field === 'firstName') setFirstName(value);
    if (field === 'lastName') setLastName(value);
    if (field === 'email') setEmail(value);
    if (field === 'phone') setPhone(value);

    setIsEditing(null); // Arrête l'édition après sauvegarde
    alert('Modifications sauvegardées.');
  };

  return (
    <LinearGradient colors={['#6dd5ed', '#2193b0']} style={styles.container}>
      <Text style={styles.title}>Modifier le profil</Text>

      <View style={styles.form}>
        {/* Champ : Prénom */}
        <View style={styles.field}>
          <Text style={styles.label}>Prénom</Text>
          {isEditing === 'firstName' ? (
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={(value) => setFirstName(value)}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSave('firstName', firstName)}
              >
                <Text style={styles.saveButtonText}>✔</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.valueRow}>
              <Text style={styles.value}>{firstName}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing('firstName')}
              >
                <Text style={styles.editButtonText}>Modifier</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Champ : Nom */}
        <View style={styles.field}>
          <Text style={styles.label}>Nom</Text>
          {isEditing === 'lastName' ? (
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={(value) => setLastName(value)}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSave('lastName', lastName)}
              >
                <Text style={styles.saveButtonText}>✔</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.valueRow}>
              <Text style={styles.value}>{lastName}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing('lastName')}
              >
                <Text style={styles.editButtonText}>Modifier</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Champ : Email */}
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          {isEditing === 'email' ? (
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(value) => setEmail(value)}
                keyboardType="email-address"
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSave('email', email)}
              >
                <Text style={styles.saveButtonText}>✔</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.valueRow}>
              <Text style={styles.value}>{email}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing('email')}
              >
                <Text style={styles.editButtonText}>Modifier</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Champ : Téléphone */}
        <View style={styles.field}>
          <Text style={styles.label}>Téléphone</Text>
          {isEditing === 'phone' ? (
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={(value) => setPhone(value)}
                keyboardType="phone-pad"
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSave('phone', phone)}
              >
                <Text style={styles.saveButtonText}>✔</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.valueRow}>
              <Text style={styles.value}>{phone}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing('phone')}
              >
                <Text style={styles.editButtonText}>Modifier</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fond blanc semi-transparent
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
});

export default EditProfileScreen;