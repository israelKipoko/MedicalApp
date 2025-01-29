import { View, Text, ScrollView, TouchableOpacity, Image, Modal, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { User, ChevronRight, Settings, LogOut } from 'lucide-react-native';
import FlatButton from '../../components/FlatButton';
import { useGlobalContext } from '../../context/GlobalContect'
import CustomButton from '../../components/CustomButton';
import { signOut } from '../../backend/appwrite';

const Index = () => {
    const { user } = useGlobalContext();
    const navigation = useNavigation();

    const { closeBottomSheet, checkLogin } = useGlobalContext();

    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const logoutUser = () => {
        setIsLoading(true);
        signOut()
        .then(() => {
            setIsLoading(false);
            setModalVisible(false);
            closeBottomSheet();
            checkLogin();
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
       })
    }
  return (
      <SafeAreaProvider>
        <SafeAreaView className="px-1 h-full flex-1 bg-[#FEFEFE] py-2">
            <View>
                <FlatButton onPress={closeBottomSheet} buttonStyles={"absolute -top-1 z-10 p-1 right-2"} textStyles={"text-primary-200 "}>
                    Fermer
                </FlatButton>
            </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}>
                    <View className="flex-1 bg-[#23253322] justify-center items-center">
                        {isLoading && (<ActivityIndicator
                            animating={true}
                            color="#000"
                            size={'large'}
                            className="absolute z-10"
                        />)}
                        <View className="bg-[#FEFEFE] rounded-md p-4">
                            <Text className="font-bold text-[16px]">Etes-vous sûr de vouloir vous déconnecter ?</Text>
                            <View className="flex flex-row gap-x-2 mt-9 justify-evenly ">
                                <CustomButton title={"Confirmer"} handlePress={logoutUser} containerStyles={"bg-red-400  px-9"} textStyles={"text-white"}/>
                                <CustomButton title={"Annuler"} handlePress={()=> setModalVisible(false)} containerStyles={"bg-gray px-9"} textStyles={"text-black"}/>
                            </View>
                        </View>
                    </View>
            </Modal>
            <ScrollView className=' '
            contentContainerStyle={{
                height: "100%",}}>
                <View className='flex flex-col gap-y-2 mt-2 items-center'>
                    <View  className=" w-20 h-20">
                        <Image source={{ uri: user.avatar }} resizeMode='contain' className="w-full h-full rounded-full"/>
                    </View>
                    <Text className='capitalize font-bold text-[24px] text-black-200 '>{user.firstname} {user.name}</Text>
                </View>
                <View className='mt-4  h-full px-4 flex justify-between'>
                    <View className="flex flex-col gap-y-2">
                        <TouchableOpacity onPress={()=> navigation.navigate('Profile')} className="flex flex-row items-center justify-between p-4 bg-gray rounded-md">
                            <View className='flex flex-row items-center gap-x-2'>
                                <User size={25} color={"#3081D0"}/>
                                <Text className='font- text-black-100 text-[16px]'>Informations personnelles</Text>
                            </View>
                            <ChevronRight color={"#3081D0"}/>
                        </TouchableOpacity>
                        {/* <TouchableOpacity  onPress={()=> navigation.navigate('Settings')}  className="flex flex-row items-center justify-between p-4 bg-gray rounded-md">
                            <View className='flex flex-row items-center gap-x-2'>
                                <Settings size={25} color={"#3081D0"}/>
                                <Text className='font- text-black-100 text-[16px]'>Paramètres</Text>
                            </View>
                            <ChevronRight color={"#3081D0"}/>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
                <View className="px-4">
                    <TouchableOpacity  onPress={()=> setModalVisible(true)}  className="bg-red-400 flex flex-row items-center justify-between p-4 bg-g rounded-md">
                        <View className='flex flex-row items-center gap-x-2'>
                            <Text className='font-extrabold text-white text-[16px]'>Se Déconnecter</Text>
                        </View>
                        <LogOut className="text-white" />
                    </TouchableOpacity>
                </View>
                <View className="mt-4">
                    <Text className="font-bold text-center opacity-50">
                        App Logo
                    </Text>
                </View>
        </SafeAreaView>
        </SafeAreaProvider>
  )
}

export default Index