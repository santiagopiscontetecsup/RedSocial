import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postularProyecto } from '@/services/proyectos/postulacionService';
import { getStudentIdFromToken } from '@/services/login/tokenService';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Proyecto } from '@/services/proyectos/traerproyectos';

type RootStackParamList = {
  DetalleReto: { proyecto: Proyecto };
};

type DetalleRetoRouteProp = RouteProp<RootStackParamList, 'DetalleReto'>;


const DetalleReto = () => {
  const route = useRoute<DetalleRetoRouteProp>();
  const project = route.params.proyecto;

  const [modalVisible, setModalVisible] = useState(false);
  const [resumenHabilidades, setResumenHabilidades] = useState('');
  const [idEstudiante, setIdEstudiante] = useState<string | null>(null);
  const [yaPostulado, setYaPostulado] = useState(false); // Estado para verificar si ya está postulado

  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const studentId = getStudentIdFromToken(token);
          setIdEstudiante(studentId);

          // Verifica si el estudiante ya está postulado al proyecto
          const postulantes = project.postulantes || []; // Asegúrate de que `postulantes` sea parte del objeto `project`
          const yaPostulado = postulantes.some(
            (postulante: any) => postulante.idEstudiante === studentId
          );
          setYaPostulado(yaPostulado);
        }
      } catch (error) {
        console.error('Error al obtener el ID del estudiante:', error);
      }
    };

    fetchStudentId();
  }, [project]);

  const handlePostularme = async () => {
    if (!resumenHabilidades || resumenHabilidades.trim().length < 10) {
      Alert.alert('Error', 'Por favor, escribe al menos 10 caracteres sobre tus habilidades.');
      return;
    }

    if (!idEstudiante) {
      Alert.alert('Error', 'No se pudo obtener el ID del estudiante. Intenta nuevamente.');
      return;
    }

    try {
      const body = {
        idEstudiante: parseInt(idEstudiante),
        idProyecto: project.id,
        resumenHabilidades: resumenHabilidades.trim(),
      };

      await postularProyecto(body);
      Alert.alert('Éxito', 'Postulación enviada correctamente.');
      setModalVisible(false);
      setResumenHabilidades('');
      setYaPostulado(true); // Actualiza el estado a "postulado"
    }  catch (err: any) {
      console.error('Error al postularse:', err);

      if (err.message === 'Ya te has postulado a este proyecto.') {
        Alert.alert(
          'Ya estás postulado',
          'Ya has postulado a este proyecto. Espera una respuesta por parte de la empresa.'
        );
        setYaPostulado(true);
      } else {
        Alert.alert('Error', err.message || 'No se pudo enviar la postulación. Intenta nuevamente.');
      }
    }
  };

  if (!project) return <Text>Proyecto no encontrado</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.company}>
          <MaterialIcons name="business" size={18} color="#6c63ff" /> {project.empresa || 'Empresa no especificada'}
        </Text>
        <Text style={styles.title}>{project.nombre}</Text>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.detailItem}>
          <Entypo name="calendar" size={20} color="#e91e63" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Fecha límite</Text>
            <Text style={styles.detailValue}>
              {new Date(project.fechaLimite).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <FontAwesome name="gift" size={20} color="#4CAF50" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Recompensa</Text>
            <Text style={styles.detailValue}>{project.tipoRecompensa}</Text>
          </View>
        </View>
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.sectionTitle}>Descripción del proyecto</Text>
        <Text style={styles.paragraph}>{project.descripcion}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, yaPostulado && styles.buttonDisabled]}
        onPress={() => !yaPostulado && setModalVisible(true)}
        disabled={yaPostulado}
      >
        <Text style={styles.buttonText}>
          {yaPostulado ? '✅ Ya te postulaste' : 'Postularme ahora'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📝 Postulación</Text>
            <Text style={styles.modalSubtitle}>
              Describe cómo tus habilidades coinciden con este proyecto:
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Tengo experiencia desarrollando aplicaciones móviles con React Native y manejo de APIs..."
              placeholderTextColor="#888"
              value={resumenHabilidades}
              onChangeText={setResumenHabilidades}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handlePostularme}
              >
                <Text style={styles.submitButtonText}>Enviar postulación</Text>
                <MaterialIcons name="send" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 24,
    paddingTop: 48, // Agrega un margen superior amplio
  },
  header: {
    marginBottom: 24,
  },
  company: {
    fontSize: 16,
    color: '#6c63ff',
    fontWeight: '600',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2a2a2a',
    lineHeight: 34,
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: '#f0f2ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  skillText: {
    color: '#6c63ff',
    fontSize: 12,
    fontWeight: '600',
  },
  noSkills: {
    color: '#888',
    fontStyle: 'italic',
  },
  descriptionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2a2a2a',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  button: {
    backgroundColor: '#6c63ff',
    padding: 18,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#6c63ff',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2a2a2a',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 16,
    padding: 16,
    minHeight: 140,
    fontSize: 15,
    color: '#444',
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#eee',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#6c63ff',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default DetalleReto;




