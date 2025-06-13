// navigation/types.d.ts
import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define las pantallas del stack de autenticación
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RegisterStep2: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
  };
  RegisterStep3: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    skills: string;
  };
};

// navigation/types.d.ts
export type MainStackParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList>;
  DetalleReto: { proyecto: Proyecto };
  EditProfile: undefined;
  EditInfo: undefined;
  Projects: undefined;
  Certificates: undefined;
  MisProyectos: undefined;
  Evaluaciones: undefined;
};


export interface Proyecto {
  id: number;
  title: string;
  description: string;
  entregado: boolean;
  [key: string]: any; // por si hay otros campos no definidos aún
}

// Pantallas raíz (Root Stack)
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  // Si tienes pantallas modales o independientes del Main o Auth, las declaras aquí
  DetalleReto: { proyecto: Proyecto };
};

// Tipos para usar en navegación en pantalla DetalleReto
export type DetalleRetoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DetalleReto'
>;

export type DetalleRetoScreenRouteProp = RouteProp<
  RootStackParamList,
  'DetalleReto'
>;

// Declara los tipos globales para useNavigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
