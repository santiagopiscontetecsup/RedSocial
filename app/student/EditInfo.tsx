import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import ProfileHeader from '@/components/ui/ProfileHeader';
import InputField from '@/components/ui/InputField';
import CustomButton from '@/components/ui/CustomButton';
import Colors from '@/constants/Colors';
import { universidades, carreras } from '@/data/registo';
import SelectionInput from '@/components/ui/SelectionInput'; 

export default function EditInfoScreen() {
  const [avatar, setAvatar] = useState(
    'https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png'
  );
  const [name, setName] = useState('Alex Rodríguez');
  const [email, setEmail] = useState('alex.rodriguez@example.com');
  const [phone, setPhone] = useState('987654321');
  const [selectedUniversity, setSelectedUniversity] = useState('1'); 
  const [selectedCareer, setSelectedCareer] = useState('1'); 

  const handleSaveChanges = () => {
    Alert.alert('Cambios guardados', 'Tu perfil ha sido actualizado con éxito.');
  };

  const handleEditProfileImage = (newImage: string) => {
    setAvatar(newImage);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <ProfileHeader
        backgroundImage="https://www1.tecsup.edu.pe/sites/default/files/branches/image_mini/lima_0.png"
        profileImage={avatar}
        userName={name}
        performanceScore="4.7"
        certificatesCount="3"
        isEditable={true}
        onEditProfile={handleEditProfileImage}
        onViewCertificates={() => Alert.alert('Certificados', 'Redirigiendo a certificados...')}
      />

      {/* Editable Fields */}
      <View style={styles.form}>
        <InputField
          placeholder="Nombre Completo"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <InputField
          placeholder="Teléfono"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />

        {/* Universidad */}
        <SelectionInput
          placeholder="Universidad"
          options={universidades.map((uni) => ({
            label: uni.nombre,
            value: uni.id.toString(),
          }))}
          selectedValue={selectedUniversity}
          onValueChange={setSelectedUniversity}
          style={styles.input}
        />

        {/* Carrera */}
        <SelectionInput
          placeholder="Carrera"
          options={carreras.map((carrera) => ({
            label: carrera.nombre,
            value: carrera.id.toString(),
          }))}
          selectedValue={selectedCareer}
          onValueChange={setSelectedCareer}
          style={styles.input}
        />

        {/* Save Button */}
        <CustomButton title="Guardar Cambios" onPress={handleSaveChanges} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
     // Separación a los lados
  },
  form: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    
  },
});