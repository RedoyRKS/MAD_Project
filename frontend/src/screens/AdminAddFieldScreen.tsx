import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker'; // For image picker

export default function AdminFootballFieldScreen() {
  const [fieldName, setFieldName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [fieldLocation, setFieldLocation] = useState('');
  const [facebookPage, setFacebookPage] = useState('');
  const [image, setImage] = useState(null); // Store image details

  // Function to open the image picker
  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const { uri, type, fileName } = response.assets[0];
        setImage({ uri, type, name: fileName || 'field_photo.jpg' });
      }
    });
  };

  // Function to handle form submission
  const handleAddField = async () => {
    const formData = new FormData();
    formData.append('fieldName', fieldName);
    formData.append('contactNumber', contactNumber);
    formData.append('fieldLocation', fieldLocation);
    formData.append('facebookPage', facebookPage);

    // Append image if available
    if (image) {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    }
     const formDataArray = Array.from(formData.entries());
     console.log(formDataArray);
     for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + JSON.stringify(pair[1]));
    }

    try {
      const response = await axios.post('http://localhost:3000/AdminAddField', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      //console.log(response.data);
      if (response.data.success) {
        alert('Field added successfully!');
      } else {
        alert('Failed to add field: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error adding field:', error);
      alert('An error occurred while adding the field.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Football Field</Text>

      <TextInput
        style={styles.input}
        placeholder="Field Name"
        value={fieldName}
        onChangeText={setFieldName}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Field Location"
        value={fieldLocation}
        onChangeText={setFieldLocation}
      />

      <TextInput
        style={styles.input}
        placeholder="Facebook Page"
        value={facebookPage}
        onChangeText={setFacebookPage}
      />

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={handleChoosePhoto}>
        <Text style={styles.imagePickerText}>Choose Photo (Optional)</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}

      <Button title="Add Field" onPress={handleAddField} />
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
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  imagePicker: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 16,
    color: '#000',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 5,
  },
});
