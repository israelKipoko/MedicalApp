import { StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabsLayout from '../(tabs)/_layout';
import MedicalRecords from './medicalRecords';
import MedicalRecordsTabs from './medicalRecordsTabs';

const Stack = createNativeStackNavigator();

function Navigation() {

  return (
    <NavigationContainer>
          <Stack.Navigator  initialRouteName="TabsLayout">
            <Stack.Screen name="TabsLayout" component={TabsLayout} options={{
                  headerShown: false,
                }} />
            <Stack.Screen name="MedicalRecords" component={MedicalRecords} options={{
                  headerShown: false,
                }} />
            <Stack.Screen name="MedicalRecordsTabs" component={MedicalRecordsTabs} options={{
              headerStyle: {backgroundColor: 'none'},
                  headerShown: true,
                  title: 'Dossier Médical',
                }} />
            </Stack.Navigator>
    </NavigationContainer>
  );
}
export default function Home() {
  return (
    <>
      <Navigation />
    </>
  )
}

const styles = StyleSheet.create({})