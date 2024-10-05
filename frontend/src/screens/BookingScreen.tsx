import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios'; 

export default function BookingScreen({ route, navigation }) {
  const { fieldName } = route.params;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [bkashNumber, setBkashNumber] = useState('');

  const handleBooking = async () => {
    if (date === '' || time === '' || bkashNumber === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Send booking information to the backend
      const response = await axios.post('http://localhost:3000/api/bookings', {
        fieldName,
        date,
        time,
        bkashNumber,
      });

      if (response.status === 201) {
        Alert.alert('Booking Confirmed', `You have booked ${fieldName} on ${date} at ${time}`);
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Unable to store booking information');
    }
  };

  const handlePayment = () => {
    navigation.navigate('PaymentOptions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book {fieldName}</Text>

      {/* Price Chart */}
      <View style={styles.priceChart}>
        <Text style={styles.priceChartHeader}>Price Chart</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Time Slot</Text>
            <Text style={styles.tableHeader}>Price (BDT)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>6:00 AM - 9:00 AM</Text>
            <Text style={styles.tableCell}>500</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>9:00 AM - 12:00 PM</Text>
            <Text style={styles.tableCell}>700</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>12:00 PM - 3:00 PM</Text>
            <Text style={styles.tableCell}>800</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>3:00 PM - 6:00 PM</Text>
            <Text style={styles.tableCell}>1000</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>6:00 PM - 9:00 PM</Text>
            <Text style={styles.tableCell}>1200</Text>
          </View>
        </View>

        {/* Payment Button */}
        <TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      {/* Date, Time, and Payment Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Enter Date (e.g., 2024-10-01)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Time (e.g., 3:00 PM)"
        value={time}
        onChangeText={setTime}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter bKash Number"
        value={bkashNumber}
        onChangeText={setBkashNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity onPress={handleBooking} style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  priceChart: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
    elevation: 2,
  },
  priceChartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeader: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  paymentButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    elevation: 2,
  },
  bookButton: {
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
