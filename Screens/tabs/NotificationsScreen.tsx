import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { obtenerNotificaciones } from '@/services/notificaciones/mostrarNotificaciones';
import { traerProyectos, Proyecto } from '@/services/proyectos/traerproyectos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStudentIdFromToken } from '@/services/login/tokenService';

export default function NotificationsScreen() {
  const [notificaciones, setNotificaciones] = useState<any[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animación de desvanecimiento
  const fadeAnim = useSharedValue(1);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No se encontró el token');

        const idEstudiante = getStudentIdFromToken(token);
        if (!idEstudiante) throw new Error('No se pudo obtener el ID del estudiante');

        const dataNotificaciones = await obtenerNotificaciones(parseInt(idEstudiante));
        const dataProyectos = await traerProyectos();
        setProyectos(dataProyectos);

        // Mapea las notificaciones para incluir el nombre del proyecto
        const formattedData = dataNotificaciones.map((notificacion) => {
          const proyectoRelacionado = dataProyectos.find(
            (proyecto) => proyecto.id === notificacion.idProyecto
          );

          return {
            id: notificacion.id,
            name: proyectoRelacionado ? proyectoRelacionado.nombre : 'Proyecto desconocido',
            message: notificacion.mensaje,
            time: new Date(notificacion.fechaEnvio).toLocaleString(),
            habilidades: proyectoRelacionado
              ? proyectoRelacionado.habilidades.map((h) => h.nombre).join(', ')
              : 'No especificadas',
            fechaLimite: proyectoRelacionado
              ? new Date(proyectoRelacionado.fechaLimite).toLocaleDateString()
              : 'Sin fecha límite',
          };
        });

        setNotificaciones(formattedData);
      } catch (err: any) {
        console.error('Error al obtener las notificaciones:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificaciones();
  }, []);

  // Estilo animado para el mensaje de "sin notificaciones"
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(fadeAnim.value, { duration: 1000 }),
  }));

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando notificaciones...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (notificaciones.length === 0) {
    // Inicia la animación de desvanecimiento
    fadeAnim.value = 1;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.emptyContainer, animatedStyle]}>
          <Text style={styles.emptyText}>No tienes notificaciones disponibles.</Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Notificaciones</Text>
      <FlatList
        data={notificaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.message}>{item.message}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.habilidades}>Habilidades: {item.habilidades}</Text>
              <Text style={styles.fechaLimite}>Fecha Límite: {item.fechaLimite}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 24,
    textAlign: 'center',
    color: '#333',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a2a2a',
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  habilidades: {
    fontSize: 12,
    color: '#6c63ff',
    marginBottom: 4,
  },
  fechaLimite: {
    fontSize: 12,
    color: '#e91e63',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
  },
});