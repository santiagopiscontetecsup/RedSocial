// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '@/services/login/loginService';
import { getStudentIdFromToken } from '@/services/login/tokenService';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica si hay un token almacenado al inicio
  const checkAuthState = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Puedes agregar validación del token aquí si lo deseas
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error comprobando el estado de autenticación:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await loginUser({ email, password });

      const token = response.token;
      const studentId = getStudentIdFromToken(token);

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('studentId', studentId || '');

      setIsAuthenticated(true);
    } catch (error: any) {
      alert(error.message || 'Error al iniciar sesión');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('studentId');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
