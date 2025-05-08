import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useProjectContext } from '@/context/ProjectContext';
import { useRouter } from 'expo-router';

export default function MisProyectosScreen() {
  const { proyectosAceptados } = useProjectContext();
  const router = useRouter();

  const pendientes = proyectosAceptados.filter(p => !p.entregado);
  const entregados = proyectosAceptados.filter(p => p.entregado);

  const renderItem = (item: any) => (
    <View style={styles.card} key={item.id}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.estado}>
        Estado de entrega: {item.entregado ? '📤 Entregado' : '🕓 Pendiente de entrega'}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`/student/buscar-id/${item.id}`)}
      >
        <Text style={styles.buttonText}>Ver detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>📝 Mis Proyectos Aceptados</Text>
      <FlatList
        data={pendientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
        ListEmptyComponent={<Text>No tienes proyectos pendientes.</Text>}
      />

      {entregados.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>📤 Mis Proyectos Enviados</Text>
          <FlatList
            data={entregados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderItem(item)}
          />
        </>
      )}
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
