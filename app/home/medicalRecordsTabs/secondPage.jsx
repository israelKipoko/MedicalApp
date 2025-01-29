import Input from '../../../components/Input'
import React, { useState} from 'react'
import { Text, View, ScrollView,Pressable, TouchableOpacity } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { modifyMedicalRecord } from '../../../backend/appwrite'
import { useGlobalContext } from '../../../context/GlobalContect'
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../../components/CustomButton';
import { useNavigation } from '@react-navigation/native'

const SecondPage = () => {
    const { user, updateUserInfo} = useGlobalContext();
    const navigation = useNavigation();

    const [bloodType, setBloodType] = useState(user.medicalRecords? user.medicalRecords.bloodType:'');
    const [weight, setWeight] = useState(user.medicalRecords? user.medicalRecords.weight:0);
    const [height, setHeight] = useState(user.medicalRecords? user.medicalRecords.height:0);
    const [streetNumber, setStreetNumber] = useState(user.medicalRecords? user.medicalRecords.address[0]:0);
    const [street, setStreet] = useState(user.medicalRecords? user.medicalRecords.address[1]:'');
    const [district, setDistrict] = useState(user.medicalRecords? user.medicalRecords.address[2]:'');
    const [city, setCity] = useState(user.medicalRecords? user.medicalRecords.address[3]:'');
    const [country, setCountry] = useState(user.medicalRecords? user.medicalRecords.address[4]:'');
    const [countryLabel, setCountryLabel] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [openGenderPicker, setOpenGenderPicker] = useState(false);
    const [openCountryPicker, setOpenCountryPicker] = useState(false);
    const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
    
    const changeBloodType = (itemValue, itemIndex) => {
        setBloodType(itemValue);
        checkChanges()
        setOpenGenderPicker(!openGenderPicker);
    }

    const changeCountry = (itemValue, itemIndex) => {
        setCountry(itemValue);
        if(itemValue == 'cd'){
            setCountryLabel('République Démocratique du Congo');
        }else if(itemValue == 'cog'){
            setCountryLabel('Congo Brazzaville');
        }
        checkChanges()
        setOpenCountryPicker(!openCountryPicker);
    }

    function checkChanges() {
        setIsSaveButtonEnabled(bloodType !== user.medicalRecords?.bloodType || weight !== user.medicalRecords?.weight || height !== user.medicalRecords?.height || country !== user.medicalRecords?.country); 
    }

    const incrementWeight = (operation) => {
        if(operation == 'decrement'){
            if(value > 1){
                setWeight((prev) => {
                    const newValue = Math.max(parseFloat(prev) - 1, 0).toFixed(2);
                    return newValue.toString();
                  });
            }
        }

        if(operation == 'increment'){
            setWeight((prev) => (parseFloat(prev) + 1).toFixed(2).toString());
        }
    }
    const incrementHeight = (operation) => {
        if(operation === 'decrement'){
            if(value > 1){
                setHeight((prev) => {
                    const newValue = Math.max(parseFloat(prev) - 1, 0).toFixed(2);
                    return newValue.toString();
                  });
            }
        }

        if(operation === 'increment'){
            setHeight((prev) => (parseFloat(prev) + 1).toFixed(2).toString());
        }
    }
    const handleWeightChange = (value) => {
        // Allow only numbers and a single decimal point
        if (/^\d*(,\d*)?$/.test(value)) {
          setWeight(value === "" ? "0" : value);
        }
      };
      const handleHeightChange = (value) => {
        // Allow only numbers and a single decimal point
        if (/^\d*(,\d*)?$/.test(value)) {
          setHeight(value === "" ? "0" : value);
        }
      };
    const handleNumberChange = (value)  => {
        if (/^\d+$/.test(value)) {
            setStreetNumber(value === "" ? "0" : value);
          }
    }
       async function saveUpdate() {
            setIsLoading(true);
                let params = {
                    weight: weight,
                    height: height,
                    bloodType: bloodType,
                    address: [
                        streetNumber,
                        street,
                        district,
                        city,
                        country,
                      ],
                    users: [user.$id]
                }
                await modifyMedicalRecord(params,user.medicalRecords?.$id)
                .then(() => {
                    setIsLoading(false);
                    updateUserInfo();
                    navigation.navigate('MedicalRecords');
                }).catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
        }
  return (
    <SafeAreaProvider>
    <SafeAreaView className="px-1 h-full flex-1  bg-[#F7F7F8]" edges={['top']}>
        <ScrollView className=" " contentInsetAdjustmentBehavior="automatic" >
            <View className=" w-full my-auto flex flex-col gap-y-6 items-center mt-1  px-2">
                <Text className="font-bold text-[20px] text-black-100">Page 2</Text>
                <View className='w-full flex flex-col gap-y-2 px-4 mt-2'>
                    <View className='flex  flex-row items-center justify-between'>
                        <TouchableOpacity onPress={() =>incrementWeight("decrement")} className='w-[15%] border h-12 flex items-center justify-center mt-5 rounded-md border-[#6DB9EF]'>
                            <Text className='font-bold text-[20px]'>-</Text>
                        </TouchableOpacity>
                        <View className='w-[65%]'>
                            <Input
                                label="Poids (kg)"
                                className="w-full border"
                                keyboardType={'decimal-pad'}
                                value={weight == 0? '':weight}
                                onUpdateValue={(e) =>{handleWeightChange(e); checkChanges()}}
                                inputStyle={'opacity-[0.5] full'}
                                placeholder={'65 Kg'}
                                />
                        </View>
                        <TouchableOpacity onPress={() =>incrementWeight('increment')} className='w-[15%] h-12 border flex items-center justify-center mt-5 rounded-md border-[#6DB9EF]'>
                            <Text className='font-bold text-[18px]'>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex  flex-row items-center justify-between'>
                        <TouchableOpacity onPress={() =>incrementHeight("decrement")} className='w-[15%] border h-12 flex items-center justify-center mt-5 rounded-md border-[#6DB9EF]'>
                            <Text className='font-bold text-[20px]'>-</Text>
                        </TouchableOpacity>
                        <View className='w-[65%]'>
                            <Input
                                label="Taille (m)"
                                className=" border"
                                keyboardType={'decimal-pad'}
                                value={height == 0? '':height}
                                onUpdateValue={(e) =>{handleHeightChange(e); checkChanges()}}
                                inputStyle={'opacity-[0.5]'}
                                placeholder={'2.50 m'}
                            />
                        </View>
                        <TouchableOpacity onPress={() => incrementHeight("increment")} className='w-[15%] h-12 border flex items-center justify-center mt-5 rounded-md border-[#6DB9EF]'>
                            <Text className='font-bold text-[18px]'>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {!openGenderPicker && (
                            <Pressable onPress={() => setOpenGenderPicker(!openGenderPicker)}>
                                <Input
                                label={"Groupe Sanguin"}
                                className="capitalize w-full"
                                value={bloodType}
                                placeholder={'Sélectionner votre groupe sanguin'}
                                onUpdateValue={(e) =>{ setBloodType(e)}}
                                pressIn={() => setOpenGenderPicker(!openGenderPicker)}
                                />
                            </Pressable>
                        )}
                            {openGenderPicker && (
                        
                            <View className="-mt-16 mb-1">
                                <Picker
                                    selectedValue={bloodType}
                                    onValueChange={changeBloodType}>
                                    <Picker.Item label="A+" value="A+" />
                                    <Picker.Item label="A-" value="A-" />
                                    <Picker.Item label="B+" value="B+" />
                                    <Picker.Item label="B-" value="B-" />
                                    <Picker.Item label="AB+" value="AB+" />
                                    <Picker.Item label="AB-" value="AB-" />
                                    <Picker.Item label="O+" value="O+" />
                                    <Picker.Item label="O-" value="O-" />
                                </Picker>
                                <View  className=' flex flex-row justify-evenly'>
                                    <CustomButton
                                    title="Confirmer"
                                    handlePress={() =>{bloodType? changeBloodType(bloodType): changeBloodType('A+')}}
                                    containerStyles="w-[150px] font-bold -mt-4 rounded-lg bg-primary-200"
                                    textStyles={"text-white"}/>
                                    <CustomButton
                                    title="Annuler"
                                    handlePress={() => setOpenGenderPicker(false)}
                                    containerStyles="w-[150px] font-bold -mt-4 rounded-lg bg-gray-200"
                                    textStyles={"text-primary-100"}/>
                                </View>
                            </View>
                            )}
                    </View>
                    <View className="">
                        <View className="flex flex-row justify-between">
                            <View className="flex flex-row  w-[27%]">
                                <Input
                                    label={"N°"}
                                    className="capitalize"
                                    keyboardType={'numeric'}
                                    value={streetNumber}
                                    placeholder={'00'}
                                    onUpdateValue={(e) =>{ handleNumberChange(e)}}
                                    />
                            </View>
                          
                            <View className="flex flex-row  w-[70%]">
                                <Input
                                    label={"Avenue"}
                                    className="capitalize"
                                    value={street}
                                    placeholder={'Entrez votre avenue de résidence'}
                                    onUpdateValue={(e) =>{ setStreet(e)}}
                                    />
                            </View>
                        </View>
                            <Input
                                label={"Quartier"}
                                className="capitalize"
                                value={district}
                                placeholder={'Entrez votre quartier de résidence'}
                                onUpdateValue={(e) =>{ setDistrict(e)}}
                                />
                            <Input
                                label={"Ville"}
                                className="capitalize"
                                value={city}
                                placeholder={'Entrez votre ville de résidence'}
                                onUpdateValue={(e) =>{ setCity(e)}}
                                />
                           <View>
                        {!openCountryPicker && (
                            <Pressable onPress={() => setOpenCountryPicker(!openCountryPicker)}>
                                <Input
                                label={"Pays"}
                                className="capitalize w-full"
                                value={countryLabel}
                                placeholder={'Sélectionner votre groupe sanguin'}
                                pressIn={() => setOpenCountryPicker(!openCountryPicker)}
                                />
                            </Pressable>
                        )}
                            {openCountryPicker && (
                        
                            <View className="-mt-12 mb-1">
                                <Picker
                                    selectedValue={country}
                                    onValueChange={changeCountry}>
                                    <Picker.Item label="République Démocratique du Congo" value="cd" />
                                    <Picker.Item label="Congo Brazzaville" value="cog" />
                                </Picker>
                                <View  className=' flex flex-row justify-evenly'>
                                    <CustomButton
                                    title="Confirmer"
                                    handlePress={() => {country? changeCountry(country): changeCountry('cd')}}
                                    containerStyles="w-[150px] font-bold -mt-4 rounded-lg bg-primary-200"
                                    textStyles={"text-white"}/>
                                    <CustomButton
                                    title="Annuler"
                                    handlePress={() => setOpenCountryPicker(false)}
                                    containerStyles="w-[150px] font-bold -mt-4 rounded-lg bg-gray-200"
                                    textStyles={"text-primary-100"}/>
                                </View>
                            </View>
                            )}
                    </View>
                    <CustomButton
                        title="Confirmer"
                        handlePress={saveUpdate}
                        containerStyles="w-full mt-12 font-bold rounded-lg bg-primary-200"
                        isDisabled={!isSaveButtonEnabled}
                        isLoading={isLoading}/>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
</SafeAreaProvider>
  )
}

export default SecondPage