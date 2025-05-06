import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import projects from '@/data/projects';
import { useProjectContext } from '@/context/ProjectContext';

export default function DetalleProyectoScreen() {
  const { id } = useLocalSearchParams();
  const { entregarProyecto } = useProjectContext();
  const projectId = id ? parseInt(id as string, 10) : NaN;

  const proyecto = projects.find(p => p.id === projectId);
  const [linkEntrega, setLinkEntrega] = useState('');

  if (!proyecto) return <Text style={styles.error}>Proyecto no encontrado</Text>;

  const handleEnviar = () => {
    if (!linkEntrega.trim()) {
      Alert.alert('Error', 'Por favor, ingresa un enlace.');
      return;
    }

    entregarProyecto(proyecto.id);
    Alert.alert('✅ Proyecto entregado', 'Tu entrega ha sido registrada.');
    setLinkEntrega('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{proyecto.title}</Text>
      <Text style={styles.text}>Ubicación: {proyecto.ubicacion}</Text>
      <Text style={styles.text}>Descripción: {proyecto.description}</Text>
      <Text style={styles.text}>Contrato: {proyecto.contrato}</Text>
      <Text style={styles.text}>Salario: {proyecto.salario}</Text>
      <Text style={styles.text}>Certificado: {proyecto.certificado ? 'Sí' : 'No'}</Text>

      <Text style={styles.inputLabel}>Enlace de entrega:</Text>
      <TextInput
        value={linkEntrega}
        onChangeText={setLinkEntrega}
        placeholder="https://..."
        style={styles.input}
      />
      <Button title="Entregar proyecto" onPress={handleEnviar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputLabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
  },
  error: {
    padding: 20,
    fontSize: 16,
    color: 'red',
  },
});
