import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '@/components/ui/SearchBar';
import Card from '@/components/ui/Card';

export default function HomeScreen() {
  const projects = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: 'Web Scraping',
      description:
        'Buscamos un especialista en web scraping para extraer datos de sitios web. El candidato ideal debe tener experiencia en Python y herramientas como Beautiful Soup o Scrapy.',
      deadline: '20/08',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'Web Application',
      description:
        'Estamos buscando desarrollar una aplicación web que mejore nuestra eficiencia operativa y la experiencia del cliente.',
      deadline: '20/08',
    },
  ];

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