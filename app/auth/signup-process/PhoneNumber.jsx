import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React,  { useState, useRef }  from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { register, sendMessage } from '../../../backend/appwrite';
import PhoneInput from 'react-native-phone-input'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PhoneNumber({ route }) {
 const { email, password, name, surname, firstname, gender, birthdate} = route.params;

    const navigation = useNavigation();
    const phoneRef = useRef(null);
    const [phone, setPhone] = useState("");
    const [phoneIsInvalid, setPhoneIsInvalid] = useState(false);
    const [phoneTexterror, setPhoneTexterror] = useState();

    async function submit() {
        const canSubmit = checkInfos();
        if(canSubmit){
            try {
               const user = await register(email,password,name,surname,firstname,gender,birthdate,phone);
                // await sendMessage(phone);
                 AsyncStorage.setItem('isUsedBefore', JSON.stringify(true));
                // AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                navigation.navigate('Homepage')
            } catch (error) {
                console.log(error.message)
            }
        }
    };
   function checkInfos() {
    if (phoneRef.current && phoneRef.current.isValidNumber()) {
      setPhone(phoneRef.current.getValue());
      setPhoneIsInvalid(false);
      setPhoneTexterror(false)
      return true;
     }else{
      setPhoneIsInvalid(true);
      setPhoneTexterror(true)
      return false;
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
           <View className="flex" style={styles.inputContainer} >
           <Text style={[styles.label, phoneTexterror && styles.labelInvalid]}>
              Téléphone : 
            </Text>
           <PhoneInput 
            ref={phoneRef}
          className='border h-13 w-full '
          onChangePhoneNumber={checkInfos}
          style={[styles.input, phoneIsInvalid && styles.inputInvalid]}
             textStyle={{ fontSize: 16,}}
              allowZeroAfterCountryCode={false}
              autoFormat={'AreaCode'}
              initialCountry='cd'
              initialValue='243'
              textProps={{
                placeholder: 'Enter a phone number...'
            }}
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

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  labelInvalid: {
    color: 'red',
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: 8,
    fontSize: 16,
    width: '100%',
    borderColor: '#6DB9EF',
  },
  inputInvalid: {
    borderColor: "red",
  },
})