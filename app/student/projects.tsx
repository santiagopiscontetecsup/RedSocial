import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { testProjects } from '@/data/user';

export default function ProjectsScreen() {
  const renderProject = ({ item }: { item: typeof testProjects[0] }) => (
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
          <TouchableOpacity style={styles.editAvatarButton}>
            <Text style={styles.editAvatarText}>✎</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.userName}>Alex Rodríguez</Text>
      <Text style={styles.sectionTitle}>Proyectos</Text>
      <FlatList
        data={testProjects}
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
  editAvatarText: {
    color: '#fff',
    fontSize: 12,
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