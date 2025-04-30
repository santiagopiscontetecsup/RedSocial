import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type SkillsProps = {
  skills: string[];
};

export default function Skills({ skills }: SkillsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Habilidades</Text>
      <Text style={styles.content}>{skills.join('\n')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#e6f0f9',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  content: {
    fontSize: 12,
    textAlign: 'center',
  },
});