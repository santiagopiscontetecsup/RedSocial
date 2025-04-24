import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header con imagen de fondo */}
      <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: 'https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png' }}
          style={styles.headerImage}
        />
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Text style={styles.editAvatarText}>✎</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nombre */}
      <Text style={styles.companyName}>PixelForge Studio</Text>

      {/* Descripción */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.sectionContent}>
          En PixelForge Studio creamos experiencias visuales impactantes para marcas que desean destacar.
          Colaboramos con talento emergente en proyectos reales de branding, UI/UX y desarrollo web.
        </Text>
      </View>

      {/* Industria y redes */}
      <View style={styles.tagsRow}>
        <View style={styles.tagBox}>
          <Text style={styles.tagTitle}>Industria</Text>
          <Text style={styles.tagContent}>Diseño digital y desarrollo de productos interactivos</Text>
        </View>
        <View style={styles.tagBox}>
          <Text style={styles.tagTitle}>Redes</Text>
          <Text style={styles.tagContent}>
            Correo: hola@pixelforge.studio{'\n'}
            Web: www.pixelforge.studio{'\n'}
            Redes: @pixelforge.studio (Instagram y LinkedIn)
          </Text>
        </View>
      </View>

      {/* Botón para publicar retos */}
      <TouchableOpacity style={styles.publishButton} onPress={() => router.push('/student/projects')}>
        <Text style={styles.publishButtonText}>Ver Proyectos</Text>
      </TouchableOpacity>

      {/* Lista de retos */}
      <View style={styles.challengeCard}>
        <Text style={styles.challengeTitle}>Web Scraping</Text>
        <Text style={styles.challengeDate}>Límite de postulación: 10 de abril de 2025</Text>
        <Text style={styles.challengeDate}>Límite de entrega: 10 de mayo de 2025</Text>
      </View>

      <View style={styles.challengeCard}>
        <Text style={styles.challengeTitle}>Rediseño de Plataforma de Reservas</Text>
        <Text style={styles.challengeDate}>Límite de postulación: 10 de abril de 2025</Text>
        <Text style={styles.challengeDate}>Límite de entrega: 10 de mayo de 2025</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 150,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    left: '50%',
    transform: [{ translateX: -50 }],
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#0a84ff',
    borderRadius: 12,
    padding: 4,
  },
  editAvatarText: {
    color: '#fff',
    fontSize: 12,
  },
  companyName: {
    marginTop: 48,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3a3a3a',
    marginBottom: 6,
    textAlign: 'center',
  },
  sectionContent: {
    textAlign: 'center',
    color: '#555',
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  tagBox: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#e6f0f9',
    borderRadius: 10,
    padding: 10,
  },
  tagTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  tagContent: {
    fontSize: 12,
    textAlign: 'center',
  },
  publishButton: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: '#2c5fb8',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  publishButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  challengeCard: {
    backgroundColor: '#d0e3f0',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  challengeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#003366',
    marginBottom: 6,
  },
  challengeDate: {
    fontSize: 13,
    color: '#333',
  },
});