import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/ui/CustomButton';
import Colors from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';

export default function RegisterStep2Screen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');

  const roles = ['Backend', 'FrontEnd', 'Full Stack', 'Desarrollador Móvil', 'Big Data', 'Otro'];
  const skills = ['Swift', 'Java', 'Python', '.NET', 'React', 'Otro'];

  const { fullName, email, phone, password } = useLocalSearchParams();

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleContinue = () => {
    const finalRole = selectedRole === 'Otro' ? customRole : selectedRole;
    const finalSkills = selectedSkills.includes('Otro')
      ? [...selectedSkills.filter((s) => s !== 'Otro'), customSkill]
      : selectedSkills;

    // Navegar a RegisterStep3 con los datos seleccionados
    router.push({
      pathname: '/auth/register/student/registerStep3',
      params: {
        fullName,
        email,
        phone,
        password,
        role: finalRole,
        skills: JSON.stringify(finalSkills),
      },
    });
  };

  // Animación para los botones de roles
  const roleAnimation = useSharedValue(1);
  const roleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: roleAnimation.value }],
    opacity: roleAnimation.value,
  }));

  const handleRolePress = (role: string) => {
    setSelectedRole(role);
    roleAnimation.value = withTiming(1.1, { duration: 200 }, () => {
      roleAnimation.value = withTiming(1, { duration: 200 });
    });
  };

  // Animación para los botones de habilidades
  const skillAnimation = useSharedValue(1);
  const skillAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: skillAnimation.value }],
    opacity: skillAnimation.value,
  }));

  const handleSkillPress = (skill: string) => {
    toggleSkill(skill);
    skillAnimation.value = withTiming(1.1, { duration: 200 }, () => {
      skillAnimation.value = withTiming(1, { duration: 200 });
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cuéntanos más acerca de ti...</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rol</Text>
        <Text style={styles.sectionSubtitle}>
          ¿Qué rol desempeñas en el área de Programación y Tecnología?
        </Text>
        <View style={styles.optionsContainer}>
          {roles.map((role) => (
            <Animated.View key={role} style={roleAnimatedStyle}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedRole === role && styles.optionButtonSelected,
                ]}
                onPress={() => handleRolePress(role)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedRole === role && styles.optionTextSelected,
                  ]}
                >
                  {role}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
        {selectedRole === 'Otro' && (
          <TextInput
            style={styles.input}
            placeholder="Especifica tu rol"
            value={customRole}
            onChangeText={setCustomRole}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <Text style={styles.sectionSubtitle}>
          ¿Cuáles son tus habilidades en las que te destacas más?
        </Text>
        <View style={styles.optionsContainer}>
          {skills.map((skill) => (
            <Animated.View key={skill} style={skillAnimatedStyle}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedSkills.includes(skill) && styles.optionButtonSelected,
                ]}
                onPress={() => handleSkillPress(skill)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedSkills.includes(skill) && styles.optionTextSelected,
                  ]}
                >
                  {skill}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
        {selectedSkills.includes('Otro') && (
          <TextInput
            style={styles.input}
            placeholder="Especifica tu habilidad"
            value={customSkill}
            onChangeText={setCustomSkill}
          />
        )}
      </View>

      <CustomButton title="Continuar" onPress={handleContinue} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  optionButtonSelected: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.primary,
  },
  optionTextSelected: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});