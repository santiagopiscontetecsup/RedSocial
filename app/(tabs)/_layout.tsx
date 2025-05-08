import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import {useTabContext} from '@/context/tabContext';

export default function TabLayout() {
  const { setActiveTab } = useTabContext();

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
        lazy: true,
        tabBarHideOnKeyboard: true
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
        listeners={{
          focus: (e) => {
            setActiveTab('home');
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
        listeners={{
          focus: (e) => {
           setActiveTab('profile');
          },
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="notifications" size={24} color={color} />,
        }}
        listeners={{
          focus: (e) => {
            setActiveTab('notifications');
          },
        }}
      />
      <Tabs.Screen
        name="student"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{ tabBarIcon: ({ color }) => <Ionicons name="menu" size={24} color={color} /> }}
        listeners={{
          focus: (e) => {
            setActiveTab('menu');
          }
        }}
      />
    </Tabs>
  );
}