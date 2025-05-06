import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import InputField from '@/components/ui/InputField';
import CustomButton from '@/components/ui/CustomButton';
import Colors from '@/constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import { registerUser } from '@/services/register/registerService';
import { universidades, carreras, idiomas, nivelIdioma } from '@/data/registo';

export default function RegisterStep3Screen() {
  const [githubLink, setGithubLink] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<
    { idIdioma: number; nivel: string }[]
  >([]);
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const { fullName, email, phone, password } = useLocalSearchParams();

  const handleAddLanguage = () => {
    if (selectedLanguage && selectedLevel) {
      const newLanguage = {
        idIdioma: selectedLanguage,
        nivel: selectedLevel,
      };

      // Evitar duplicados
      if (
        !selectedLanguages.some(
          (lang) => lang.idIdioma === newLanguage.idIdioma
        )
      ) {
        setSelectedLanguages((prev) => [...prev, newLanguage]);
      }

      // Reiniciar selección
      setSelectedLanguage(null);
      setSelectedLevel(null);
    }
  };

  const handleRemoveLanguage = (idIdioma: number) => {
    setSelectedLanguages((prev) =>
      prev.filter((lang) => lang.idIdioma !== idIdioma)
    );
  };

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
    console.log('Cuerpo enviado al backend:', JSON.stringify(data, null, 2));

    // descomentar para hacer puebras con el backend
    try {
      const response = await registerUser(data);
      console.log('Usuario registrado con éxito:', response);
      alert('Registro exitoso');
      // nos manda a la vista del login
      router.replace('/auth/login');
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
                selectedUniversity === uni.id.toString() &&
                  styles.optionButtonSelected,
              ]}
              onPress={() => setSelectedUniversity(uni.id.toString())}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedUniversity === uni.id.toString() &&
                    styles.optionTextSelected,
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
                selectedCareer === carrera.id.toString() &&
                  styles.optionButtonSelected,
              ]}
              onPress={() => setSelectedCareer(carrera.id.toString())}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedCareer === carrera.id.toString() &&
                    styles.optionTextSelected,
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
        <Text style={styles.sectionSubtitle}>
          Selecciona un idioma y su nivel
        </Text>
        <View style={styles.optionsContainer}>
          {idiomas.map((idioma) => (
            <TouchableOpacity
              key={idioma.id}
              style={[
                styles.optionButton,
                selectedLanguage === idioma.id && styles.optionButtonSelected,
              ]}
              onPress={() => setSelectedLanguage(idioma.id)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedLanguage === idioma.id && styles.optionTextSelected,
                ]}
              >
                {idioma.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        

        {selectedLanguage && (
          
          <View style={styles.optionsContainer}>
            {nivelIdioma.map((nivel) => (
              <TouchableOpacity
                key={nivel.id}
                style={[
                  styles.optionButton,
                  selectedLevel === nivel.nombre &&
                    styles.optionButtonSelected,
                ]}
                onPress={() => setSelectedLevel(nivel.nombre)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedLevel === nivel.nombre &&
                      styles.optionTextSelected,
                  ]}
                >
                  {nivel.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {selectedLanguage && selectedLevel && (
          <CustomButton title="Agregar Idioma" onPress={handleAddLanguage} />
        )}

        <View style={styles.selectedLanguagesContainer}>
          {selectedLanguages.map((lang) => (
            <View key={lang.idIdioma} style={styles.selectedLanguage}>
              <Text style={styles.selectedLanguageText}>
                {idiomas.find((idioma) => idioma.id === lang.idIdioma)?.nombre}{' '}
                - {lang.nivel}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveLanguage(lang.idIdioma)}
              >
                <Text style={styles.removeLanguage}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
  selectedLanguagesContainer: {
    marginTop: 16,
  },
  selectedLanguage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  selectedLanguageText: {
    fontSize: 14,
    color: Colors.primary,
  },
  removeLanguage: {
    fontSize: 12,
    color: Colors.error,
  },
});