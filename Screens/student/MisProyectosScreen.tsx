import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList, Proyecto } from '@/navigation/types';
import { useProjectContext } from '@/context/ProjectContext';
 // Asegúrate que el tipo Proyecto esté definido correctamente

export default function MisProyectosScreen() {
  const { proyectosAceptados } = useProjectContext();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const pendientes = proyectosAceptados.filter(p => !p.entregado);
  const entregados = proyectosAceptados.filter(p => p.entregado);

  const renderItem = (item: Proyecto) => (
    <View style={styles.card} key={item.id}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.estado}>
        Estado de entrega: {item.entregado ? '📤 Entregado' : '🕓 Pendiente de entrega'}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DetalleReto', { proyecto: item })}
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  estado: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4B7BE5',
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
