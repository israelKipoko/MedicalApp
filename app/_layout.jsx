import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import Auth from './auth/index'
import Home from './home/index';
import { getAccount } from '../backend/appwrite';
import GeneralContectProvider from '../context/GlobalContect';
import { useGlobalContext } from '../context/GlobalContect';

  function AuthNavigation() {
    return (
      <>
     <Auth />
     </>
    );
  }
  function HomeNavigation() {
    const {user} = useGlobalContext();
    return (
      <> 
      <Home/>
      </>
    );
  }

  function Navigation() {
    const {isLoggedIn} = useGlobalContext();
    return (
      <>
      {isLoggedIn ? <HomeNavigation/> : <AuthNavigation/>}
      </>
    );
  }

export default function App() {
    return (
        <>
        <GeneralContectProvider>
            <StatusBar style="dark" />
            <Navigation/>
        </GeneralContectProvider>
         
        </>
      );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    bottom: 100,
    zIndex: 100,
  },
})