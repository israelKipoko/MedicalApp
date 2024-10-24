import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { StatusBar } from 'expo-status-bar';

import Auth from './auth/index'
import Home from './home/index'



  function Navigation() {
    return (
      <>
     <Auth />
     <Home />
     </>
    );
  }
export default function App() {
    return (
        <>
          <StatusBar style="light" />
    
          <Navigation />
        </>
      );
}

const styles = StyleSheet.create({})