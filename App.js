import React, { Component } from 'react'
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './views/HomeScreen'
import DueDateScreen from './views/DueDateScreen'
import ActivityLevelScreen from './views/ActivityLevelScreen'
import SuccessScreen from './views/SuccessScreen'

const Stack = createStackNavigator()

export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTransparent: true }}>
          <Stack.Screen name="Home" component={HomeScreen} options={screenOptions} />
          <Stack.Screen name="DueDate" component={DueDateScreen} options={screenOptions} />
          <Stack.Screen name="ActivityLevel" component={ActivityLevelScreen} options={screenOptions} />
          <Stack.Screen name="Success" component={SuccessScreen} options={screenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const screenOptions = { title: '', headerBackTitleVisible: false }