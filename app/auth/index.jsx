import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './Login'; 
import Signup from './Signup'; 
import Welcome from './Welcome'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import Crendentials from './signup-process/Crendentials';
import PersoInfos from './signup-process/PersoInfos';
import PhoneNumber from './signup-process/PhoneNumber';
import OtpEntry from './signup-process/OtpEntry';

const Stack = createNativeStackNavigator();
 
function AuthStack() {
    return (
      <>
      <Stack.Navigator  initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome}  options={{
            headerShown: false,
          }} />
        <Stack.Screen name="Login" component={Login} options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="Signup" component={Signup} options={{
            headerShown: false,
          }}/>

        <Stack.Screen name="Credentials" component={Crendentials}  options={{
            headerShown: false,
          }} />
        <Stack.Screen name="PersoInfos" component={PersoInfos} options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{
            headerShown: false,
          }}/>
           <Stack.Screen name="OtpEntry" component={OtpEntry} options={{
            headerShown: false,
          }}/>
      </Stack.Navigator>
        <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
  }
  function Navigation() {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }
export default function Auth() {
    return (
        <>
          
    
          <Navigation />
        </>
      );
}

const styles = StyleSheet.create({})