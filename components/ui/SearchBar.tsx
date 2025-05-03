import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={Colors.gray} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});