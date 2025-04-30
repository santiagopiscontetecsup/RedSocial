import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext'; // Importar el contexto de autenticación
import { useRouter } from 'expo-router';


export default function MenuScreen() {
  const { logout } = useAuth(); // Obtener la función de logout del contexto
  const router = useRouter(); // Importar el enrutador de Expo Router

  const handleLogout = async () => {
    await logout(); // Llamar a la función de logout
  };

  const handleGoToProfile = () =>{
    router.push('/profile'); // te manda a la pantalla de perfil
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your logo URL
          style={styles.logo}
        />
      </View>

      <View style={styles.divider} />

      {/* User Account Section */}
      <TouchableOpacity style={styles.menuItem} onPress={handleGoToProfile}>
        <Ionicons name="person-circle" size={24} color={Colors.gray} />
        <Text style={styles.accountText}>Mi Cuenta</Text>
      </TouchableOpacity>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={20} color={Colors.gray} />
          <Text style={styles.menuText}>Notificaciones</Text>
          <Text style={styles.badge}>24</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}
          onPress={() => router.push('/student/mis-proyectos')}
        >
          <Ionicons name="folder-outline" size={20} color={Colors.gray} />
          <Text style={styles.menuText}>Mis Proyectos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="ribbon-outline" size={20} color={Colors.gray} />
          <Text style={styles.menuText}>Mis Certificados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="search-outline" size={20} color={Colors.gray} />
          <Text style={styles.menuText}>Buscar Retos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={20} color={Colors.gray} />
          <Text style={styles.menuText}>Ajustes</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.gray} />
          <Text style={styles.menuText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  accountText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gray,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: Colors.gray,
    flex: 1,
  },
  badge: {
    backgroundColor: Colors.primary,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 12,
  },
});