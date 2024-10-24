import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton';
import FlatButton from '../../components/FlatButton';
import { useNavigation } from '@react-navigation/native'
import { OtpInput  } from 'react-native-otp-entry';

export default function OtpEntry() {
    const navigation = useNavigation();

  return (
    <SafeAreaView className="py-6 px-4 h-full flex-1">
    <ScrollView className=""
       contentContainerStyle={{
       height: "100%",}}>
  <View className=" w-full my-auto flex justify-between items-center h-full py-6 px-2">
       <View className="">
           <Text className="font-bold text-center">
               Medical App Logo
           </Text>
       </View>
       <View className=" my-2 mt-9 mb-auto  h-full w-full flex">
           <Text className="font-bold text-left mb-4 text-[18px]">
               Vérification OTP  
           </Text>
           <View className="flex flex-col  h-[80%]">
           <View className="">
                <OtpInput 
                    numberOfDigits={4}
                    focusColor="#3081D0"
                    onTextChange={text => console.log(text)}
                    containerStyle={styles.container}
                    inputsContainerStyle={styles.inputsContainer}
                    pinCodeContainerStyle={styles.pinCodeContainer}
                    pinCodeTextStyle={styles.pinCodeText}
                    focusStickStyle={styles.focusStick}
                    focusStickBlinkingDuration={500}
                    />

                <FlatButton  textStyles="text-center text-primary-200 font-bold mt-4" onPress={() => navigation.navigate('Signup')}>
                   Renvoyer le code
                </FlatButton>
           </View>
            <CustomButton
               title="Valider"
            //    handlePress={() => navigation.navigate('OtpEntry')}
               containerStyles="w-full mt-auto font-bold rounded-full bg-primary-200 "/>
           </View>
       </View>
   </View>

   </ScrollView>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    r:{
        borderColor:"#3081D0"
    }
})