import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const AnimatedSearchBar = ({ placeholder }: { placeholder: string }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animation = new Animated.Value(1);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animation, {
      toValue: 1.05,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{ scale: animation }],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Ionicons name="search" size={20} color={Colors.gray} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && (
        <TouchableOpacity onPress={handleBlur}>
          <Ionicons name="close" size={20} color={Colors.gray} style={styles.icon} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default AnimatedSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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