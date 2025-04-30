import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type GoodAtProps = {
  content: string;
};

export default function GoodAt({ content }: GoodAtProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soy bueno en</Text>
      <Text style={styles.content}>{content}</Text>
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