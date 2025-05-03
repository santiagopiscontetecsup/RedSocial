import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProfileDetailsProps = {
  aboutMe: string;
  goodAt: string;
  skills: string[];
  isEditable?: boolean;
  onEditAboutMe?: () => void;
  onEditGoodAt?: () => void;
  onEditSkills?: () => void;
  
};

export default function ProfileDetails({ aboutMe, goodAt, skills, isEditable = false }: ProfileDetailsProps) {
  return (
    <View style={styles.container}>
      {/* About Me */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>Acerca de mí</Text>
          {isEditable && <Text style={styles.editIcon}>✎</Text>}
        </View>
        <Text style={styles.content}>{aboutMe}</Text>
      </View>

      {/* Row: GoodAt + Skills */}
      <View style={styles.row}>
        <View style={[styles.card, styles.cardLeft]}>
          <View style={styles.header}>
            <Text style={styles.title}>Soy bueno en</Text>
            {isEditable && <Text style={styles.editIcon}>✎</Text>}
          </View>
          <Text style={styles.content}>{goodAt}</Text>
        </View>

        <View style={[styles.card, styles.cardRight]}>
          <View style={styles.header}>
            <Text style={styles.title}>Mis Habilidades</Text>
            {isEditable && <Text style={styles.editIcon}>✎</Text>}
          </View>
          <Text style={styles.content}>{skills.join('\n')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#e6f0f9',
    borderRadius: 10,
    padding: 10,
  },
  cardLeft: {
    marginRight: 5,
  },
  cardRight: {
    marginLeft: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center', // Centra el contenido horizontalmente
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3a3a3a',
    textAlign: 'center', // Asegura que el texto esté centrado
  },
  content: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
  editIcon: {
    color: '#fff',
    fontSize: 12,
    backgroundColor: '#0a84ff',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8, // Agrega espacio entre el título y el ícono
  },
});