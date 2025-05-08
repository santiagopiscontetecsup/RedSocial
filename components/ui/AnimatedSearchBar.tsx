import React from 'react';
import { TextInput, StyleSheet, View, ViewStyle } from 'react-native';

interface AnimatedSearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
}

const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    height: 40,
    fontSize: 16,
  },
});

export default AnimatedSearchBar;
