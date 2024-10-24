import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input';
import FlatButton  from '../../components/FlatButton';
import GoogleIcon from '../../../assets/icons/google-icon.png';
import AppleIcon from '../../../assets/icons/apple-icon.png'
import { useNavigation } from '@react-navigation/native';

export default function Crendentials() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailTextError, setEmailTextError] = useState("");
    const [passwordTextError, setPasswordTextError] = useState("");
    const [confirmPasswordTextError, setConfirmPasswordTextError] = useState("");
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
    const [confirmPasswordIsInvalid, setConfirmPasswordIsInvalid] = useState(false);

    function checkInfos(){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailIsValid = true;
        let passwordIsValid = true;
        let confirmPasswordIsValid = true;
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
        if (confirmPassword === "") {
            setConfirmPasswordIsInvalid(true);
            setConfirmPasswordTextError("Ce champ est obligatoire*");
            confirmPasswordIsValid = false;
          }else if(password != confirmPassword){
            setConfirmPasswordIsInvalid(true);
            setConfirmPasswordTextError("Le mot de passe ne correspond pas!");
            confirmPasswordIsValid = false;
          }else{
            setConfirmPasswordIsInvalid(false);
            confirmPasswordIsValid = true;
          }

          return (emailIsValid && passwordIsValid && confirmPasswordIsValid);
    }
    function submit() {
        const canSubmit = checkInfos();
        if(canSubmit)
            navigation.navigate('PersoInfos', { email: email, password: password })
    }
  return (
    <SafeAreaView className=" px-4 h-full flex-1">
         <ScrollView className=""
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
                    SIGN UP 
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
                    <Input
                        label="Confirmer le mot de passe"
                        className="w-full"
                        value={confirmPassword}
                        onUpdateValue={(e) => setConfirmPassword(e)}
                        secure={true}
                        placeholder={'Entrez votre mot de passe'}
                        isInvalid={confirmPasswordIsInvalid}
                        ErrorText={confirmPasswordTextError}
                        />
                </View>
                 <CustomButton
                    title="Continuer"
                    handlePress={submit}
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
                <Text>Vous avez déjà un compte?</Text>
                <FlatButton  textStyles="text-left font-bold text-primary-200" onPress={() => navigation.navigate('Login')}>
                  Se connecter
                </FlatButton>
            </View>
        </View>

        </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({})