// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';

// import { router } from 'expo-router';
// import AnimatedSearchBar from '@/components/ui/AnimatedSearchBar';
// import { traerProyectos, Proyecto } from '@/services/proyectos/traerproyectos';

// export default function HomeScreen() {
//   const [proyectos, setProyectos] = useState<Proyecto[]>([]);
//   const [filteredProyectos, setFilteredProyectos] = useState<Proyecto[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchProyectos = async () => {
//       try {
//         const data = await traerProyectos();
//         setProyectos(data);
//         setFilteredProyectos(data);
//       } catch (err) {
//         setError('Error al cargar los proyectos');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProyectos();
//   }, []);

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     const filtered = proyectos.filter((proyecto) =>
//       proyecto.nombre.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredProyectos(filtered);
//   };

//   const renderProyecto = ({ item }: { item: Proyecto }) => (
//     <View style={styles.card}>
//       <Text style={styles.title}>{item.nombre}</Text>
//       <Text style={styles.description}>{item.descripcion}</Text>
//       <Text style={styles.date}>
//         Fecha Límite: {new Date(item.fechaLimite).toLocaleDateString()}
//       </Text>
//       <Text style={styles.reward}>Recompensa: {item.tipoRecompensa}</Text>
//       <Text style={styles.skills}>
//         Habilidades: {item.habilidades.map((h) => h.nombre).join(', ')}
//       </Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() =>
//           router.replace({
//             pathname: '/student/DetalleReto',
//             params: {
//               id: item.id.toString(),
//               title: item.nombre,
//               description: item.descripcion,
//               deadline: item.fechaLimite,
//             },
//           })
//         }
//       >
//         <Text style={styles.buttonText}>Postular</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text>Cargando proyectos...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={{ color: 'red' }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <AnimatedSearchBar
//         placeholder="Buscar proyectos"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />
//       <Text style={styles.subtitle}>Buscador de proyectos Freelance</Text>
//       <FlatList
//         data={filteredProyectos}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderProyecto}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   subtitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginVertical: 16,
//   },
//   list: {
//     paddingBottom: 80,
//     gap: 12,
//   },
//   card: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 8,
//   },
//   date: {
//     fontSize: 12,
//     color: '#888',
//     marginBottom: 8,
//   },
//   reward: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   skills: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 12,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     paddingVertical: 8,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';
import AnimatedSearchBar from '@/components/ui/AnimatedSearchBar';
import { traerProyectos, Proyecto } from '@/services/proyectos/traerproyectos';

export default function HomeScreen() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [filteredProyectos, setFilteredProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter(); // Usa el enrutador de Expo Router

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
          router.push({
            pathname: '/student/DetalleReto',
            params: { proyecto: JSON.stringify(item) }, // Pasa el proyecto completo como parámetro
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
    marginTop: 8,
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