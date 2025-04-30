import { Stack } from 'expo-router';

export default function StudentLayout() {
  return (
    <Stack>

      <Stack.Screen
        name="projects"
        options={{ headerShown: false }} // Asegúrate de que el encabezado esté oculto
      />
      <Stack.Screen
        name="certificates"
        options={{ headerShown: false }} // Asegúrate de que el encabezado esté oculto
      />
      <Stack.Screen
        name="editProfile"
        options={{ headerShown: false }} // Asegúrate de que el encabezado esté oculto
      />  
      </Stack>
  )
}