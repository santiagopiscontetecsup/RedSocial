import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import DetalleRetoScreen from '@/Screens/student/DetalleRetoScreen';
import MisProyectosScreen from '@/Screens/student/MisProyectosScreen';
import CertificatesScreen from '@/Screens/student/CertificatesScreen';
import EvaluacionesScreen from '@/Screens/student/EvaluacionesScreen';
import { MainStackParamList } from './types';
import EditProfileScreen from '@/Screens/student/EditProfileScreen';
import EditInfoScreen from '@/Screens/student/EditInfoScreen';
import ProjectsScreen from '@/Screens/student/ProjectsScreen';


const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="DetalleReto" component={DetalleRetoScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="EditInfo" component={EditInfoScreen} />
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="Certificates" component={CertificatesScreen} />
      <Stack.Screen name="MisProyectos" component={MisProyectosScreen} />
      <Stack.Screen name="Evaluaciones" component={EvaluacionesScreen} />
    </Stack.Navigator>
  );
}
