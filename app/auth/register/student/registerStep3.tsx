import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import InputField from '@/components/ui/InputField';
import CustomButton from '@/components/ui/CustomButton';
import Colors from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';
import { registerUser } from '@/services/register/registerService';
import { universidades, carreras } from '@/data/registo';

export default function RegisterStep3Screen() {
  const [githubLink, setGithubLink] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [language, setLanguage] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [otherLanguage, setOtherLanguage] = useState('');

  const [showOtherLanguageInput, setShowOtherLanguageInput] = useState(false);
  const animationHeight = useSharedValue(0);

  const { fullName, email, phone, password } = useLocalSearchParams();

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleToggleOtherLanguageInput = () => {
    setShowOtherLanguageInput(!showOtherLanguageInput);
    animationHeight.value = showOtherLanguageInput ? withTiming(0) : withTiming(60);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: animationHeight.value,
    opacity: animationHeight.value > 0 ? 1 : 0,
  }));

  const handleFinalize = async () => {
    const [firstName, lastName] = (fullName as string).split(' ', 2);
    const data = {
      email,
      password,
      estudiante: {
        nombre: firstName || '',
        apellido: lastName || '',
        telefono: phone,
        idUniversidad: parseInt(selectedUniversity) || 0,
        idCarrera: parseInt(selectedCareer) || 0,
        idiomas: selectedLanguages,
      },
    };

    console.log('Enviando datos al backend:', data);

    try {
      const response = await registerUser(data);
      console.log('Usuario registrado con éxito:', response);
      alert('Registro exitoso');
    } catch (error: any) {
      console.error('Error al registrar el usuario:', error.message);
      alert(error.message || 'Error al registrar el usuario');
    }
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
        <Text style={styles.sectionTitle}>Universidad o Instituto</Text>
        <Text style={styles.sectionSubtitle}>Selecciona tu universidad</Text>
        <View style={styles.optionsContainer}>
          {universidades.map((uni) => (
            <TouchableOpacity
              key={uni.id}
              style={[
                styles.optionButton,
                selectedUniversity === uni.id.toString() && styles.optionButtonSelected,
              ]}
              onPress={() => setSelectedUniversity(uni.id.toString())}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedUniversity === uni.id.toString() && styles.optionTextSelected,
                ]}
              >
                {uni.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Carrera</Text>
        <Text style={styles.sectionSubtitle}>Selecciona tu carrera</Text>
        <View style={styles.optionsContainer}>
          {carreras.map((carrera) => (
            <TouchableOpacity
              key={carrera.id}
              style={[
                styles.optionButton,
                selectedCareer === carrera.id.toString() && styles.optionButtonSelected,
              ]}
              onPress={() => setSelectedCareer(carrera.id.toString())}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedCareer === carrera.id.toString() && styles.optionTextSelected,
                ]}
              >
                {carrera.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Idiomas</Text>
        <Text style={styles.sectionSubtitle}>Selecciona uno o más idiomas</Text>
        <View style={styles.optionsContainer}>
          {['Español', 'Inglés', 'Francés', 'Alemán', 'Otro'].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.optionButton,
                selectedLanguages.includes(lang) && styles.optionButtonSelected,
              ]}
              onPress={() => toggleLanguage(lang)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedLanguages.includes(lang) && styles.optionTextSelected,
                ]}
              >
                {lang}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedLanguages.includes('Otro') && (
          <Animated.View style={[styles.animatedContainer, animatedStyle]}>
            <InputField
              placeholder="Especifica otro idioma"
              value={otherLanguage}
              onChangeText={setOtherLanguage}
            />
          </Animated.View>
        )}
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
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
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
  animatedContainer: {
    overflow: 'hidden',
    marginTop: 10,
  },
});