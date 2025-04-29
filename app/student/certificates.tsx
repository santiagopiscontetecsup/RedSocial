import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Colors from '@/constants/Colors';
import ProfileHeader from '@/components/ui/ProfileHeader';
import certificates from '@/data/certificates'


const handleEditProfile = () => console.log('Edit profile picture');
const handleViewCertificates = () => console.log('View certificates');
const handleViewPerformance = () => console.log('View performance');


export default function CertificatesScreen() {
  const renderCertificate = ({ item }: { item: typeof certificates[0] }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.organization}>{item.organization}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ProfileHeader
              name="Alex Rodríguez"
              email="alex@creativetech.com"
              profilePicture="https://via.placeholder.com/100"
              onEditProfile={handleEditProfile}
              onViewPerformance={handleViewPerformance}
              onViewCertificates={handleViewCertificates}
            />
      <Text style={styles.header}>Mis Certificados</Text>
      <FlatList
        data={certificates}
        renderItem={renderCertificate}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    gap: 16,
  },
  card: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.gray,
    marginBottom: 8,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  organization: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: Colors.gray,
  },
});