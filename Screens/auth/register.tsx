import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import InputField from '@/components/ui/InputField';
import CustomButton from '@/components/ui/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';



type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const handleRegister = () => {
    navigation.navigate('RegisterStep2', {
      fullName,
      email,
      phone,
      password,
    });
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <Image
        source={require('@/assets/images/react-logo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <InputField
          placeholder="Nombre Completo"
          value={fullName}
          onChangeText={setFullName}
        />
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Teléfono"
          value={phone}
          onChangeText={setPhone}
        />
        <InputField
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          showPasswordToggle
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        <InputField
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          showPasswordToggle
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>

      <CustomButton title="Continuar" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
});