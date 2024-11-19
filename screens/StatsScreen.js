// screens/StatsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Statistiques</Text>
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

export default StatsScreen;