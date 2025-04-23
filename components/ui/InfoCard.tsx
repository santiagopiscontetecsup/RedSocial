import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

// Definición de los tipos de las props
type InfoCardProps = {
  title: string;
  content: string;
  onEdit: () => void;
};

const InfoCard: React.FC<InfoCardProps> = ({ title, content, onEdit }) => (
  <View style={styles.infoCard}>
    <View style={styles.infoCardHeader}>
      <Text style={styles.infoCardTitle}>{title}</Text>
      <TouchableOpacity onPress={onEdit}>
        <Ionicons name="pencil" size={16} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.infoCardContent}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCardContent: {
    fontSize: 14,
    color: Colors.gray,
  },
});

export default InfoCard;