// app/student/applications.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ApplicationsScreen() {
  return (
    <View style={styles.container}>
      <Text>Postulaciones del Estudiante</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});