import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import ProfileHeader from '@/components/ui/ProfileHeader';
import ButtonStyle2 from '@/components/ui/ButtonStyle2';
import ProfileDetails from '@/components/ui/ProfileDetails';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const aboutMe =
    'Soy Diseñador UX/UI con experiencia en la creación de interfaces intuitivas y soluciones innovadoras. Me apasiona desarrollar productos digitales centrados en la experiencia del usuario, asegurando que cada diseño sea funcional, atractivo y eficiente.';

  const goodAt =
    'Identificar problemas de usabilidad y transformarlos en soluciones visuales claras y funcionales. Me adapto rápido a nuevas herramientas y disfruto colaborar en equipos creativos.';

  const skills = [
    'Diseño UX/UI',
    'Prototipado en Figma',
    'Investigación de usuarios',
    'Manejo básico React Native por el lado del FrontEnd',
  ];

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        backgroundImage="https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png"
        profileImage="https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png"
        userName="Alex Rodríguez"
        performanceScore="4.7"
        certificatesCount="3"
        isEditable={false}
        onEditProfile={() => router.push('/student/editProfile')}
        onViewCertificates={() => router.push('/student/certificates')}
      />

      {/* Sección con AboutMe, GoodAt y Skills */}
      <ProfileDetails
        aboutMe={aboutMe}
        goodAt={goodAt}
        skills={skills}
        isEditable={false}
      />

      {/* Contenedor para los botones en la misma fila */}
      <View style={styles.buttonRow}>
        <ButtonStyle2
          title="Editar Perfil"
          onPress={() => router.push('/student/editProfile')}
        />
        <ButtonStyle2
          title="Ver Proyectos"
          onPress={() => router.push('/student/projects')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Espaciado uniforme entre los botones
    marginTop: 24,
  },
});