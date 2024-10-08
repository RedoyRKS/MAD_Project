import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function BadmintonCourtsScreen() {
  const navigation = useNavigation();
  const courts = [
    { id: 1, name: 'Court 1', image: require('../Assets/badminton1.jpg') },
    { id: 2, name: 'Court 2', image: require('../Assets/badminton2.jpg') },
    // Add more courts as needed
  ];
  const handleBookNow = (fieldName: string) => {
    navigation.navigate('Booking', { fieldName });
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      {courts.map((court) => (
        <View key={court.id} style={styles.courtCard}>
          <Image source={court.image} style={styles.courtImage} />
          <View style={styles.courtInfo}>
            <Text style={styles.courtName}>{court.name}</Text>
            <TouchableOpacity onPress={() => handleBookNow(court.name)} style={styles.bookButton}>
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
  courtCard: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
  },
  courtImage: {
    width: '100%',
    height: 200,
  },
  courtInfo: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courtName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#f4511e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  bookButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
