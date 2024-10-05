import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios
      .post('http://localhost:3000/login', { username, password })
      .then(response => {
        if (response.data.success) {
          alert('Login successful');
          navigation.navigate('Dashboard', { username: response.data.username });
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(error => {
        alert('Login failed. Please try again.');
      });
  };

  const handleAdminLogin = () => {
    navigation.navigate('AdminLogin');
  };

  return (
    <ImageBackground
      source={require('../Assets/bg.jpg')} // Replace with your actual image path
      style={styles.background}
      resizeMode="cover" // Makes the image cover the entire background
    >
      <View style={styles.container}>
        <Text style={styles.title}>TERFEASE</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#fff"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>
          Don't have an account? Sign up here.
        </Text>

        <TouchableOpacity onPress={handleAdminLogin} style={styles.adminButton}>
          <Text style={styles.adminButtonText}>Admin Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the background covers the whole screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a dark overlay for better text visibility
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
  },
  button: {
    width: '80%',
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  adminButton: {
    marginTop: 30,
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
