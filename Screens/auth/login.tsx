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
import { useAuth } from '@/context/AuthContext';
import CustomButton from '@/components/ui/CustomButton';
import InputField from '@/components/ui/InputField';
import Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/types';


// Función para validar email
  function isValidEmail(email: string): boolean {
    // No permite números, debe tener @ y terminar en .com, .edu o .pe
    const emailRegex = /^[A-Za-z._%+-]+@[A-Za-z.-]+\.(com|edu|pe)$/i;
    // No debe contener ningún número
    const hasNumber = /\d/;
    return emailRegex.test(email) && !hasNumber.test(email);
  }

  // Función para validar password
  function isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const { login } = useAuth(); // Extrae la función `login` del contexto
  const [email, setEmail] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  

   const handleLogin = async () => {
    // Validaciones
    if (!isValidEmail(email)) {
      Alert.alert(
        'Email inválido',
        'El email debe ser válido (ej: usuario@dominio.com) y no contener números.'
      );
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        'Contraseña inválida',
        'La contraseña debe tener al menos 6 caracteres.'
      );
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tus datos.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register'); 
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
          onPress={() => goToRegister()}
        >
          Regístrate ahora
        </Text>
      </Text>
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