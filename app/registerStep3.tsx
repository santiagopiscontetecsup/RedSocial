import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import InputField from '@/components/ui/InputField';
import CustomButton from '@/components/ui/CustomButton';
import Colors from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';

export default function RegisterStep3Screen() {
  const [githubLink, setGithubLink] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [university, setUniversity] = useState('');
  const [career, setCareer] = useState('');
  const [language, setLanguage] = useState('');
  const [otherLanguage, setOtherLanguage] = useState('');

  const {
    fullName,
    email,
    phone,
    password,
    role,
    skills,
  } = useLocalSearchParams();
  
  const handleFinalize = async () => {
    
    const data = {
        fullName,
        email,
        phone,
        password,
        role,
        skills: JSON.parse(skills),
        githubLink,
        isStudent,
        university,
        career,
        language,
        otherLanguage,
      };
      console.log('Enviando datos al backend:', data);

    // Add logic to finalize registration
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
          placeholder="¿Qué idioma dominas?"
          value={language}
          onChangeText={setLanguage}
        />
        <InputField
          placeholder="¿Con qué otros idiomas sabes o trabajas?"
          value={otherLanguage}
          onChangeText={setOtherLanguage}
        />
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
});