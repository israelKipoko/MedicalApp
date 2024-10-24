import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import Credentials from './signup-process/Crendentials';

export default function Signup() {
  return (
    <>
  <StatusBar backgroundColor="#161622" style="light" />
    <Credentials />
  </>
   
  )
}

const styles = StyleSheet.create({})