import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function FootballFieldsScreen() {
  const navigation = useNavigation();
  const fields = [
    { id: 1, name: 'Field 1', image: require('../Assets/F1.jpeg') },
    { id: 2, name: 'Field 2', image: require('../Assets/football2.jpeg') },
    // Add more fields as needed
  ];

  const handleBookNow = (fieldName: string) => {
    navigation.navigate('Booking', { fieldName });
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      {fields.map((field) => (
        <View key={field.id} style={styles.fieldCard}>
          <Image source={field.image} style={styles.fieldImage} />
          <View style={styles.fieldInfo}>
            <Text style={styles.fieldName}>{field.name}</Text>
            <TouchableOpacity onPress={() => handleBookNow(field.name)} style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  fieldCard: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
  },
  fieldImage: {
    width: '100%',
    height: 200,
  },
  fieldInfo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#74c69d',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  bookButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
