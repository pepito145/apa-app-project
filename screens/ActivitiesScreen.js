// screens/ActivitiesScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActivitiesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Activités</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActivitiesScreen;