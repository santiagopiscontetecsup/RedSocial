import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { testProjects } from '@/data/user';
import ProjectCard from '@/components/ui/ProjectCard';

export default function ProjectsScreen() {
  const renderProject = ({ item }: { item: typeof testProjects[0] }) => (
    <View style={styles.projectWrapper}>
      <ProjectCard
        image={{ uri: 'https://adpmx.com/storage/2023/08/ficha_1920x1080-copiaiStock-1274417553-1-1024x576.jpg' }} // Imagen de fondo
        title={item.title}
        date={item.date}
        rating={item.rating}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: 'https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png' }}
          style={styles.headerImage}
        />
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png' }}
            style={styles.avatar}
          />
          
        </View>
      </View>

      <Text style={styles.userName}>Alex Rodríguez</Text>
      <Text style={styles.sectionTitle}>Proyectos</Text>
      <FlatList
        data={testProjects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        numColumns={2} // Configuración para mostrar 2 columnas
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 150,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    left: '50%',
    transform: [{ translateX: -50 }],
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 4,
  },
  userName: {
    marginTop: 48,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  projectWrapper: {
    flex: 1,
    margin: 8, // Espaciado entre los proyectos
  },
});