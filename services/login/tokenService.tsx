import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string; // Email del usuario
  jti: string; // ID único del token
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string; // ID del estudiante
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string; // Email
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string; // Rol del usuario
  exp: number; // Fecha de expiración del token
  iss: string; // Emisor del token
  aud: string; // Audiencia del token
}

export const getStudentIdFromToken = (token: string): string | null => {
  try {
    // Decodifica el token
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);

    // Extrae el ID del estudiante
    const studentId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    return studentId || null;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};