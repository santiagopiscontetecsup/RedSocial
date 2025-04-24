import { Stack } from 'expo-router';

export default function StudentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="applications"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="projects"
        options={{ headerShown: false }} // Asegúrate de que el encabezado esté oculto
      />
    </Stack>
  );
}