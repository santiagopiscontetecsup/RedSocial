import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useProjectContext } from '@/context/ProjectContext';
import projects from '../../data/projects'; // Importar proyectos

type Project = typeof projects[0]; // Definir el tipo Project basándonos en la estructura de tu data

export default function MisProyectosScreen() {
  const { proyectosPostulados } = useProjectContext();

  // Función para renderizar cada proyecto
  const renderProyecto = (proyecto: Project) => (
    <View style={styles.card} key={proyecto.id}>
      <Text style={styles.title}>{proyecto.title}</Text>
      <Text style={styles.estado}>
        Estado: {proyecto.status === 'pendiente' ? '⏳ Pendiente' : '✅ Completado'}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🟡 Mis Proyectos Postulados</Text>
      <FlatList
        data={proyectosPostulados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderProyecto(item)}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  estado: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
