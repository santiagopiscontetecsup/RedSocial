// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Colors from '@/constants/Colors';
// import { router } from 'expo-router';


// type ProfileHeaderProps = {
//   name: string;
//   email: string;
//   profilePicture: string;
//   onEditProfile: () => void;
//   onViewPerformance: () => void;
//   onViewCertificates: () => void;
// };

// const ProfileHeader: React.FC<ProfileHeaderProps> = ({
//   name,
//   email,
//   profilePicture,
//   onEditProfile,
//   onViewPerformance,
//   onViewCertificates,
// }) => (
//   <View style={styles.headerContainer}>
//     <View style={styles.profilePictureContainer}>
//       <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
//       <TouchableOpacity style={styles.editIcon} onPress={onEditProfile}>
//         <Ionicons name="pencil" size={16} color="#fff" />
//       </TouchableOpacity>
//     </View>
//     <Text style={styles.name}>{name}</Text>
//     <Text style={styles.email}>{email}</Text>
//     <View style={styles.headerButtons}>
//       <TouchableOpacity style={styles.circleButton} onPress={onViewPerformance}>
//         <Text style={styles.circleButtonText}>4.7</Text>
//         <Text style={styles.circleButtonSubtitle}>Rendimiento</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.circleButton} onPress={() => router.push('/student/certificates')}>
//         <Text style={styles.circleButtonText}>3</Text>
//         <Text style={styles.circleButtonSubtitle}>Certificados</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   headerContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   profilePictureContainer: {
//     position: 'relative',
//   },
//   profilePicture: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
//   editIcon: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: Colors.primary,
//     borderRadius: 12,
//     padding: 4,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   email: {
//     fontSize: 14,
//     color: Colors.gray,
//     marginBottom: 16,
//   },
//   headerButtons: {
//     flexDirection: 'row',
//     gap: 16,
//   },
//   circleButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: Colors.lightGray,
//   },
//   circleButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: Colors.primary,
//   },
//   circleButtonSubtitle: {
//     fontSize: 12,
//     color: Colors.gray,
//   },
// });

// export default ProfileHeader;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type ProfileHeaderProps = {
  backgroundImage: string;
  profileImage: string;
  userName: string;
  performanceScore: string;
  certificatesCount: string;
  onEditProfile: () => void;
  onViewCertificates: () => void;
};

export default function ProfileHeader({
  backgroundImage,
  profileImage,
  userName,
  performanceScore,
  certificatesCount,
  onEditProfile,
  onViewCertificates,
}: ProfileHeaderProps) {
  return (
    <View>
      {/* Header con imagen de fondo */}
      <View style={styles.headerImageContainer}>
        <Image source={{ uri: backgroundImage }} style={styles.headerImage} />
        <View style={styles.avatarContainer}>
          {/* Tarjetas circulares */}
          <View style={styles.circleCardLeft}>
            <Text style={styles.circleCardText}>{performanceScore}</Text>
            <Text style={styles.circleCardSubtitle}>Rendimiento</Text>
          </View>
          <Image source={{ uri: profileImage }} style={styles.avatar} />
          <TouchableOpacity style={styles.editAvatarButton} onPress={onEditProfile}>
            <Text style={styles.editAvatarText}>✎</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleCardRight} onPress={onViewCertificates}>
            <Text style={styles.circleCardText}>{certificatesCount}</Text>
            <Text style={styles.circleCardSubtitle}>Certificados</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nombre */}
      <Text style={styles.userName}>{userName}</Text>
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
    gap: 30, // separa las tarjetas del avatar
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