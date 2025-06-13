import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '@/navigation/types'; // Asegúrate de importar bien esto

import ProfileHeader from '@/components/ui/ProfileHeader';
import ProfileDetails from '@/components/ui/ProfileDetails';
import Colors from '@/constants/Colors';

export default function EditProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [avatar, setAvatar] = useState(
    'https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png'
  );
  const [aboutMe, setAboutMe] = useState(
    'Soy Diseñador UX/UI con experiencia en la creación de interfaces intuitivas y soluciones innovadoras.'
  );
  const [goodAt, setGoodAt] = useState(
    'Identificar problemas de usabilidad y transformarlos en soluciones visuales claras y funcionales.'
  );
  const [skills, setSkills] = useState([
    'Diseño UX/UI',
    'Prototipado en Figma',
    'Investigación de usuarios',
    'Manejo básico React Native por el lado del FrontEnd',
  ]);

  const handleEditProfileImage = (newImage: string) => {
    setAvatar(newImage);
  };

  const handleSaveChanges = () => {
    Alert.alert('Cambios guardados', 'Tu perfil ha sido actualizado con éxito.');
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        backgroundImage="https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png"
        profileImage={avatar}
        userName="Alex Rodríguez"
        performanceScore="4.7"
        certificatesCount="3"
        isEditable={true}
        onEditProfile={handleEditProfileImage}
        onViewCertificates={() => navigation.navigate('Certificates')}
        onEditInfo={() => navigation.navigate('EditInfo')}
      />

      <ProfileDetails
        aboutMe={aboutMe}
        goodAt={goodAt}
        skills={skills}
        isEditable={true}
      />

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
