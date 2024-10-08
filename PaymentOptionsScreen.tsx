import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function PaymentOptionsScreen({ navigation }) {
  const handlePaymentSelection = (method: string) => {
    Alert.alert('Payment Selected', `You have selected ${method} for payment.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Payment Method</Text>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentSelection('bKash')}
      >
        <Text style={styles.paymentText}>bKash</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentSelection('Nagad')}
      >
        <Text style={styles.paymentText}>Nagad</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentSelection('Credit/Debit Card')}
      >
        <Text style={styles.paymentText}>Credit/Debit Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentSelection('Rocket')}
      >
        <Text style={styles.paymentText}>Rocket</Text>
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
  paymentOption: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
    elevation: 2,
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
