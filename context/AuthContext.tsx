import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true, // Añadir estado de carga
    login: async () => {},
    logout: async () => {},
  });
  
  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    const checkAuthState = useCallback(async () => {
      try {
        // Simular verificación de token
        const fakeToken = false; // Cambiar a true solo para pruebas
        setIsAuthenticated(fakeToken);
      } finally {
        setIsLoading(false);
      }
    }, []);
  
    useEffect(() => {
      checkAuthState();
    }, [checkAuthState]);
  
    // Resto del código...

  const login = useCallback(async () => {
    setIsLoading(true);
    // Lógica real de autenticación aquí
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    // Lógica real de logout aquí
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAuthenticated(false);
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);