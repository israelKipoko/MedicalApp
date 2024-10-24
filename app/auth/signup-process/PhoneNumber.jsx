import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React,  { useState }  from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import { register, sendMessage } from '../../backend/appwrite';
// import PhoneInput from 'react-native-phone-input';
// import CountryPicker from 'react-native-country-picker-modal';

export default function PhoneNumber({ route }) {
  const { email, password, name, surname, firstname, gender, birthdate} = route.params;

    const navigation = useNavigation();

    const [phone, setPhone] = useState("");
    const [phoneIsInvalid, setPhoneIsInvalid] = useState(false);
    const [phoneTexterror, setPhoneTexterror] = useState("");
    
    function checkInfos(){
        let canSubmit = true;
        if (phone === "") {
          setPhoneIsInvalid(true);
          setPhoneTexterror("Ce champ est obligatoire*");
          canSubmit = false;
        }else if(phone.length <= 9){
          setPhoneIsInvalid(true);
          setPhoneTexterror("Le numéro de téléphone entré est invalide!");
          canSubmit = false;
        }else{
            setPhoneIsInvalid(false);
            canSubmit = true;
        }

        return canSubmit;
    }
    async function submit() {
        const canSubmit = checkInfos();
        if(canSubmit){
            try {
               const user = await register(email,password,name,surname,firstname,gender,birthdate,phone);
                await sendMessage(phone);
                navigation.navigate('Otpentry', { phone: phone })
            } catch (error) {
                console.log(error)
            }
        }
    }
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
               <Input
                   label="Téléphone"
                   className="w-full border"
                   value={phone}
                    onUpdateValue={(e) => setPhone(e)}
                   keyboardType="phone-pad"
                   placeholder={'Entrez votre numéro de téléphone'}
                   isInvalid={phoneIsInvalid}
                   ErrorText={phoneTexterror}
                   />
           </View>
            <CustomButton
               title="Vérifier"
               handlePress={submit}
               containerStyles="w-full mt-auto font-bold rounded-full bg-primary-200 "/>
           </View>
       </View>
   </View>

   </ScrollView>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({})