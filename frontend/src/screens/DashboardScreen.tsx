import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default function DashboardScreen({ route, navigation }) {
  const { username } = route.params;

  const handleLogout = () => {
    // Logout logic if needed
    alert('Logged out successfully');
    navigation.navigate('Login');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleLogout} title="Logout" color="#FF9A98" />
      ),
    });
  }, [navigation]);

  const handleBooking = (sport: string) => {
    if (sport === 'Football') {
      navigation.navigate('FootballFields');
    } else if (sport === 'Badminton') {
      navigation.navigate('BadmintonCourts');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>
      <Text style={styles.subtitle}>Select a field to book:</Text>

      {/* Football Card */}
      <TouchableOpacity style={[styles.card, styles.footballCard]} onPress={() => handleBooking('Football')}>
        <Text style={styles.cardTitle}>Football Field</Text>
      </TouchableOpacity>

      {/* Badminton Card */}
      <TouchableOpacity style={[styles.card, styles.badmintonCard]} onPress={() => handleBooking('Badminton')}>
        <Text style={styles.cardTitle}>Badminton Court</Text>
      </TouchableOpacity>
      
      {/* Cricket Card */}
      <TouchableOpacity style={[styles.card, styles.footballCard]} onPress={() => handleBooking('Football')}>
        <Text style={styles.cardTitle}>Cricket Field</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  logoutBtn:{

  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: 'center',
  },
  footballCard: {
    backgroundColor: '#d1f7c4', // Light green color for football card
  },
  badmintonCard: {
    backgroundColor: '#c4e3f7', // Light blue color for badminton card
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
