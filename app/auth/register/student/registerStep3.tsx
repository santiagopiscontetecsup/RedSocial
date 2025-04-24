import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import InputField from '@/components/ui/InputField';
import CustomButton from '@/components/ui/CustomButton';
import Colors from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';
import { registerUser } from '@/services/register/registerService';

export default function RegisterStep3Screen() {
  const [githubLink, setGithubLink] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [university, setUniversity] = useState('');
  const [career, setCareer] = useState('');
  const [language, setLanguage] = useState('');
  const [otherLanguage, setOtherLanguage] = useState('');

  const [showOtherLanguageInput, setShowOtherLanguageInput] = useState(false);
  const animationHeight = useSharedValue(0); // Controla la altura del campo animado

  const {
    fullName,
    email,
    phone,
    password,
    role,
    skills,
  } = useLocalSearchParams();

  const handleToggleOtherLanguageInput = () => {
    setShowOtherLanguageInput(!showOtherLanguageInput);
    animationHeight.value = showOtherLanguageInput ? withTiming(0) : withTiming(60); // Cambia la altura con animación
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: animationHeight.value,
    opacity: animationHeight.value > 0 ? 1 : 0,
  }));

  const handleFinalize = async () => {
    const data = {
      fullName,
      email,
      phone,
      password,
      role,
      skills,
      githubLink,
      isStudent,
      university,
      career,
      language,
      otherLanguage: showOtherLanguageInput ? otherLanguage : null,
    };
    console.log('Enviando datos al backend:', data);
    
    // descomenta solo para verificar el endpoint de registro
    // try {
    //   const response = await registerUser(data); // Llama a la función para registrar al usuario
    //   console.log('Usuario registrado con éxito:', response);
    //   alert('Registro exitoso');
    // } catch (error: any) {
    //   console.error('Error al registrar el usuario:', error.message);
    //   alert(error.message || 'Error al registrar el usuario');
    // }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil Profesional</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre tus proyectos</Text>
        <Text style={styles.sectionSubtitle}>
          Ingresa tu link de Github para conocer tus proyectos
        </Text>
        <InputField
          placeholder="Ejm: https://github.com/He4rttt"
          value={githubLink}
          onChangeText={setGithubLink}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre ti</Text>
        <Text style={styles.sectionSubtitle}>¿Eres estudiante o Egresado?</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              isStudent && styles.optionButtonSelected,
            ]}
            onPress={() => setIsStudent(true)}
          >
            <Text
              style={[
                styles.optionText,
                isStudent && styles.optionTextSelected,
              ]}
            >
              Estudiante
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              !isStudent && styles.optionButtonSelected,
            ]}
            onPress={() => setIsStudent(false)}
          >
            <Text
              style={[
                styles.optionText,
                !isStudent && styles.optionTextSelected,
              ]}
            >
              Egresado
            </Text>
          </TouchableOpacity>
        </View>
        <InputField
          placeholder="¿De qué universidad o Instituto eres?"
          value={university}
          onChangeText={setUniversity}
        />
        <InputField
          placeholder="¿Qué carrera estudias?"
          value={career}
          onChangeText={setCareer}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Idiomas</Text>
        <InputField
          placeholder="¿Cual es tu idioma nativo?"
          value={language}
          onChangeText={setLanguage}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={handleToggleOtherLanguageInput}
        >
          <Text style={styles.toggleButtonText}>
            {showOtherLanguageInput ? 'Ocultar otros idiomas' : 'Sé otros idiomas'}
          </Text>
        </TouchableOpacity>
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
          {showOtherLanguageInput && (
            <InputField
              placeholder="¿Qué otros idiomas sabes?"
              value={otherLanguage}
              onChangeText={setOtherLanguage}
            />
          )}
        </Animated.View>
      </View>

      <CustomButton title="Finalizar" onPress={handleFinalize} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
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
  toggleButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  toggleButtonText: {
    fontSize: 14,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  animatedContainer: {
    overflow: 'hidden',
    marginTop: 10,
  },
});