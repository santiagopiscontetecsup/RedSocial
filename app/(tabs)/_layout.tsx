import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ 
          title: 'Explorar',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          )
        }} 
      />
    </Tabs>
  );
}