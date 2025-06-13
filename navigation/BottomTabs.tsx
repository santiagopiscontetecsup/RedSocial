import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/Screens/tabs/HomeScreern';
import ProfileScreen from '@/Screens/tabs/ProfileScreen';
import MenuScreen from '@/Screens/tabs/MenuScreen';
import NotificationsScreen from '@/Screens/tabs/NotificationsScreen';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
}
