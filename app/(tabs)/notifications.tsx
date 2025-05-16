import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useProjectContext } from '@/context/ProjectContext';
import Colors from '@/constants/Colors';
import AnimatedSearchBar from '@/components/ui/AnimatedSearchBar';

export default function NotificationsScreen() {
  const { notificaciones } = useProjectContext();

  const renderNotification = ({ item }: { item: typeof notificaciones[0] }) => (
    <View
      style={[
        styles.notificationCard,
        item.tipo === 'aceptado' ? styles.cardAceptado : styles.cardRechazado,
      ]}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.notificationContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.mensaje}</Text>
      </View>
      <View style={styles.notificationMeta}>
        <Text style={styles.time}>{item.time}</Text>
        {!item.leido && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100x40' }}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>🔔 Notificaciones</Text>

      <AnimatedSearchBar placeholder="Buscar notificaciones" value={''} onChangeText={function (text: string): void {
        throw new Error('Function not implemented.');
      } } />

      {notificaciones.length === 0 ? (
        <Text style={styles.empty}>No tienes notificaciones aún</Text>
      ) : (
        <FlatList
          data={notificaciones}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
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
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  cardAceptado: {
    backgroundColor: '#d1e7dd',
  },
  cardRechazado: {
    backgroundColor: '#f8d7da',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 12,
    color: Colors.gray,
  },
  notificationMeta: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 4,
  },
  badge: {
    backgroundColor: Colors.error,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
});