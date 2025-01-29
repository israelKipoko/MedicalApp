import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input';
import FlatButton  from '../../components/FlatButton';
import React from 'react'
import GoogleIcon from '../../assets/icons/google-icon.png'
import AppleIcon from '../../assets/icons/apple-icon.png'
import { useNavigation } from '@react-navigation/native';
import {signIn} from '../../backend/appwrite';
import { useGlobalContext } from '../../context/GlobalContect';

export default function Login() {
    const navigation = useNavigation();
    const {checkLogin} = useGlobalContext();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
    const [emailTextError, setEmailTextError] = useState("");
    const [passwordTextError, setPasswordTextError] = useState("");

    const checkInfos = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailIsValid = true;
        let passwordIsValid = true;
        if (email === "") {
            setEmailIsInvalid(true);
            setEmailTextError("Ce champ est obligatoire*");
            emailIsValid = false;
          }else if(!emailRegex.test(email)){
            setEmailIsInvalid(true);
            setEmailTextError("L'email entré est invalide!");
            emailIsValid = false;
          }else{
            setEmailIsInvalid(false);
            emailIsValid = true;
        }
        if (password === "") {
            setPasswordIsInvalid(true);
            setPasswordTextError("Ce champ est obligatoire*");
            passwordIsValid = false;
          }else if(password.length < 5) {
            setPasswordIsInvalid(true);
            setPasswordTextError("Le mot de passe doit comporter au moins 5 caractères!");
            passwordIsValid = false;
          }else{
            setPasswordIsInvalid(false);
            passwordIsValid = true;
          }
          return (emailIsValid && passwordIsValid);
    }
    function submit() {
          setIsSubmitting(true);
        const canSubmit = checkInfos();
        if(canSubmit){
            signIn(email, password)
            .then((res) => {
                setIsSubmitting(false);
                checkLogin();
            }).catch((error) => {
                console.log(error.message)
                setIsSubmitting(false);
            })
        }else{
            setIsSubmitting(false);
        }
    }
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
                        value={email}
                        onUpdateValue={(e) => setEmail(e)}
                        keyboardType="email-address"
                        placeholder={'Entrez votre email'}
                        isInvalid={emailIsInvalid}
                        ErrorText={emailTextError}
                        />
                    <Input
                        label="Mot de passe"
                        className="w-full"
                        value={password}
                        onUpdateValue={(e) => setPassword(e)}
                        secure={true}
                        placeholder={'Entrez votre mot de passe'}
                        isInvalid={passwordIsInvalid}
                        ErrorText={passwordTextError}
                        />
                    {/* <FlatButton textStyles="text-left">
                        Mot de passe oublié?
                    </FlatButton> */}
                </View>
                 <CustomButton
                    title="Se Connecter"
                    handlePress={submit}
                    isLoading={isSubmitting}
                    containerStyles="w-full mt-4 font-bold rounded-full bg-primary-200 "/>
                </View>
            </View>
            <View className='w-full flex flex-row items-center justify-center gap-x-4'>
                    <View className="border border-2 border-secondary-200 w-full " ></View><Text className="font-bold capitalize">OU</Text><View className="border border-2 border-secondary-200 w-full"></View>
            </View>
            <View className='flex flex-col  w-full gap-y-4'>
            <CustomButton
                title="Google"
                image={GoogleIcon}
                imageStyles="w-[28px] h-[28px]"
                // handlePress={() => router.push("/sign-in")}
                containerStyles="w-full mt-7 rounded-full bg-primary-200"/>
            <CustomButton
            title="Apple"
            image={AppleIcon}
            imageStyles="w-[36px] h-[36px]"
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