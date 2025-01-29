import { StyleSheet, Text, View, TouchableOpacity, FlatList, TouchableWithoutFeedback, TextInput, Image, PermissionsAndroid,Platform,ActivityIndicator, Animated, Easing} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Geojson, Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { UserIcon, LucidePhone, SearchIcon} from 'lucide-react-native';
import { enableExperimentalWebImplementation, GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import GetLocation from 'react-native-get-location';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import { client, databases, config } from '../../backend/appwrite';
import { Query } from 'react-native-appwrite';

export default function SearchComponent() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedEl, setSelectedEl] = useState(null);
  const [followUserLocation, setFollowUserLocation] = useState(true);
  const [markerPosition, setMarkerposition] = useState(null);
  const [region, setRegion] = useState(null);
  const mapRef = useRef();

  const [visibleView, setVisibleView] = useState(1); // Tracks which view is visible
  const fadeAnim1 = useRef(new Animated.Value(1)).current; // Opacity for View 1
  const fadeAnim2 = useRef(new Animated.Value(0)).current; // Opacity for View 2
  const translateY1 = useRef(new Animated.Value(0)).current; // Translation for View 1
  const translateY2 = useRef(new Animated.Value(-50)).current; // Translation for View 2

  const handleTransition = () => {
    if (visibleView === 1) {
      // Fade out View 1 and fade in View 2
      Animated.parallel([
        Animated.timing(fadeAnim1, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY1, {
          toValue: -50, // Move out to the top
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY2, {
          toValue: 0, // Move in from the top
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => setVisibleView(2));
    } else {
      // Fade out View 2 and fade in View 1
      Animated.parallel([
        Animated.timing(fadeAnim2, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY2, {
          toValue: -50,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim1, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY1, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => setVisibleView(1));
    }
  };
  

  const handleSearchFocus = () => {
    setIsSearching(false);
  }

  const makeCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to make a call on this device.');
        }
      })
      .catch((err) => console.error('Error opening URL:', err));
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (!query.trim()) {
      setResults([]); // Clear results if query is empty
      return;
    }

    setLoading(true);
    try {
      const response = await databases.listDocuments(config.databaseId, config.helpersCollectionId, [
        Query.or([
          Query.search('name', query),       // Search in 'name' field
          Query.search('firstname', query)  // Search in 'firstname' field
        ]),
      ]);
      setResults(response.documents);
    } catch (error) {
      console.error('Error searching in Appwrite:', error);
      setResults([]);
      setIsSearching(false);
    } finally {
      setLoading(false);
    }
  };

  const selectedElement = (elID)  => {
    const el = results.find((item) => item.$id === elID);
    setSelectedEl(el);
    setIsSearching(false);
    handleTransition();
  }
  const resetSearch = ()  => {
    setSelectedEl(null);
    handleTransition();
    setIsSearching(false);
    setLoading(false)
  }
  const setMarker = () => {
    var region = {
      latitude: selectedEl.coords[0],
      longitude: selectedEl.coords[1],
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00721,
      name: selectedEl.name
    };

    setMarkerposition(region);
    setFollowUserLocation(false);
    changeRegion(region);
  }
  const onRegionChange = () => {
     
  }
  const changeRegion =  (region) => {
      setRegion(region)
  }
  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLocationPermission(false)
        return;
      }else{
        setLocationPermission(true);
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

       var region = {
       latitude: location.coords.latitude,
         longitude: location.coords.longitude,
         latitudeDelta: 0.00922,
         longitudeDelta: 0.00721,
       }
      changeRegion(region);
    }
 
    getCurrentLocation()
    .then((res) => {

    }).catch((error)  => {
      console.log(error)
    });
  }, []);
  const myLocation = location
  ? {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            title: "Ma localisation",
          },
          geometry: {
            type: 'Point',
            coordinates: [location.coords.latitude, location.coords.longitude],
          },
        },
      ],
    }
  : null; // Handle the case when location is not available yet.

  const bottomSheetRef = useRef(null);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const snapPoints = useMemo(() => ['30%'], []);
  return (
    <TouchableWithoutFeedback onPress={handleSearchFocus}>
    <GestureHandlerRootView  style={styles.container}  className="px-4 relative flex items-center justify-center">
    <MapView style={StyleSheet.absoluteFill}   
          // initialRegion={INITIAL_REGION}
          // onRegionChange={onRegionChange}
          region={region}
          followsUserLocation={followUserLocation}
          showsUserLocation={true}
          showsMyLocationButton={true}
          ref={mapRef}>
        { (location)?
            <Geojson
            geojson={myLocation}
            strokeColor="red"
            fillColor="green"
            strokeWidth={2}
          />
      :""}

      {markerPosition &&
       <Marker coordinate={markerPosition}>
        <Image source={{url: selectedEl.avatar}} className="w-9  h-9 rounded-full bg-white object-fit-contain"/>
        </Marker>}
    </MapView>
    <View className={`h-fit rounded-b-[40px] absolute top-0 right-0 left-0 text-black flex flex-col px-4 justify-between items-center`}>
      <Animated.View style={[
         styles.boxShasow,
          {
            opacity: fadeAnim1,
            transform: [{ translateY: translateY1 }],
          },
        ]} className='w-full  mt-16 h-fit relative'>
        <SearchIcon  className="z-10 absolute top-3 left-2 -translate-y-1/2"/>
        <TextInput
               className={`border h-13 w-full bg-white pl-9`}
               style={[styles.input]}
               autoComplete='off'
               value={searchQuery}
               onFocus={handleSearchFocus}
               onChangeText={(text) => handleSearch(text)}
               placeholder={"Rechercher un hopital ou un docteur..."}
             />
      </Animated.View>
      {selectedEl && (
        <Animated.View
        style={[
          styles.boxShasow,
          {
            opacity: fadeAnim2,
            transform: [{ translateY: translateY2 }],
            pointerEvents: visibleView === 2 ? 'auto' : 'none', // Disable interactions when invisible
          },
        ]}
        className="w-full bg-primary  -mt-9 rounded-md relative"
      >
        <TouchableOpacity  onPress={resetSearch} className="absolute -left-2 -top-1 z-10  w-6 h-6 bg-white rounded-full flex items-center justify-center">
           <Text className="font-bold text-center ">X</Text>
        </TouchableOpacity>
        <View className="w-full p-3 flex flex-row gap-x-4">
            <View className='rounded-full w-24 h-24 rounded-full bg-white'>
                <Image source={{ url: selectedEl.avatar}} alt='image' className="w-full h-full object-fit-contain  rounded-full"/>
            </View>
            <View className="flex flex-col gap-y-2">
              <View className='mb-3'>
                <Text className="text-white font-extrabold text-[16px] capitalize">{selectedEl.name} {selectedEl.firstname}</Text>
                <Text className=" text-white text-[16px] capitalize">Medecin specialiste</Text>
              </View>
              <TouchableOpacity onPress={setMarker} className='flex flex-col text-[14px] flex items-center'>
                <Text className=" text-white text-[16px] capitalize underline">{selectedEl.address[0]}, Av:{selectedEl.address[1]}, Q/{selectedEl.address[2]}</Text>
                <Text className=" text-white text-[16px] capitalize underline">{selectedEl.address[3]}/{selectedEl.address[4]}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => makeCall(selectedEl.phone)}  className=" absolute -right-1 top-3 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <LucidePhone color={"#6DB9EF"} fill={"#6DB9EF"}/>
            </TouchableOpacity>
        </View>
      </Animated.View>
      )}
   
       {isSearching ?(
       loading ? (
          <View  style={styles.listItem} className=' border rounded-b-md border-[#6DB9EF] bg-white w-full mt-0.5'>
            <Text style={styles.loading}>Recherche...</Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.$id}
            className=" w-full h-fit max-h-62 border rounded-b-md border-[#6DB9EF] bg-white mt-0.5"
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() =>selectedElement(item.$id)} style={styles.listItem} className="border-b border-[#CDCDE0] flex flex-row justify-between items-center">
                  <Text  className='text-black-100 '>{item.name} {item.firstname}</Text>
                  <UserIcon fill={"#3081D0"}/>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              searchQuery.length > 0 && !loading ? (
              <View  style={styles.listItem} className=' border rounded-b-md border-[#6DB9EF] bg-white w-full mt-0.5'>
                 <Text style={styles.noResults}>Aucun résultat trouvé</Text>
              </View>
              ) : null
            }
          />
      )):""}
    </View>
      {/* <BottomSheet
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
        </BottomSheetView> */} 
      {/* </BottomSheet> */}
  </GestureHandlerRootView>
     </TouchableWithoutFeedback>
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
  input: {
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#6DB9EF',
  },
  boxShasow: {
    shadowColor: 'rgba(0, 0, 0, 0.3)', // iOS shadow color
    shadowOffset: { width: 0, height: 6 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 38, // iOS shadow radius
    elevation: 9, // Android shadow
  },
    listItem: {
    padding: 12,
    fontSize: 16,
  },
});