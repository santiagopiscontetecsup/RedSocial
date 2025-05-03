import { Stack } from 'expo-router';

export default function StudentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Atrás',
        contentStyle: {
          // Ajusta según la altura de tu tab bar
        }
      }}
    >
      <Stack.Screen
        name="projects"
        options={{
          title: 'Proyectos',
        }}
      />
      <Stack.Screen
        name="editProfile"
        options={{
          title: 'Editar Perfil',
        }}
      />
      <Stack.Screen
        name="certificates"
        options={{
          title: 'Certificados',
        }}
      />
      <Stack.Screen
        name="EditInfo"
        options={{
          title: 'Editar Información',
        }}
      />
    </Stack>
  );
}