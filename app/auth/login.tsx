// filepath: c:\6 Semestre\Nueva carpeta\RedSocial\app\auth\login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';
import CustomButton from '@/components/ui/CustomButton';
import InputField from '@/components/ui/InputField';
import Colors from '@/constants/Colors';
import { loginUser } from '@/services/login/loginService';
import { getStudentIdFromToken } from '@/services/login/tokenService';


export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth(); // Extrae la función `login` del contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // descomentar para pobrar en local
  // const handleLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     await login(email, password); // Llama a la función `login` del contexto
  //     router.replace('/(tabs)/home'); // Redirige al usuario a la pantalla principal
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // descomentar para verificar el enddpoint de login

  const handleLogin = async () => {
    try {
      const data = { email, password };
      const response = await loginUser(data); // Llama al servicio de login
      console.log('Inicio de sesión exitoso:', response);
  
      // Obtén el ID del estudiante a partir del token
      const studentId = getStudentIdFromToken(response.token);
      console.log('ID del estudiante logueado:', studentId);
  
      // Guarda el token y el ID del estudiante en el contexto o AsyncStorage
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('studentId', studentId || '');
  
      // Redirige al usuario a la pantalla principal
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Intenta nuevamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inicio de Sesion</Text>

      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          showPasswordToggle
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      <CustomButton title="Ingresar" onPress={handleLogin} isLoading={isLoading} />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>O Inicia Sesión usando</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Continuar con Google</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        ¿Aún no tienes una cuenta?{' '}
        <Text
          style={styles.registerLink}
          onPress={() => router.push('/auth/register/student/register')}
        >
          Regístrate ahora
        </Text>
      </Text>

      {/* <View style={styles.roleButtons}>
        <CustomButton
          title="Estudiante"
          onPress={() => router.push('/auth/register/student/register')} // Redirige a la pantalla de registro
          small
        />
      </View> */}
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
    marginBottom: 10,
  },
  forgotPassword: {
    color: Colors.primary,
    fontSize: 13,
    textAlign: 'right',
    marginTop: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 8,
    color: '#888',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 15,
    color: '#333',
  },
  registerText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  registerLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 10,
  },
});