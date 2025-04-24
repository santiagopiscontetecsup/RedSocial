import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '@/constants/Colors';

const CustomButton = ({
  title,
  onPress,
  small = false,
  isLoading = false, // Nueva propiedad
}: {
  title: string;
  onPress: () => void;
  small?: boolean;
  isLoading?: boolean; // Nueva propiedad
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, small && styles.smallButton, isLoading && styles.disabledButton]}
      onPress={isLoading ? undefined : onPress} // Deshabilitar el botón si está cargando
      disabled={isLoading} // Deshabilitar interacción si está cargando
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" /> // Indicador de carga
      ) : (
        <Text style={[styles.text, small && styles.smallText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  smallButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 'auto',
  },
  smallText: {
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: Colors.gray, // Cambiar el color del botón cuando está deshabilitado
  },
});