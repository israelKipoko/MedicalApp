import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import Login from './Login'; 
import Signup from './Signup'; 
import Welcome from '../Welcome'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import Crendentials from './signup-process/Crendentials';
import PersoInfos from './signup-process/PersoInfos';
import PhoneNumber from './signup-process/PhoneNumber';
import OtpEntry from './signup-process/OtpEntry';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
 
function AuthStack() {
    return (
      <>
      <Stack.Navigator>
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
        </>
    );
  }
  function WelcomeStack() {
    return (
      <>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome}  options={{headerShown: false,}} />

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
        </>
    );
  }
  function Navigation({isUsedBefore}) {
    return (
      <NavigationContainer>
        {isUsedBefore? <AuthStack /> : <WelcomeStack />}
      </NavigationContainer>
    );
  }
export default function Auth() {
  const [isUsedBefore, setIsUsedBefore] = useState(false);
  async function getData() {
    const logData = await AsyncStorage.getItem('isUsedBefore');
      setIsUsedBefore(JSON.parse(logData));
   }
   useEffect(() => {
    getData();
   }, [])
    return (
        <>
     <StatusBar style="dark" />
          <Navigation isUsedBefore={isUsedBefore}/>
        </>
      );
}

const styles = StyleSheet.create({})