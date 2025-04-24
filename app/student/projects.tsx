import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ProfileHeader from '@/components/ui/ProfileHeader';

const projects = [
  {
    id: 1,
    title: 'Diseño de App Móvil para E-commerce',
    date: '17/01/2025',
    rating: 5,
  },
  {
    id: 2,
    title: 'Diseño de App Móvil para E-commerce',
    date: '17/01/2025',
    rating: 5,
  },
  {
    id: 3,
    title: 'Diseño de App Móvil para E-commerce',
    date: '17/01/2025',
    rating: 5,
  },
  {
    id: 4,
    title: 'Diseño de App Móvil para E-commerce',
    date: '17/01/2025',
    rating: 5,
  },
];

const handleEditProfile = () => console.log('Edit profile picture');
const handleViewCertificates = () => console.log('View certificates');
const handleViewPerformance = () => console.log('View performance');

export default function ProjectsScreen() {
  const renderProject = ({ item }: { item: typeof projects[0] }) => (
    <View style={styles.projectCard}>
      <Text style={styles.projectDate}>{item.date}</Text>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <View style={styles.projectRating}>
        {[...Array(item.rating)].map((_, index) => (
          <Ionicons key={index} name="star" size={16} color={Colors.primary} />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Componente perfil */}
      <ProfileHeader
        name="Alex Rodríguez"
        email="alex@creativetech.com"
        profilePicture="https://via.placeholder.com/100"
        onEditProfile={handleEditProfile}
        onViewPerformance={handleViewPerformance}
        onViewCertificates={handleViewCertificates}
      />

      {/* total de poryecto titulo */}
      <Text style={styles.header}>Total de Proyectos: {projects.length}</Text>

      {/* lista de proyectos */}
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    gap: 12,
  },
  projectCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
  },
  projectDate: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectRating: {
    flexDirection: 'row',
  },
});