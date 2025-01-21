import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../utils/axiosInstance';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axiosInstance.post('/auth/register', { name, email, password });
      Alert.alert('Success', 'Registration successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>
      <Text style={styles.subHeader}>Join our inventory management system</Text>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#008080" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#777"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="#008080" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#008080" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#777"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}> Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF',
    padding: 25,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#008080',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#20B2AA',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#F0FFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#B0E0E6',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#B0E0E6',
    color: '#008080',
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 15,
    color: '#20B2AA',
  },
  footerLink: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#008080',
    marginLeft: 5,
  },
});

export default RegisterScreen;
