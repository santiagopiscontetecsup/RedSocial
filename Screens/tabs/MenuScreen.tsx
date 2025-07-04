import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerPerfilEstudiante } from '@/services/login/perfilService';

export default function MenuScreen() {
  const { logout } = useAuth();
  const navigation = useNavigation();

  const [userName, setUserName] = useState<string>('Usuario');

  useEffect(() => {
    const fetchUserName = async () => {
      const studentId = await AsyncStorage.getItem('studentId');
      if (studentId) {
        try {
          const perfil = await obtenerPerfilEstudiante(Number(studentId));
          setUserName(`${perfil.nombre} ${perfil.apellido}`);
        } catch (error) {
          setUserName('Usuario');
        }
      }
    };
    fetchUserName();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleGoToCertificates = () => {
    navigation.navigate('Main', { screen: 'Certificates' });
  };

  const handleGoToEvaluations = () => {
    navigation.navigate('Main', { screen: 'Evaluaciones' });
  };

  return (
    <View style={styles.container}>
      {/* Header con imagen más grande y centrada */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://classic.battle.net/war3/images/neutral/units/portraits/pandarenbrewmaster.gif',
          }}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Bienvenido, {userName}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handleGoToCertificates}>
          <Ionicons name="ribbon-outline" size={22} color={Colors.gray} />
          <Text style={styles.menuText}>Mis Certificados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="search-outline" size={22} color={Colors.gray} />
          <Text style={styles.menuText}>Buscar Retos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleGoToEvaluations}>
          <Ionicons name="settings-outline" size={22} color={Colors.gray} />
          <Text style={styles.menuText}>Mis Evaluaciones</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={Colors.gray} />
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // 👈 lo hace circular como un avatar
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuText: {
    marginLeft: 14,
    fontSize: 16,
    color: Colors.gray,
    flex: 1,
  },
});
