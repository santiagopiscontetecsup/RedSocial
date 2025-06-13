import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@/context/AuthContext';
import RootNavigator from '@/navigation/RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
