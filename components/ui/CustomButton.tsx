import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const CustomButton = ({
  title,
  onPress,
  small = false,
}: {
  title: string;
  onPress: () => void;
  small?: boolean;
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, small && styles.smallButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, small && styles.smallText]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  smallButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 'auto',
  },
  smallText: {
    fontSize: 14,
  },
});