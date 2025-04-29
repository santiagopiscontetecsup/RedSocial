import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '@/components/ui/SearchBar';
import Card from '@/components/ui/Card';
import { router } from 'expo-router';
import projects from '../../data/projects';
export default function HomeScreen() {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <SearchBar placeholder="Search" />
      <Text style={styles.subtitle}>Buscador de proyectos Freelance</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {projects.map((project) => (
          <Card
            key={project.id}
            image={project.image}
            title={project.title}
            description={project.description}
            deadline={project.deadline}
            onPress={() => 
              router.push({
                pathname: '/student/DetalleReto',
                params: {
                  id: project.id,
                  title: project.title,
                  description: project.description,
                  deadline: project.deadline,
                },
                
              })
            }
          />
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  scrollContainer: {
    paddingBottom: 80, // Space for footer navigation
  },
});