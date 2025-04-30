import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import ProfileHeader from '@/components/ui/ProfileHeader';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen() {
  const [aboutMe, setAboutMe] = useState(
    'Soy Diseñador UX/UI con experiencia en la creación de interfaces intuitivas y soluciones innovadoras. Me apasiona desarrollar productos digitales centrados en la experiencia del usuario, asegurando que cada diseño sea funcional, atractivo y eficiente.'
  );
  const [goodAt, setGoodAt] = useState(
    'Identificar problemas de usabilidad y transformarlos en soluciones visuales claras y funcionales. Me adapto rápido a nuevas herramientas y disfruto colaborar en equipos creativos.'
  );
  const [skills, setSkills] = useState([
    'Diseño UX/UI',
    'Prototipado en Figma',
    'Investigación de usuarios',
    'Manejo básico React Native por el lado del FrontEnd',
  ]);

  const handleEditAboutMe = () => {
    Alert.prompt('Editar Acerca de mí', 'Actualiza tu descripción:', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Guardar',
        onPress: (text) => setAboutMe(text || aboutMe),
      },
    ]);
  };

  const handleEditGoodAt = () => {
    Alert.prompt('Editar Soy bueno en', 'Actualiza tu descripción:', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Guardar',
        onPress: (text) => setGoodAt(text || goodAt),
      },
    ]);
  };

  const handleEditSkills = () => {
    Alert.prompt(
      'Editar Habilidades',
      'Agrega o edita tus habilidades separadas por comas:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Guardar',
          onPress: (text) =>
            setSkills(text ? text.split(',').map((skill) => skill.trim()) : skills),
        },
      ]
    );
  };

  const handleSaveChanges = () => {
    Alert.alert('Cambios guardados', 'Tu perfil ha sido actualizado con éxito.');
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        backgroundImage="https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png"
        profileImage="https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png"
        userName="Alex Rodríguez"
        performanceScore="4.7"
        certificatesCount="3"
        onEditProfile={() => Alert.alert('Editar Avatar', 'Funcionalidad para editar el avatar.')}
        onViewCertificates={() => Alert.alert('Certificados', 'Redirigiendo a certificados...')}
      />

      {/* Acerca de mí */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Acerca de mí</Text>
          <TouchableOpacity onPress={handleEditAboutMe}>
            <Ionicons name="pencil" size={16} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionContent}>{aboutMe}</Text>
      </View>

      {/* Soy bueno en */}
      <View style={styles.row}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Soy bueno en</Text>
            <TouchableOpacity onPress={handleEditGoodAt}>
              <Ionicons name="pencil" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardContent}>{goodAt}</Text>
        </View>

        {/* Mis Habilidades */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Mis Habilidades</Text>
            <TouchableOpacity onPress={handleEditSkills}>
              <Ionicons name="pencil" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.cardContent}>{skills.join('\n')}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3a3a3a',
  },
  sectionContent: {
    textAlign: 'center',
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#e6f0f9',
    borderRadius: 10,
    padding: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContent: {
    fontSize: 12,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});