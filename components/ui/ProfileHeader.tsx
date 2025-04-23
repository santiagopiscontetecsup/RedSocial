import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';


type ProfileHeaderProps = {
  name: string;
  email: string;
  profilePicture: string;
  onEditProfile: () => void;
  onViewPerformance: () => void;
  onViewCertificates: () => void;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  email,
  profilePicture,
  onEditProfile,
  onViewPerformance,
  onViewCertificates,
}) => (
  <View style={styles.headerContainer}>
    <View style={styles.profilePictureContainer}>
      <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      <TouchableOpacity style={styles.editIcon} onPress={onEditProfile}>
        <Ionicons name="pencil" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.email}>{email}</Text>
    <View style={styles.headerButtons}>
      <TouchableOpacity style={styles.circleButton} onPress={onViewPerformance}>
        <Text style={styles.circleButtonText}>4.7</Text>
        <Text style={styles.circleButtonSubtitle}>Rendimiento</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.circleButton} onPress={onViewCertificates}>
        <Text style={styles.circleButtonText}>3</Text>
        <Text style={styles.circleButtonSubtitle}>Certificados</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePictureContainer: {
    position: 'relative',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.lightGray,
  },
  circleButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  circleButtonSubtitle: {
    fontSize: 12,
    color: Colors.gray,
  },
});

export default ProfileHeader;