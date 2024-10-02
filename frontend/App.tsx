import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import FootballFieldsScreen from './src/screens/FootballFieldsScreen';
import BadmintonCourtsScreen from './src/screens/BadmintonCourtsScreen';
import BookingScreen from './src/screens/BookingScreen';
import PaymentOptionsScreen from './src/screens/PaymentOptionsScreen';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="FootballFields" component={FootballFieldsScreen} options={{ title: 'Football Fields' }} />
        <Stack.Screen name="BadmintonCourts" component={BadmintonCourtsScreen} options={{ title: 'Badminton Courts' }} />
        <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Book Field/Court' }} />
        <Stack.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
