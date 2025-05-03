import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: Colors.lightGray,
        },
      }}
    >
     {/* Pestañas visibles */}
     <Tabs.Screen name="home" options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} />
      <Tabs.Screen name="notifications" options={{ tabBarIcon: ({ color }) => <Ionicons name="notifications" size={24} color={color} /> }} />
      <Tabs.Screen name="menu" options={{ tabBarIcon: ({ color }) => <Ionicons name="menu" size={24} color={color} /> }} />

      {/* Pestaña oculta para student */}
      <Tabs.Screen
        name="student"
        options={{
          href: null, // Oculta completamente la pestaña
          headerShown: false
        }}
      />
    </Tabs>
  );
}