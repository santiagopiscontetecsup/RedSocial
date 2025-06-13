import LoginScreen from '@/Screens/auth/login';
import RegisterScreen from '@/Screens/auth/register';
import RegisterStep2Screen from '@/Screens/auth/registerStep2';
import RegisterStep3Screen from '@/Screens/auth/registerStep3';
import HomeScreen from '@/Screens/tabs/HomeScreern';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RegisterStep2" component={RegisterStep2Screen} />
      <Stack.Screen name="RegisterStep3" component={RegisterStep3Screen} />
    </Stack.Navigator>
  );
}