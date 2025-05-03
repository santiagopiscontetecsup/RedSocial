import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/ui/CustomButton';
import evaluations from '@/data/evaluaciones';

type Evaluation = {
  id: number;
  reto: string;
  fechaEntrega: string;
  calificacion: number; // Calificación en estrellas
  comentarios: string;
  estado: 'En proceso' | 'Rechazado' | 'Aprobado';
};

const typedEvaluations: Evaluation[] = evaluations;

export default function EvaluacionesScreen() {
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color={index < rating ? '#FFD700' : Colors.gray}
      />
    ));
  };

  const renderEvaluationCard = ({ item }: { item: Evaluation }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedEvaluation(item)}
    >
      <Text style={styles.cardTitle}>{item.reto}</Text>
      <View
        style={[
          styles.badge,
          item.estado === 'Aprobado' && styles.badgeApproved,
          item.estado === 'Rechazado' && styles.badgeRejected,
          item.estado === 'En proceso' && styles.badgeInProgress,
        ]}
      >
        <Text style={styles.badgeText}>{item.estado}</Text>
      </View>
      <Text style={styles.cardDate}>Fecha de entrega: {item.fechaEntrega}</Text>
      <View style={styles.cardRating}>{renderStars(item.calificacion)}</View>
      <Text style={styles.cardComments}>{item.comentarios}</Text>
    </TouchableOpacity>
  );

  const renderExpandedView = () => {
    if (!selectedEvaluation) return null;

    return (
      <View style={styles.expandedView}>
        <Text style={styles.expandedTitle}>{selectedEvaluation.reto}</Text>
        <View
          style={[
            styles.badge,
            selectedEvaluation.estado === 'Aprobado' && styles.badgeApproved,
            selectedEvaluation.estado === 'Rechazado' && styles.badgeRejected,
            selectedEvaluation.estado === 'En proceso' && styles.badgeInProgress,
          ]}
        >
          <Text style={styles.badgeText}>{selectedEvaluation.estado}</Text>
        </View>
        <Text style={styles.expandedDate}>
          Fecha de entrega: {selectedEvaluation.fechaEntrega}
        </Text>
        <View style={styles.expandedRating}>
          {renderStars(selectedEvaluation.calificacion)}
        </View>
        <Text style={styles.expandedComments}>
          Comentarios: {selectedEvaluation.comentarios}
        </Text>
        <CustomButton
          title="Cerrar"
          onPress={() => setSelectedEvaluation(null)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluaciones</Text>
      {evaluations.length > 0 ? (
        <>
          <FlatList
            data={evaluations}
            renderItem={renderEvaluationCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
          />
          {renderExpandedView()}
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="sad-outline" size={48} color={Colors.gray} />
          <Text style={styles.emptyText}>
            Aún no tienes evaluaciones disponibles.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  badge: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeApproved: {
    backgroundColor: Colors.success,
  },
  badgeRejected: {
    backgroundColor: Colors.error,
  },
  badgeInProgress: {
    backgroundColor: Colors.primary,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardDate: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardRating: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardComments: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  expandedView: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 16,
  },
  expandedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  expandedDate: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
    textAlign: 'center',
  },
  expandedRating: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  expandedComments: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 8,
    textAlign: 'center',
  },
});