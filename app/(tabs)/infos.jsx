import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity,Modal } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import React, {useState} from 'react'
import { FileUser, Stethoscope, ChevronRight, Bell } from 'lucide-react-native'
import { ProgressChart, ContributionGraph } from 'react-native-chart-kit'
import { useGlobalContext } from '../../context/GlobalContect'
import { useNavigation } from '@react-navigation/native'
import { Droplet, Weight, PersonStanding } from 'lucide-react-native'

const Infos = () => {
    const navigation = useNavigation();
    const medicalRecordFillingProgress = {
        data: [0.4]
      };
      const chartConfig = {
        backgroundGradientFrom: "#CDCDE044",
        backgroundGradientFromOpacity: 0,
         backgroundGradientTo: "#CDCDE044",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 100,
        useShadowColorFromDataset: false // optional
      };
     const { openBottomSheet } = useGlobalContext();
     const { user } = useGlobalContext();
     const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaProvider>
        <SafeAreaView className="px-1 h-full flex-1  bg-[#F7F7F8]" edges={['top']}>
            <ScrollView className=" " contentInsetAdjustmentBehavior="automatic" >
                <View className=" relative w-full my-auto flex flex-col gap-y-6 items-center mt-4  py-3 px-4">
                    {/* <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)} className="absolute top-0.5 right-6 w-fit h-fit">
                        <Bell />
                    </TouchableOpacity> */}
                    <View className=' w-full flex flex-row justify-center items-center my-4'>
                        <TouchableOpacity  onPress={openBottomSheet} activeOpacity={1} className=" w-24 h-24 z-10">
                            <Image source={{ url: user?.avatar }} resizeMode='contain' className="w-full h-full rounded-full" alt='avatar'/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("MedicalRecords")} style={styles.boxShasow} className=" w-full bg-primary h-32 mt-9 p-2  rounded-md">
                        <View className='flex flex-col justify-between  h-full'>
                            <View className='flex flex-row gap-x-1'>
                                <FileUser color={'#fff'} size={18}/>
                                <Text className='font-extrabold text-white text-[14px] '>Fiche Médicale</Text>
                            </View>
                            <View className='flex flex-row gap-x-9 justify-center mr-16 mb-2'>
                                <View className='flex items-center gap-y-2'>
                                    <Weight color={'#fff'} fill={'#fff'} />
                                    <Text  className='font-bold text-[#1E1E2D99]'>{user?.medicalRecords.weight? user.medicalRecords.weight: '--'}</Text>
                                </View>
                                <View className='flex items-center gap-y-2'>
                                    <PersonStanding color={'#fff'}fill={'#fff'} />
                                    <Text  className='font-bold text-[#1E1E2D99]'>{user?.medicalRecords.height? user.medicalRecords.height: '--'}</Text>
                                </View>
                                <View className='flex items-center justify-center gap-y-2'>
                                    <Droplet color={'red'} fill={'red'} size={30}/>
                                    <Text className='font-bold text-[#1E1E2D99]'>{user?.medicalRecords.bloodType? user.medicalRecords.bloodType: '--'}</Text>
                                </View>
                            </View>
                           
                        </View>
                        <View className="right-2 h-full " style={styles.centered}>
                            <View className='w-full h-full relative'>
                                <ProgressChart
                                    data={medicalRecordFillingProgress}
                                    width={100}
                                    height={110}
                                    strokeWidth={10}
                                    radius={35}
                                    chartConfig={chartConfig}
                                    hideLegend={true}
                                    />
                            </View>
                                <View className='absolute w-full h-full flex items-center justify-center'>
                                   <Text className='font-extrabold text-white'>40%</Text> 
                                </View>
                        </View>
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                         animationIn="slideInRight"
        animationOut="slideOutRight"
                        className=""
                         >
                         <View className="border flex flex-1 items-center justify-center">
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
                        </Modal>
                </View>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
   

  )
}

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      zIndex: 100,
    },
    centered: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -50 }], // Translates the element upward by 50% of its height
      },
      boxShasow: {
        shadowColor: 'rgba(0, 0, 0, 0.3)', // iOS shadow color
        shadowOffset: { width: 24, height: 19 }, // iOS shadow offset
        shadowOpacity: 0.7, // iOS shadow opacity
        shadowRadius: 38, // iOS shadow radius
        elevation: 5, // Android shadow
      },
  });
export default Infos