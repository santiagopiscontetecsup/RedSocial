import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

type Challenge = {
  id: number;
  title: string;
  date: string;
  organization: string;
  rating: number;
};

type CompletedChallengesProps = {
  challenges: Challenge[];
};

const CompletedChallenges: React.FC<CompletedChallengesProps> = ({ challenges }) => {
  const renderChallenge = ({ item }: { item: Challenge }) => (
    <View style={styles.challengeCard}>
      <Text style={styles.challengeDate}>{item.date}</Text>
      <Text style={styles.challengeTitle}>{item.title}</Text>
      <Text style={styles.challengeOrganization}>{item.organization}</Text>
      <View style={styles.challengeRating}>
        {[...Array(item.rating)].map((_, index) => (
          <Ionicons key={index} name="star" size={16} color={Colors.primary} />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.challengesContainer}>
      <Text style={styles.challengesTitle}>Retos Completados</Text>
      <FlatList
        data={challenges}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        nestedScrollEnabled // Habilita el desplazamiento anidado
      />
    </View>
  );
};

const styles = StyleSheet.create({
  challengesContainer: {
    marginBottom: 24,
  },
  challengesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
  },
  challengeCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  challengeDate: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 4,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  challengeOrganization: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
  },
  challengeRating: {
    flexDirection: 'row',
  },
});

export default CompletedChallenges;