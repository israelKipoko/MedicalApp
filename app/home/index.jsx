import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export default function home() {
    const Stack = createNativeStackNavigator();
  return (
    <>
    <Stack.Navigator  initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome}  options={{
          headerShown: false,
        }} />
      </Stack.Navigator>
      <StatusBar backgroundColor="#161622" style="light" />
      </>
  )
}

const styles = StyleSheet.create({})