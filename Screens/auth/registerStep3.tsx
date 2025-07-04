import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import InputField from '@/components/ui/InputField';
import CustomButton from '@/components/ui/CustomButton';
import Colors from '@/constants/Colors';

import { registerUser } from '@/services/register/registerService';
// Ya no importamos universidades, carreras, idiomas, nivelIdioma completos

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';
import { useNavigation, useRoute } from '@react-navigation/native';

type RegisterStep3NavProp = NativeStackNavigationProp<AuthStackParamList, 'RegisterStep3'>;

export default function RegisterStep3Screen() {
  const navigation = useNavigation<RegisterStep3NavProp>();
  const route = useRoute();
  const { fullName, email, phone, password, skills } = route.params as AuthStackParamList['RegisterStep3'];

  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<
    { idIdioma: number; nivel: string }[]
  >([]);
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // Solo las opciones requeridas
  const universidades = [
    { id: 1, nombre: 'San Marcos' },
    { id: 2, nombre: 'Pontificia Católica' },
  ];
  const carreras = [
    { id: 1, nombre: 'Sistemas' },
    { id: 2, nombre: 'Industrial' },
  ];
  const idiomas = [
    { id: 1, nombre: 'Inglés' },
    { id: 2, nombre: 'Portugués' },
  ];
  // Puedes mantener nivelIdioma si lo usas igual que antes
  const nivelIdioma = [
    { id: 1, nombre: 'Básico' },
    { id: 2, nombre: 'Intermedio' },
    { id: 3, nombre: 'Avanzado' },
  ];

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
    const [firstName, lastName] = fullName.split(' ', 2);
    const data = {
      email,
      password,
      estudiante: {
        nombre: firstName,
        apellido: lastName,
        telefono: phone,
        sskills: skills, // Asumiendo que skills es un string JSON
        idUniversidad: parseInt(selectedUniversity),
        idCarrera: parseInt(selectedCareer),
        idiomas: selectedLanguages,
      },
    };

    try {
      await registerUser(data);
      alert('Registro exitoso');
      navigation.replace('Login');
    } catch (error: any) {
      alert(error.message || 'Error al registrar el usuario');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil Profesional</Text>

      {/* Universidad o Instituto */}
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

      {/* Carrera */}
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

      {/* Idiomas */}
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
    minHeight: '100%', // Asegura que ocupe toda la pantalla
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', // Centra verticalmente
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 8,
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
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#fff',
  },
  selectedLanguagesContainer: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  selectedLanguage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    width: '100%',
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