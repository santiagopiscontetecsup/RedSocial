import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import projects from '../../data/projects'; // Importación de proyectos sin el tipo Project
import { useProjectContext } from '@/context/ProjectContext';

const DetalleReto = () => {
  const { id } = useLocalSearchParams();
  const projectId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
  const project = projects.find(p => p.id === projectId); // Encontramos el proyecto por ID

  const { proyectosPostulados, postularAProyecto } = useProjectContext();

  // Verifica si ya está postulado
  const yaPostulado = proyectosPostulados.some((p) => p.id === projectId);

  const handlePostularme = () => {
    if (!project) return;

    if (yaPostulado) {
      Alert.alert(
        'Ya estás postulado',
        'Ya has postulado a este proyecto. Espera una respuesta por parte de la empresa.',
        [{ text: 'Aceptar' }]
      );
      return;
    }

    postularAProyecto(project);
    Alert.alert(
      '¡Postulación enviada!',
      'Tu postulación fue enviada a la empresa. Te notificaremos sobre el resultado.',
      [{ text: 'Aceptar' }]
    );
  };

  if (!project) return <Text>Proyecto no encontrado</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.company}>📍 Logopipsum</Text>
      <Text style={styles.title}>{project.title} – {project.ubicacion}</Text>

      <View style={styles.details}>
        <Text><Entypo name="location-pin" size={16} /> Ubicación: {project.ubicacion}</Text>
        <Text><FontAwesome name="money" size={16} /> Salario: {project.salario}</Text>
        <Text><MaterialIcons name="work" size={16} /> Tipo de contrato: {project.contrato}</Text>
        <Text>🕒 Publicado: {project.publicado}</Text>
        <Text>👥 Postulantes: {project.numero_participantes}</Text>
        {project.certificado && <Text>📜 Solo para estudiantes - Certificado</Text>}
      </View>

      <Text style={styles.sectionTitle}>Acerca del puesto:</Text>
      <Text style={styles.paragraph}>{project.description}</Text>

      <Text style={styles.sectionTitle}>Responsabilidades:</Text>
      {project.responsabilidades.map((r, i) => (
        <Text key={i}>• {r}</Text>
      ))}

      <Text style={styles.sectionTitle}>Tecnologías:</Text>
      <View style={styles.tags}>
        {project.tecnologias.map((tag) => (
          <Text key={tag} style={styles.tag}>{tag}</Text>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, yaPostulado && styles.buttonDisabled]}
        onPress={handlePostularme}
        disabled={yaPostulado}
      >
        <Text style={styles.buttonText}>
          {yaPostulado ? '✅ Postulado' : 'Postularme'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fefefe',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  company: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c63ff',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    marginBottom: 15,
    gap: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 14,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    gap: 8,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#2e64e5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DetalleReto;
