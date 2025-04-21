// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>Logoipsum</Text>
        </View>

        <View style={styles.profileSection}>
          <Icon name="person-circle-outline" size={24} color="#000" />
          <Text style={styles.profileText}>Mi Cuenta</Text>
        </View>

        <MenuItem icon="notifications-outline" text="Notificaciones" badge="24" />
        <MenuItem icon="folder-outline" text="Mis Proyectos" />
        <MenuItem icon="people-outline" text="Postulantes" />
        <Divider />
        <MenuItem icon="search-outline" text="Publicar Retos" />
        <Divider />
        <MenuItem icon="settings-outline" text="Ajustes" />
        <MenuItem icon="power-outline" text="Cerrar Sesión" />
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ icon, text, badge }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Icon name={icon} size={20} color="#555" />
    <Text style={styles.menuText}>{text}</Text>
    {badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
  </TouchableOpacity>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    backgroundColor: '#D6E8E7',
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#555',
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 'auto',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
});

export default HomeScreen;
