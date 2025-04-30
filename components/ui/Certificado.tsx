import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

type CertificadoProps = {
  title: string;
  organization: string;
  image: ImageSourcePropType; // Cambiado para aceptar imágenes locales y remotas
  description: string;
};

export default function Certificado({
  title,
  organization,
  image,
  description,
}: CertificadoProps) {
  return (
    <View style={styles.card}>
      {/* Insignia con el check */}
      <View style={styles.badge}>
        <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
      </View>

      {/* Imagen de fondo */}
      <Image source={image} style={styles.backgroundImage} />

      {/* Descripción en la parte superior */}
      <Text style={styles.description}>{description}</Text>

      {/* Título del certificado */}
      <Text style={styles.title}>{title}</Text>

      {/* Organización */}
      <Text style={styles.organization}>{organization}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    zIndex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  description: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 40,
    fontSize: 12,
    fontStyle: 'italic',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 8,
  },
  organization: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 8,
  },
});