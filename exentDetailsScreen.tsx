import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import axios from 'axios'; // For making API requests

export default function EventDetailsScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  // Fetch events from the backend when the component mounts
  async function fetchEvents() {
    try {
      console.log('Fetching events...');
      const response = await axios.get('http://localhost:3000/getEvents'); // Update with your API URL
      console.log('Response:', response);

      if (response.data.success) {
        setEvents(response.data.events); // Set fetched events to state
      } else {
        alert('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('An error occurred while fetching the events.');
    }
  }

  // Use useEffect to call fetchEvents when component mounts
  useEffect(() => {
    fetchEvents(); // Fetch events when the component mounts
  }, []); // The empty array ensures this runs only once after the component mounts

  // Navigate to add event page
  const handleAddEvent = () => {
    navigation.navigate('AddEvents', {
      onGoBack: (newEvent) => {
        if (newEvent) {
          setEvents((prevEvents) => [...prevEvents, newEvent]);
        }
      },
    });
  };

  // Handle event deletion
  const handleDeleteEvent = async (eventId: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deleteEvent/${eventId}`); // Update with your API endpoint
      if (response.data.success) {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        alert('Event deleted successfully.');
      } else {
        alert('Failed to delete the event.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred while deleting the event.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>

      {/* Add Event Button */}
      <TouchableOpacity style={styles.addEventButton} onPress={handleAddEvent}>
        <Text style={styles.addButtonText}>+ Add Event</Text>
      </TouchableOpacity>

      {/* Display the list of events */}
      {events.length === 0 ? (
        <Text style={styles.emptyMessage}>No events added yet. Click "+ Add Event" to get started!</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Text style={styles.eventTitle}>Event: {item.evenTitle}</Text>
              <Text>Date: {item.date}</Text>
              <Text>Location: {item.eventLocation}</Text>
              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteEvent(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addEventButton: {
    position: 'absolute',
    right: 16,
    top: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    elevation: 2,
    zIndex: 1,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventCard: {
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#e2f2ff',
    borderRadius: 8,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});
