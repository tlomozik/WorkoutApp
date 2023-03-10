/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {StyleSheet, Image, View} from 'react-native';
import Home from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import ProfileScreen from './screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {headerColor} from './style/variables';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    //  <View style={{backgroundColor: 'red'}}>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'ABeeZee-Regular',
          },
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: '#7A7A7A',
          tabBarInactiveBackgroundColor: headerColor,
          headerStyle: {
            backgroundColor: headerColor, // zmiana koloru tła nagłówka
          },
          tabBarItemStyle: {
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          },
          tabBarStyle: {
            marginTop: -100,
            borderTopWidth: 0,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            height: 55,
            backgroundColor: headerColor, // zmiana koloru tła dolnego paska nawigacji
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'Ćwiczenia',
            tabBarIcon: () => (
              <Image
                source={require('../assets/list.png')}
                style={{width: 40, height: 40}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{
            headerTitle: 'Trening',
            tabBarIcon: () => (
              <Image
                source={require('../assets/dumbbell.png')}
                style={{width: 40, height: 40}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: 'Profil',
            tabBarIcon: () => (
              <Image
                source={require('../assets/user.png')}
                style={{width: 40, height: 40}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    // </View>
  );
};

const styles = StyleSheet.create({});

export default App;
