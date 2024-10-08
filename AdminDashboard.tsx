import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default function AdminDashboardScreen({ route, navigation }) {
  const handleLogout = () => {
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
      navigation.navigate('AdminFootballFields');
    } else if (sport === 'Badminton') {
      navigation.navigate('BadmintonCourts');
    } else if (sport === 'Cricket') {
      navigation.navigate('CricketFields');
    }
  };

  const handleNavigation = (route: string) => {
    if (route === 'AdminDashboard') {
      navigation.navigate('AdminDashboard');
    } else if (route === 'EventDetails') {
      navigation.navigate('EventDetails');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Admin!</Text>

      {/* Football Card */}
      <TouchableOpacity style={[styles.card, styles.footballCard]} onPress={() => handleBooking('Football')}>
        <Text style={styles.cardTitle}>Football Field</Text>
      </TouchableOpacity>

      {/* Badminton Card */}
      <TouchableOpacity style={[styles.card, styles.badmintonCard]} onPress={() => handleBooking('Badminton')}>
        <Text style={styles.cardTitle}>Badminton Court</Text>
      </TouchableOpacity>

      {/* Cricket Card */}
      <TouchableOpacity style={[styles.card, styles.cricketCard]} onPress={() => handleBooking('Cricket')}>
        <Text style={styles.cardTitle}>Cricket Field</Text>
      </TouchableOpacity>

      {/* Footer Navbar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('AdminDashboard')}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('EventDetails')}>
          <Text style={styles.navButtonText}>Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  card: {
    width: '90%',
    height: 150, // Adjusted card height
    padding: 20,
    marginVertical: 10,
    borderRadius: 12, // Rounded corners for card effect
    elevation: 6, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center', // Align content to center vertically
  },
  footballCard: {
    backgroundColor: '#d1f7c4', // Light green color for football card
  },
  badmintonCard: {
    backgroundColor: '#c4e3f7', // Light blue color for badminton card
  },
  cricketCard: {
    backgroundColor: '#f7e3c4', // Light orange color for cricket card
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});
