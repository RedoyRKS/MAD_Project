import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function AdminDashboardScreen() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddField = () => {
    if (!name || !type || !imageUrl) {
      alert('Please fill in all fields');
      return;
    }

    axios
      .post('http://localhost:3000/add-field', { name, type, imageUrl })
      .then(response => {
        if (response.data.success) {
          alert('Field added successfully');
          setName('');
          setType('');
          setImageUrl('');
        } else {
          alert('Failed to add field');
        }
      })
      .catch(error => {
        console.error('Error adding field:', error);
        alert('Failed to add field. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Field</Text>
      <TextInput
        style={styles.input}
        placeholder="Field Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Field Type (e.g., Football, Badminton)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Button title="Add Field" onPress={handleAddField} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
});
