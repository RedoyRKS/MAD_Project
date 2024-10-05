import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';

export default function DashboardScreen({ route, navigation }) {
  const { username } = route.params;

  const handleLogout = () => {
    alert('Logged out successfully');
    navigation.navigate('Login');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.logoutButtonContainer}>
          <Button onPress={handleLogout} title="Logout" color="#FF9A98" />
        </View>
      ),
    });
  }, [navigation]);

  const handleBooking = (sport:string) => {
    if (sport === 'Football') {
      navigation.navigate('FootballFields');
    } else if (sport === 'Badminton') {
      navigation.navigate('BadmintonCourts');
    } else if (sport === 'Cricket') {
      navigation.navigate('CricketFields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>
      <Text style={styles.subtitle}>Select a field to book:</Text>

      {/* Football Card */}
      <TouchableOpacity style={[styles.card, styles.footballCard]} onPress={() => handleBooking('Football')}>
        <Image source={require('../Assets/football.png')} style={styles.cardImage} />
        <Text style={styles.cardTitle}>Football Field</Text>
      </TouchableOpacity>

      {/* Badminton Card */}
      <TouchableOpacity style={[styles.card, styles.badmintonCard]} onPress={() => handleBooking('Badminton')}>
        <Image source={require('../Assets/badminton.png')} style={styles.cardImage} />
        <Text style={styles.cardTitle}>Badminton Court</Text>
      </TouchableOpacity>

      {/* Cricket Card */}
      <TouchableOpacity style={[styles.card, styles.cricketCard]} onPress={() => handleBooking('Cricket')}>
        <Image source={require('../Assets/cricket.png')} style={styles.cardImage} />
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
  logoutButtonContainer: {
    marginRight: 20, // Adjust the value to move the button further left
  },
  title: {
    fontSize: 30, // Increased the font size for the username
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
    height: 200,
    marginVertical: 15,
    borderRadius: 16,
    elevation: 6, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignSelf: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  footballCard: {
    backgroundColor: '#d1f7c4', // Light green color for football card
  },
  badmintonCard: {
    backgroundColor: '#c4e3f7', // Light blue color for badminton card
  },
  cricketCard: {
    backgroundColor: '#f7d1c4', // Light orange color for cricket card
  },
  cardImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
