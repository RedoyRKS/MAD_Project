import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import axios from 'axios';

export default function AdminFootballFieldScreen({ navigation }) {
  const [fields, setFields] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');  // State for search input
  const [filteredFields, setFilteredFields] = useState([]); // State for filtered fields

  const handleLogout = () => {
    alert('Logged out successfully');
    navigation.navigate('Login');
  };

  // Fetch football fields from the backend when component mounts
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getFields');
        if (response.data.success) {
          setFields(response.data.fields);
          setFilteredFields(response.data.fields); // Initialize filtered fields
        } else {
          alert('Failed to fetch fields');
        }
      } catch (error) {
        console.error('Error fetching fields:', error);
        alert('An error occurred while fetching the fields.');
      }
    };

    fetchFields();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleLogout} title="Logout" color="#FF9A98" />
      ),
    });
  }, [navigation]);

  // Handle navigation to AddField screen and update state when new field is added
  const handleAdminAddField = () => {
    navigation.navigate('AdminAddField', {
      onGoBack: (newField) => {
        if (newField) {
          setFields((prevFields) => [...prevFields, newField]);
          setFilteredFields((prevFields) => [...prevFields, newField]); // Update filtered list as well
        }
      },
    });
  };

  // Handle deleting a field
  const handleDeleteField = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deleteField/${id}`);
      if (response.data.success) {
        setFields((prevFields) => prevFields.filter((field) => field.id !== id));
        setFilteredFields((prevFields) => prevFields.filter((field) => field.id !== id)); // Update filtered list
        alert('Field deleted successfully');
      } else {
        alert('Failed to delete field: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error deleting field:', error);
      alert('An error occurred while deleting the field.');
    }
  };

  // Handle search input
  const handleSearch = (text: string) => {
    setSearchQuery(text); // Update search query
    if (text === '') {
      setFilteredFields(fields); // Show all fields if search is empty
    } else {
      // Filter fields based on search query (case insensitive)
      const filteredData = fields.filter((field) =>
        field.field_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFields(filteredData);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Football Fields</Text>

      {/* Add Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Fields"
        value={searchQuery}
        onChangeText={handleSearch} // Handle search input
      />

      {/* Add Field Button */}
      <TouchableOpacity style={styles.addFieldButton} onPress={handleAdminAddField}>
        <Text style={styles.addButtonText}>+ Add Field</Text>
      </TouchableOpacity>

      {/* Display the list of fields */}
      {filteredFields.length === 0 ? (
        <Text style={styles.emptyMessage}>No fields found. Try a different search.</Text>
      ) : (
        <FlatList
          data={filteredFields}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.fieldCard}>
              {item.image && (
                <Image
                  source={{ uri: `http://localhost:3000/uploads/${item.image}` }}
                  style={styles.fieldImage}
                  resizeMode="cover"
                />
              )}
              <Text style={styles.fieldTitle}>Field: {item.field_name}</Text>
              <Text>Contact: {item.contact_number}</Text>
              <Text>Location: {item.field_location}</Text>
              <Text>Facebook: {item.facebook_page}</Text>
              {/* Delete button */}
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteField(item.id)}>
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
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addFieldButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldCard: {
    padding: 16,
    marginTop: 10,
    backgroundColor: '#e2f2ff',
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center', // Center content horizontally
  },
  fieldImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center field title
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 20, // Shorter width
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
