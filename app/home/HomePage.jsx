import { StyleSheet, Text, View,ScrollView, Image,PermissionsAndroid,Platform,ActivityIndicator,Alert } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { Menu,Camera,User} from 'lucide-react-native';
import { enableExperimentalWebImplementation, GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import GetLocation from 'react-native-get-location';

const INITIAL_REGION = {
  latitude: -4.3098,
  longitude: 15.2922,
  latitudeDelta: 2,
  longitudeDelta: 2,
};


export default function HomePage() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState(false);

  const defaultLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 6000,
      // position => {
      //   setLocation({
      //     latitude: position.coords.latitude,
      //     longitude: position.coords.longitude,
      //     latitudeDelta: 0.01,
      //     longitudeDelta: 0.01,
      //   });
      //   setLoading(false);
      //   console.log("jjj")
      // },
      // error => {
      //   Alert.alert(
      //     'Error',
      //     `Failed to get your location: ${error.message}` +
      //       ' Make sure your location is enabled.',
      //   );
      //   setLocation(defaultLocation);
      //   setLoading(false);
      //   console.log("no")
      // }
    }).then(location => {
      console.log("My location is ", location);
    }).catch(error => {
      const { code, message } = error;
      console.warn(code, message);
    });
  };
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setLocationPermission(true);
            getCurrentLocation();
          } else {
            Alert.alert(
              'Permission Denied',
              'Location permission is required to show your current location on the map.',
            );
            setLocation(defaultLocation);
            setLoading(false);
          }
        } catch (err) {
          console.warn(err);
          setLocation(defaultLocation);
          setLoading(false);
        }
      } else if(Platform.OS === 'ios') { 
        getCurrentLocation();
      }
    };

    requestLocationPermission();
  }, []);
  const bottomSheetRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const snapPoints = useMemo(() => ['30%'], []);
  return (
    <GestureHandlerRootView  style={styles.container}  className="px-4 relative flex items-center justify-center">
    <MapView style={StyleSheet.absoluteFill} initialRegion={INITIAL_REGION} 
    showsUserLocation={true}
    showsMyLocationButton={true}/>
    <View className="absolute top-16 right-0 left-0 text-black flex flex-row  justify-between items-center">
        {/* <Image source={""}  resizeMode="contain" alt='LOGO' /> */}
        <Text className='font-bold pl-4 text-[24px]'>LOGO</Text>
        <CustomButton  containerStyles="" icon={Menu} color="black" size={34} />
    </View>
      <BottomSheet
        index={1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
       >
        <BottomSheetView  style={styles.contentContainer} >
          <View className="flex flex-col items-center w-full "> 
            <View className="flex flex-col justify-center gap-y-2 mb-4 items-center">
              <View>
                <Image source={""}  resizeMode="contain" alt='LOGO' /> 
                  <View className=' bg-gray-200 rounded-full w-[70px] h-[70px] flex flex-row justify-center items-center'>
                    <User size={36}/>
                  </View>
              </View>
              <View>
                <Text>Surname Name</Text>
              </View>
            </View>
              <CustomButton  containerStyles=" w-full  bg-red-600" textStyles="text-[22px] font-bold " title={'Alerte'}/>
          </View>
        </BottomSheetView>
      </BottomSheet>
  </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
    position: 'relative',
  },
});