import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { User, Phone, CalendarFold, CircleUserRound, Droplet, Weight, PersonStanding, ShieldQuestion } from 'lucide-react-native'
import { useGlobalContext } from '../../context/GlobalContect'
import { useNavigation } from '@react-navigation/native'
import { format, differenceInYears, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale'

const MedicalRecords = () => {
    const { user } = useGlobalContext();
    const navigation = useNavigation();

    const calculateAge = (birthdate) => {
        const birthDate = parseISO(birthdate);
      
        const currentDate = new Date();
      
        const age = differenceInYears(currentDate, birthDate);
      
        return age;
      };
  return (
     <SafeAreaProvider>
            <SafeAreaView className="px-1 h-full flex-1  bg-[#F7F7F8]" edges={['top']}>
                <ScrollView className=" " contentInsetAdjustmentBehavior="automatic" >
                    <View className=" mt-4 py-3 px-4">
                        <View className=" w-full my-auto flex flex-row items-center justify-between gap-y-6">
                            <Text className="font-bold text-[27px] text-black-100">Fiche Médicale</Text>
                        </View>
                        <View className="mt-2">
                            <Text className="opacity-[0.5] text-[15px]">Votre dossier médical sera consulté par les médecins qui vous consulteront. Remplissez-le correctement et soigneusement</Text>
                        </View>
                    </View>
                    <View className="px-4 flex flex-col gap-y-4">
                            <TouchableOpacity onPress={()=> navigation.navigate("MedicalRecordsTabs")} className="ml-auto mr-3">
                                <Text className="text-[#3081D0] text-[16px] font-bold">
                                    Modifier
                                </Text>
                            </TouchableOpacity>
                        <View  className='border h-13 w-full flex flex-row justify-between ' style={styles.input}>
                            <View className='flex flex-row gap-x-3 items-center'>
                                <User color={"#3081D0"}/>
                                <Text  className="capitalize opacity-[0.5] text-[17px] mr-3">Prénom</Text>
                            </View>
                             <Text className="capitalize  text-[17px] mr-3">{user.firstname}</Text>
                        </View>
                        <View  className='border h-13 w-full flex flex-row justify-between' style={styles.input}>
                            <View className='flex flex-row gap-x-3 items-center'>
                                <User color={"#3081D0"}/>
                                <Text  className="capitalize opacity-[0.5] text-[17px] mr-3">Nom</Text>
                            </View>
                             <Text className="capitalize  text-[17px] mr-3">{user.name}</Text>
                        </View>
                        <View  className='border h-13 w-full flex flex-row justify-between' style={styles.input}>
                            <View className='flex flex-row gap-x-3 items-center'>
                                <User color={"#3081D0"} />
                                <Text  className="capitalize opacity-[0.5] text-[17px] mr-3">Postnom</Text>
                            </View>
                             <Text className="capitalize  text-[17px] mr-3">{user.surname}</Text>
                        </View>
                        <View  className='border h-13 w-full flex flex-row justify-between' style={styles.input}>
                            <View className='flex flex-row gap-x-3 items-center'>
                                <CalendarFold color={"#3081D0"}/>
                                <Text  className="capitalize opacity-[0.5] text-[17px] mr-3">Date de naissance</Text>
                            </View>
                             <Text className="capitalize  text-[17px] mr-3">{format(user.birthdate, 'dd MMMM yyyy', { locale: fr })}</Text>
                        </View>
                        <View  className='border h-13 w-full flex flex-row justify-between' style={styles.input}>
                            <View className='flex flex-row gap-x-3 items-center'>
                                <CircleUserRound color={"#3081D0"}/>
                                <Text  className="capitalize opacity-[0.5] text-[17px] mr-3">âge</Text>
                            </View>
                            <View className="flex flex-row gap-x-[0.5] items-center mr-3">
                                <Text className="capitalize  text-[17px] ">{calculateAge(user.birthdate)}</Text>
                                <Text>ans</Text>
                            </View>
                        </View>
                        <View  className='border h-13 w-full flex flex-row justify-between' style={styles.input}>
                            <View className='flex flex-row gap-x-3 items-center'>
                                <ShieldQuestion color={"#3081D0"}/>
                                <Text  className="capitalize opacity-[0.5] text-[17px] mr-3">Sexe</Text>
                            </View>
                            <Text className="capitalize  text-[17px] mr-3 ">{user.gender=='male'? 'Masculin': 'Féminin'}</Text>
                        </View>
                        <View  className='border h-13 w-full flex flex-row justify-between' style={styles.input}>
                            <View className='flex flex-row gap-x-3 items-center'>
                                <Phone color={"#3081D0"}/>
                                <Text  className="capitalize opacity-[0.5] text-[17px] mr-3">Téléphone</Text>
                            </View>
                             <Text className="capitalize  text-[17px] mr-3">{user.phone}</Text>
                        </View>
                        <View  className='border h-13 w-full flex flex-row justify-between' style={styles.input}>
                            <View className='flex flex-row gap-x-3 items-center'>
                                <Droplet className="text-red-400" fill={"red"}/>
                                <Text  className="capitalize opacity-[0.5] text-[17px] mr-3">Groupe sanguin</Text>
                            </View>
                             <Text className="capitalize  text-[17px] mr-3">{user.medicalRecords.bloodType? user.medicalRecords.bloodType: '--'}</Text>
                        </View>
                        <View  className='border h-13 w-full flex flex-row justify-between' style={styles.input}>
                            <View className='flex flex-row gap-x-3 items-center'>
                                <Weight color={"#3081D0"}/>
                                <Text  className="capitalize opacity-[0.5] text-[17px] mr-3">Poids</Text>
                            </View>
                             <Text className="capitalize  text-[17px] mr-3">{user.medicalRecords.weight? user.medicalRecords.weight: '--'}</Text>
                        </View>
                        <View  className='border h-13 w-full flex flex-row justify-between' style={styles.input}>
                            <View className='flex flex-row gap-x-3 items-center'>
                                <PersonStanding />
                                <Text  className="capitalize opacity-[0.5] text-[17px] mr-3">taille</Text>
                            </View>
                             <Text className="capitalize  text-[17px] mr-3">{user.medicalRecords.height? user.medicalRecords.height: '--'}</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
    </SafeAreaProvider>
   
  )
}
const styles = StyleSheet.create({
    input: {
      paddingVertical: 14,
      paddingHorizontal: 6,
      borderRadius: 8,
      fontSize: 16,
      width: '100%',
      borderColor: '#6DB9EF',
    },
  });
export default MedicalRecords