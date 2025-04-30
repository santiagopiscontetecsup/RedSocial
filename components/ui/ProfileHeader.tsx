import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/Colors'; // Importa Colors

type ProfileHeaderProps = {
  backgroundImage: string;
  profileImage: string;
  userName: string;
  performanceScore: string;
  certificatesCount: string;
  isEditable?: boolean;
  onEditProfile?: (newImage: string) => void;
  onViewCertificates: () => void;
  onEditInfo?: () => void; // Nueva propiedad para manejar la navegación al editar información
};

export default function ProfileHeader({
  backgroundImage,
  profileImage,
  userName,
  performanceScore,
  certificatesCount,
  isEditable = false,
  onEditProfile,
  onViewCertificates,
  onEditInfo, // Recibe la función para manejar la navegación
}: ProfileHeaderProps) {
  const [avatar, setAvatar] = useState(profileImage);

  const handleEditAvatar = async () => {
    if (!onEditProfile) return;

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para cambiar el avatar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setAvatar(selectedImage);
      onEditProfile(selectedImage);
    }
  };

  return (
    <View>
      <View style={styles.headerImageContainer}>
        <Image source={{ uri: backgroundImage }} style={styles.headerImage} />
        <View style={styles.avatarContainer}>
          <View style={styles.circleCardLeft}>
            <Text style={styles.circleCardText}>{performanceScore}</Text>
            <Text style={styles.circleCardSubtitle}>Rendimiento</Text>
          </View>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          {isEditable && (
            <TouchableOpacity style={styles.editAvatarButton} onPress={handleEditAvatar}>
              <Text style={styles.editAvatarText}>✎</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.circleCardRight} onPress={onViewCertificates}>
            <Text style={styles.circleCardText}>{certificatesCount}</Text>
            <Text style={styles.circleCardSubtitle}>Certificados</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Nombre interactivo */}
      <TouchableOpacity onPress={onEditInfo}>
        <Text style={styles.userName}>{userName}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 150,
  },
  avatarContainer: {
    marginTop: -40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: 25 }],
    backgroundColor: '#0a84ff',
    borderRadius: 12,
    padding: 4,
    zIndex: 1,
  },
  editAvatarText: {
    color: '#fff',
    fontSize: 12,
  },
  userName: {
    marginTop: 48,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary, // Color destacado para el nombre
  },
  circleCardLeft: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  circleCardRight: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  circleCardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  circleCardSubtitle: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});