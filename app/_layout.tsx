import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ProjectProvider } from '@/context/ProjectContext';
import { TabProvider } from '@/context/tabContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ProjectProvider>
        <TabProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AuthGate />
          </ThemeProvider>
        </TabProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

function AuthGate() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Espera hasta que el componente esté listo
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return; // Asegúrate de que el componente esté listo antes de navegar

    const inAuthGroup = segments[0] === 'auth';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/auth/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)/home'); // Cambia a la ruta inicial de las pestañas
    }
  }, [isAuthenticated, isReady]);

  return isReady ? <Slot /> : null; // Renderiza el Slot solo cuando esté listo
}