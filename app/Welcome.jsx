import { StyleSheet, Text, View, ScrollView, Dimensions,Image   } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton';
import { ResizeMode, Video }  from 'expo-av';
import DoctorPhoto from '../assets/images/Doctor-photo-1.jpg'
import DoctorVideo from '../assets/videos/doctor-1.mp4'
import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');

export default function Welcome() {
    const navigation = useNavigation();

  return (
    <SafeAreaView className="py-6 px-4 h-full flex-1 ">
        <View className="w-[100vw] h-[100vh] bg-primary-100 opacity-[0.55]" style={styles.backgroundVideo}>
         <Image
         className="h-full w-full"
        source={require("../assets/images/Doctor-photo-1.jpg")} 
        style={styles.backgroundVideo}
        resizeMode="cover"/>
         </View>
        <ScrollView className=" "
            contentContainerStyle={{
            height: "100%",}}>
            <View className=" w-full my-auto flex justify-between items-center h-[80%] py-6 px-4">
                <View className=" my-6">
                    <Text className="font-bold text-center">
                        Medical App Logo
                    </Text>
                </View>
                <View className="my-">
                    <Text className="font-bold text-center">
                    Catch Phrase
                    </Text>
                </View>
                <CustomButton
                title="Commencer"
                handlePress={() => navigation.replace('Login')}
                containerStyles="w-full font-bold rounded-full bg-primary-200"/>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
})