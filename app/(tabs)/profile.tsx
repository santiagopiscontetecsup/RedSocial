import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProfileHeader from '@/components/ui/ProfileHeader';
import InfoCard from '@/components/ui/InfoCard';
import CompletedChallenges from '@/components/ui/CompletedChallenges';
import CustomButton from '@/components/ui/CustomButton';

const ProfileScreen = () => {
  const handleEditProfile = () => console.log('Edit profile picture');
  const handleViewCertificates = () => console.log('View certificates');
  const handleViewPerformance = () => console.log('View performance');
  const handleViewProjects = () => console.log('View all projects');

  const challenges = [
    { id: 1, title: 'Proyecto 1', date: '17/01/2025', organization: 'Tecsup', rating: 5 },
    { id: 2, title: 'Proyecto 2', date: '18/01/2025', organization: 'Tecsup', rating: 4 },
  ];

  const renderContent = () => (
    <View>
      <ProfileHeader
        name="Alex Rodríguez"
        email="alex@creativetech.com"
        profilePicture="https://via.placeholder.com/100"
        onEditProfile={handleEditProfile}
        onViewPerformance={handleViewPerformance}
        onViewCertificates={handleViewCertificates}
      />
      <InfoCard title="Acerca de" content="Soy Diseñador UX/UI..." onEdit={() => console.log('Edit Acerca de')} />
      <InfoCard title="Soy bueno en" content="Identificar problemas..." onEdit={() => console.log('Edit Soy bueno en')} />
      <InfoCard title="Mis habilidades" content="Diseño UX/UI..." onEdit={() => console.log('Edit Mis habilidades')} />
      <CompletedChallenges challenges={challenges} />
      <CustomButton title="Ver proyectos" onPress={handleViewProjects} />
    </View>
  );

  return (
    <FlatList
      data={[{ key: 'content' }]} // Usamos un solo elemento para renderizar todo el contenido
      renderItem={renderContent}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;