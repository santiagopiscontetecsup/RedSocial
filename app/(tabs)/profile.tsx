import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProfileHeader from '@/components/ui/ProfileHeader';
import ButtonStyle2 from '@/components/ui/ButtonStyle2';
import AboutMe from '@/components/ui/AboutMe';
import GoodAt from '@/components/ui/GoodAt';
import Skills from '@/components/ui/Skills';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader
        backgroundImage="https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png"
        profileImage="https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png"
        userName="Alex Rodríguez"
        performanceScore="4.7"
        certificatesCount="3"
        onEditProfile={() => router.push('/student/editProfile')}
        onViewCertificates={() => router.push('/student/certificates')}
      />

      {/* Acerca de mí */}
      <AboutMe description="Soy Diseñador UX/UI con experiencia en la creación de interfaces intuitivas y soluciones innovadoras. Me apasiona desarrollar productos digitales centrados en la experiencia del usuario, asegurando que cada diseño sea funcional, atractivo y eficiente." />

      {/* Industria y redes */}
      <View style={styles.tagsRow}>
        <GoodAt content="Identificar problemas de usabilidad y transformarlos en soluciones visuales claras y funcionales. Me adapto rápido a nuevas herramientas y disfruto colaborar en equipos creativos." />
        <Skills skills={['Diseño UX/UI', 'Prototipado en Figma', 'Investigación de usuarios', 'Manejo básico React Native por el lado del FrontEnd']} />
      </View>

      {/* Botón para ver todos los proyectos */}
      <ButtonStyle2
        title="Ver Proyectos"
        onPress={() => router.push('/student/projects')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
});