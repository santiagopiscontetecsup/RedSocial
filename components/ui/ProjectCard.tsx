import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

type ProjectCardProps = {
  image: ImageSourcePropType;
  title: string;
  date: string;
  rating: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, date, rating }) => {
  return (
    <View style={styles.card}>
      {/* Imagen de fondo */}
      <Image source={image} style={styles.backgroundImage} />

      {/* Contenido del card */}
      <View style={styles.content}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rating}>
          {[...Array(rating)].map((_, index) => (
            <Ionicons key={index} name="star" size={16} color="#FFD700" /> // Estrellas amarillas
          ))}
        </View>
      </View>
    </View>
  );
};

export default ProjectCard;

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
  },
  backgroundImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  date: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.primary,
  },
  rating: {
    flexDirection: 'row',
  },
});