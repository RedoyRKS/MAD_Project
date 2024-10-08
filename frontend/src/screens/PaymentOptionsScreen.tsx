import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';

export default function PaymentOptionsScreen({ navigation }) {
  const handlePaymentSelection = (method) => {
    Alert.alert('Payment Selected', `You have selected ${method} for payment.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Payment Method</Text>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentSelection('bKash')}
      >
        <Image
          source={require('../Assets/bkash.png')} // Ensure the path is correct
          style={styles.paymentImage}
        />
        <Text>01766106096</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentSelection('Nagad')}
      >
        <Image
          source={require('../Assets/nagad.png')} // Ensure the path is correct
          style={styles.paymentImage}
        />
        <Text>01766106096</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentSelection('Credit/Debit Card')}
      >
        <Image
          source={require('../Assets/master_card.png')} 
          style={styles.paymentImage}
        />
        <Text>01766106096</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentSelection('Rocket')}
      >
        <Image
          source={require('../Assets/rocket.png')} 
          style={styles.paymentImage}
        />
        <Text>01766106096</Text>
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
  paymentImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
});
