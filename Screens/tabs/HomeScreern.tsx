import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AnimatedSearchBar from '@/components/ui/AnimatedSearchBar';
import { traerProyectos, Proyecto } from '@/services/proyectos/traerproyectos';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetalleReto'>;


export default function HomeScreen() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [filteredProyectos, setFilteredProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<HomeScreenNavigationProp>();// Usa el enrutador de Expo Router

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const data = await traerProyectos();
        setProyectos(data);
        setFilteredProyectos(data);
      } catch (err) {
        setError('Error al cargar los proyectos');
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = proyectos.filter((proyecto) =>
      proyecto.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProyectos(filtered);
  };

  const renderProyecto = ({ item }: { item: Proyecto }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text style={styles.description}>{item.descripcion}</Text>
      <Text style={styles.date}>
        Fecha Límite: {new Date(item.fechaLimite).toLocaleDateString()}
      </Text>
      <Text style={styles.reward}>Recompensa: {item.tipoRecompensa}</Text>
      <Text style={styles.skills}>
        Habilidades: {item.habilidades.map((h) => h.nombre).join(', ')}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('DetalleReto', {
            proyecto: item, // se recomienda pasar solo lo necesario
          })
        }
      >
        <Text style={styles.buttonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando proyectos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedSearchBar
        placeholder="Buscar proyectos"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchBar}
      />
      <Text style={styles.subtitle}>Proyectos</Text>
      <FlatList
        data={filteredProyectos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProyecto}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  searchBar: {
    marginTop: 32, // Aumenta el espacio superior
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2e64e5',
    marginVertical: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  list: {
    paddingBottom: 100,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#6c63ff',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2a2a2a',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  date: {
    fontSize: 13,
    color: '#e91e63',
    fontWeight: '600',
    marginBottom: 8,
    backgroundColor: '#ffe5ee',
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  reward: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 10,
  },
  skills: {
    fontSize: 13,
    color: '#6c63ff',
    marginBottom: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6c63ff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#6c63ff',
    fontWeight: '700',
    fontSize: 14,
  },
});