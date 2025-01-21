import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import GameRentalScreen from '../screens/GameRentalScreen';
import GameRentalRecordsScreen from '../screens/GameRentalRecordScreen';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBarLabel = ({ label, color }: { label: string; color: string }) => (
  <Text style={[styles.tabLabel, { color }]}>{label}</Text>
);

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#E0FFFF',
          height: 90,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopColor: '#B0E0E6',
          borderTopWidth: 2,
        },
        tabBarActiveTintColor: '#008080',
        tabBarInactiveTintColor: '#20B2AA',
        tabBarLabel: ({ focused, color }) => {
          const label =
            route.name === 'Home'
              ? 'Home'
              : route.name === 'Game Rental'
              ? 'Game Rental'
              : route.name === 'Rental Records'
              ? 'Rental Records'
              : 'Screen';
          return <CustomTabBarLabel label={label} color={color} />;
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Game Rental') {
            iconName = 'plus';
          } else if (route.name === 'Rental Records') {
            iconName = 'bars';
          } else {
            iconName = 'question';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Game Rental" component={GameRentalScreen} />
      <Tab.Screen name="Rental Records" component={GameRentalRecordsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
});

export default BottomNavigator;
