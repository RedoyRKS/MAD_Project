import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios'; // For making API requests

export default function AddEventScreen({ navigation }) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventOrganizers, setEventOrganizers] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Handle form submission
  const handleSubmit = async () => {
    if (!eventTitle || !eventOrganizers || !eventLocation || !date || !time) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/addEvents', {
        eventTitle,
        eventOrganizers,
        eventLocation,
        date,
        time,
      });

      if (response.data.success) {
        alert('Event Added Successfully');
       // navigation.goBack(); // Go back to the previous screen after adding event
      } else {
        alert('Event added  Failed');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      Alert.alert('Error', 'An error occurred while adding the event.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={eventTitle}
        onChangeText={setEventTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Organizers"
        value={eventOrganizers}
        onChangeText={setEventOrganizers}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={eventLocation}
        onChangeText={setEventLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
