import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../utils/axiosInstance';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { token } = response.data;
      await AsyncStorage.setItem('jwtToken', token);
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Main') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.subHeader}>Sign in to continue</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
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

        <View style={styles.inputField}>
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
      </View>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerLink}> Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E0FFFF',
    padding: 25,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#008080',
    textAlign: 'center',
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 16,
    color: '#20B2AA',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#F0FFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B0E0E6',
  },
  inputIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#008080',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#008080',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
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

export default LoginScreen;
