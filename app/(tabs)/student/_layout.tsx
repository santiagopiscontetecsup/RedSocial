import { Stack } from 'expo-router';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

export default function StudentLayout() {
  const router = useRouter();


  return (
    <Stack
      screenOptions={{
        headerShown: true,
        presentation: 'card',
        animation: 'fade_from_bottom',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        header: ({ navigation, route, options }) => (
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  router.back();
                }
              }}
            >
      <Ionicons name="arrow-back" size={24} color={Colors.primary} />
    </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>{options.title}</Text>
            </View>
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="projects"
        options={{
          title: 'Proyectos',
        }}
      />
      <Stack.Screen
        name="editProfile"
        options={{
          title: 'Editar Perfil',
        }}
      />
      <Stack.Screen
        name="certificates"
        options={{
          title: 'Certificados',
        }}
      />
      <Stack.Screen
        name="EditInfo"
        options={{
          title: 'Editar Información',
        }}
      />
      <Stack.Screen
        name="evaluaciones"
        options={{
          title: 'Evaluaciones',
        }}
      />
      <Stack.Screen
        name="mis-proyectos"
        options={{
          title: 'Mis Proyectos',
        }}
      />
      <Stack.Screen
        name="DetalleReto"
        options={{
          title: 'Detalles del Reto',
        }}
      />
      <Stack.Screen
        name="buscar-id/[id]"
        options={{
          title: 'Buscar ID',
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingHorizontal: 16,
    height: 56,
    marginTop: 30,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});