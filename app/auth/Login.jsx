import { StyleSheet, Text, View, ScrollView, Image, Button   } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton';
import Input from '../components/Input';
import FlatButton  from '../components/FlatButton';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import GoogleIcon from '../../assets/icons/google-icon.png'
import AppleIcon from '../../assets/icons/apple-icon.png'
import { useNavigation } from '@react-navigation/native';


export default function Login() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="px-4 h-full border flex-1 bg-secondary-100">
    <ScrollView className=" h-full"
        contentContainerStyle={{
        height: "100%",}}>
        <View className=" w-full my-auto flex justify-between items-center h-full py-6 px-2">
            <View className="">
                <Text className="font-bold text-center">
                    Medical App Logo
                </Text>
            </View>
            <View className=" my-2  w-full flex">
                <Text className="font-bold text-center mb-4 text-[20px]">
                    LOGIN 
                </Text>
                <View className="">
                <View className="mb-6">
                    <Input
                        label="Email"
                        className="w-full border"
                        // onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                        // value={enteredEmail}
                        keyboardType="email-address"
                        placeholder={'Entrez votre email'}
                        // isInvalid={emailIsInvalid}
                        />
                    <Input
                        label="Mot de passe"
                        className="w-full"
                        // onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                        // value={enteredEmail}
                        secure={true}
                        placeholder={'Entrez votre mot de passe'}
                        // isInvalid={emailIsInvalid}
                        />
                    <FlatButton textStyles="text-left" onPress={() => navigation.navigate('Signup')}>
                        Mot de passe oublié?
                    </FlatButton>
                </View>
                 <CustomButton
                    title="Se Connecter"
                    // handlePress={() => navigation.replace('Login')}
                    containerStyles="w-full mt-4 font-bold rounded-full bg-primary-200 "/>
                </View>
            </View>
            <View className='w-full flex flex-row items-center justify-center gap-x-4'>
                    <View className="border border-2 border-secondary-200 w-full " ></View><Text className="font-bold capitalize">OU</Text><View className="border border-2 border-secondary-200 w-full"></View>
            </View>
            <View className='flex flex-col  w-full gap-y-4'>
            <CustomButton
                title="Google"
                icon={GoogleIcon}
                iconStyles="w-[28px] h-[28px]"
                // handlePress={() => router.push("/sign-in")}
                containerStyles="w-full mt-7 rounded-full bg-primary-200"/>
            <CustomButton
            title="Apple"
            icon={AppleIcon}
            iconStyles="w-[36px] h-[36px]"
            // handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7 rounded-full bg-primary-200"/>
            </View>
            <View className="flex flex-row items-center">
                <Text>Vous n'avez pas un compte?</Text>
                <FlatButton  textStyles="text-left font-bold text-primary-200" onPress={() => navigation.navigate('Signup')}>
                  Créer un compte
                </FlatButton>
            </View>
        </View>
    </ScrollView>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({})