import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { obtenerNotificaciones, Notificacion } from '@/services/notificaciones/mostrarNotificaciones';
import { traerProyectos, Proyecto } from '@/services/proyectos/traerproyectos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStudentIdFromToken } from '@/services/login/tokenService';

export default function NotificationsScreen() {
  const [notificaciones, setNotificaciones] = useState<any[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [estadoNotificacion, setEstadoNotificacion] = useState<string | null>(null);
  const [loadingEstado, setLoadingEstado] = useState(false);

  // Animación de desvanecimiento
  const fadeAnim = useSharedValue(1);

  const fetchNotificaciones = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No se encontró el token');
    const idEstudiante = getStudentIdFromToken(token);
    if (!idEstudiante) throw new Error('No se pudo obtener el ID del estudiante');

    const dataNotificaciones: Notificacion[] = await obtenerNotificaciones(parseInt(idEstudiante));
    const dataProyectos = await traerProyectos();
    setProyectos(dataProyectos);

    // Solo mostrar en la lista principal las notificaciones de tipo "nueva_solicitud"
    const solicitudes = dataNotificaciones.filter(n => n.tipoMensaje === 'nueva_solicitud');

    const formattedData = solicitudes.map((notificacion) => {
      const proyectoRelacionado = dataProyectos.find(
        (proyecto) => proyecto.id === notificacion.idProyecto
      );
      return {
        id: notificacion.id,
        idProyecto: notificacion.idProyecto,
        empresa: proyectoRelacionado ? proyectoRelacionado.empresa : 'Empresa desconocida',
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

    // Filtra para que solo quede una notificación por empresa (la más reciente)
    const uniqueByEmpresa = Object.values(
      formattedData.reduce((acc, curr) => {
        if (
          !acc[curr.empresa] ||
          new Date(curr.time).getTime() > new Date(acc[curr.empresa].time).getTime()
        ) {
          acc[curr.empresa] = curr;
        }
        return acc;
      }, {} as Record<string, any>)
    );

    setNotificaciones(formattedData);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchNotificaciones();
  }, [fetchNotificaciones]);

  // Estilo animado para el mensaje de "sin notificaciones"
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(fadeAnim.value, { duration: 1000 }),
  }));

  const handleNotificationPress = async (notification: any) => {
  setSelectedNotification(notification);
  setModalVisible(true);
  setLoadingEstado(true);
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('No se encontró el token');
    const idEstudiante = getStudentIdFromToken(token);
    if (!idEstudiante) throw new Error('No se pudo obtener el ID del estudiante');
    const notificacionesActualizadas: Notificacion[] = await obtenerNotificaciones(parseInt(idEstudiante));
    // Busca la notificación de aceptación/rechazo para el mismo proyecto
    const notiAceptada = notificacionesActualizadas.find(
      (n) =>
        n.idProyecto === notification.idProyecto &&
        n.tipoMensaje === 'Postulación' &&
        (n.mensaje.includes('Felicidades') || n.mensaje.toLowerCase().includes('rechazado'))
    );
    setEstadoNotificacion(notiAceptada?.mensaje || '⏳ Pendiente');
  } catch (e) {
    setEstadoNotificacion('⏳ Pendiente');
  } finally {
    setLoadingEstado(false);
  }
};

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
        <TouchableOpacity style={styles.refreshButton} onPress={fetchNotificaciones}>
          <Ionicons name="refresh" size={24} color="#6c63ff" />
        </TouchableOpacity>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (notificaciones.length === 0) {
    fadeAnim.value = 1;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchNotificaciones}>
          <Ionicons name="refresh" size={24} color="#6c63ff" />
        </TouchableOpacity>
        <Animated.View style={[styles.emptyContainer, animatedStyle]}>
          <Text style={styles.emptyText}>No tienes notificaciones disponibles.</Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>🔔 Notificaciones</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchNotificaciones}>
          <Ionicons name="refresh" size={24} color="#6c63ff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notificaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
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
          </TouchableOpacity>
        )}
      />

      {/* Modal para mostrar detalle de la notificación */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedNotification?.empresa}
            </Text>
            <Text style={styles.modalProject}>{selectedNotification?.name}</Text>
            <Text style={styles.modalMessage}>{selectedNotification?.message}</Text>
            {loadingEstado ? (
  <ActivityIndicator size="small" color="#6c63ff" style={{ marginVertical: 12 }} />
) : (
  <Text style={styles.modalEstado}>
    {estadoNotificacion}
  </Text>
)}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 24,
  },
  refreshButton: {
    padding: 6,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
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
    marginTop: 12,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6c63ff',
  },
  modalProject: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  modalMessage: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalEstado: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  closeButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
 closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});