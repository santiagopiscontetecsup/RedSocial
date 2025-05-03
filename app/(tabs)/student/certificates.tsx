import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProfileHeader from '@/components/ui/ProfileHeader';
import Certificado from '@/components/ui/Certificado';
import certificates from '@/data/certificados';

export default function CertificatesScreen() {
  const renderCertificate = ({ item }: { item: typeof certificates[0] }) => (
    <Certificado
      title={item.title}
      organization={item.organization}
      image={require('@/assets/images/certificado.png')} // Usando la imagen local
      description={item.description}
    />
  );

  return (
    <View style={styles.container}>
      <ProfileHeader
        backgroundImage="https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png"
        profileImage="https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png"
        userName="Alex Rodríguez"
        performanceScore="4.7"
        certificatesCount={certificates.length.toString()}
        onEditProfile={() => console.log('Edit profile picture')}
        onViewCertificates={() => console.log('View certificates')}
      />
      <Text style={styles.header}>Mis Certificados</Text>
      <FlatList
        data={certificates}
        renderItem={renderCertificate}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 16,
    gap: 16,
  },
});