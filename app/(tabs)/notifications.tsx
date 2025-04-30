// notificaciones.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useProjectContext } from '@/context/ProjectContext';

export default function NotificationsScreen() {
  const { notificaciones } = useProjectContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Notificaciones</Text>
      {notificaciones.length === 0 ? (
        <Text style={styles.empty}>No tienes notificaciones aún</Text>
      ) : (
        <FlatList
          data={notificaciones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                item.tipo === 'aceptado' ? styles.cardAceptado : styles.cardRechazado,
              ]}
            >
              <Text style={styles.mensaje}>{item.mensaje}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  empty: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardAceptado: {
    backgroundColor: '#d1e7dd',
  },
  cardRechazado: {
    backgroundColor: '#f8d7da',
  },
  mensaje: {
    fontSize: 15,
    color: '#333',
  },
});
