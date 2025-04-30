import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type AboutMeProps = {
  description: string;
};

export default function AboutMe({ description }: AboutMeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de mí</Text>
      <Text style={styles.content}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3a3a3a',
    marginBottom: 6,
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
    color: '#555',
  },
});