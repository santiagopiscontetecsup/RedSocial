import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonStyle2Props = {
  title: string;
  onPress: () => void;
};

export default function ButtonStyle2({ title, onPress }: ButtonStyle2Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: '#2c5fb8',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});