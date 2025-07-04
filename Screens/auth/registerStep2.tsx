import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import CustomButton from '@/components/ui/CustomButton';
import Colors from '@/constants/Colors';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type Step2NavProp = NativeStackNavigationProp<AuthStackParamList, 'RegisterStep2'>;
type Step2RouteProp = RouteProp<AuthStackParamList, 'RegisterStep2'>;


// ...existing code...
export default function RegisterStep2Screen() {
  const navigation = useNavigation<Step2NavProp>();
  const route = useRoute<Step2RouteProp>();
  const { fullName, email, phone, password } = route.params;

  // Solo permite seleccionar C# y Figma (id: 1 y 2)
  const skills = [
    { id: 1, name: 'C#' },
    { id: 2, name: 'Figma' },
  ];
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const toggleSkill = (id: number) => {
    setSelectedSkills((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    );
  };

  const handleContinue = () => {
    navigation.navigate('RegisterStep3', {
      fullName,
      email,
      phone,
      password,
      role: '', // Eliminado, pero se mantiene por compatibilidad de params
      skills: JSON.stringify(selectedSkills),
    });
  };

  // Animación para los botones de habilidades
  const skillAnimation = useSharedValue(1);
  const skillAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: skillAnimation.value }],
    opacity: skillAnimation.value,
  }));

  const handleSkillPress = (id: number) => {
    toggleSkill(id);
    skillAnimation.value = withTiming(1.1, { duration: 200 }, () => {
      skillAnimation.value = withTiming(1, { duration: 200 });
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cuéntanos más acerca de ti...</Text>

      {/* Sección de habilidades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <Text style={styles.sectionSubtitle}>
          Selecciona tus habilidades principales (máximo 2)
        </Text>
        <View style={styles.optionsContainer}>
          {skills.map((skill) => (
            <Animated.View key={skill.id} style={skillAnimatedStyle}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedSkills.includes(skill.id) && styles.optionButtonSelected,
                ]}
                onPress={() => handleSkillPress(skill.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedSkills.includes(skill.id) && styles.optionTextSelected,
                  ]}
                >
                  {skill.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      <CustomButton title="Continuar" onPress={handleContinue} />
    </ScrollView>
  );
}
// ...existing code...

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    paddingHorizontal: 24, // Agrega margen a los lados
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 12,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    width: '100%',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  optionButtonSelected: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.primary,
  },
  optionTextSelected: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});