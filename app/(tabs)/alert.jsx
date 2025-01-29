import { StyleSheet, Text, View, Image, Animated, Vibration, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState }from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ArrowBigDown, LucidePhone } from 'lucide-react-native'
import { useGlobalContext } from '../../context/GlobalContect';
import CustomButton from '../../components/CustomButton';
import { getActiveHelpers } from '../../backend/appwrite';
import { client, config } from '../../backend/appwrite';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Alert = () => {

  client.subscribe(`databases.${config.databaseId}.collections.${config.helpersCollectionId}.documents`, response => {
      fetchHelpers();
});

  const {user, alertFunction} = useGlobalContext();
  const lottiAnimation = useRef(null);
  const [isVibrating, setIsVibrating] = useState(false);
  const [helpers, setHelpers] = useState([]); 
  const [helperId, setHelperId] = useState(); 
  const [isFetching, setIsFetching] = useState(false); 
  const intervalRef = useRef(null); 
  const animations = useRef([]); // Store animations
  const randomPositions = useRef([]);
  const loadingRotation = useRef(new Animated.Value(0)).current;

  const bounceValue = useRef(new Animated.Value(0)).current;
 
  const circleRadius = 150; 

  const getRandomPositions = (count) => {
    return Array.from({ length: count }, () => {
      let r = Math.random() * circleRadius; // Random radius within the circle
      let theta = Math.random() * 2 * Math.PI; // Random angle
      return {
        x: r * Math.cos(theta),
        y: r * Math.sin(theta),
      };
    });
  };

  const startVibration = () => {
    setIsVibrating(true);
    Vibration.vibrate([500, 500, 500]); // Vibrate in 500ms intervals

    // Stop vibration after 3 seconds
    setTimeout(() => {
      Vibration.cancel();
      setIsVibrating(false);
    }, 3000);
  };

  const fetchHelpers = async () => {
    try {
      const response = await getActiveHelpers();
      if(response){
        setHelpers(response);
        randomPositions.current = getRandomPositions(response.length); // Generate random positions for 5 images
        animations.current = response.map(() => new Animated.Value(0));// Initialize animation values
        startAnimations();
        startLoadingAnimation();
      }
    } catch (error) {
      console.error('Error fetching helpers:', error);
    }
  }

  // const startFetching = () => {
  //   if (intervalRef.current) return; // Prevent multiple intervals
  //   setIsFetching(true);
  //   intervalRef.current = setInterval(() => {
  //     fetchHelpers();
  //   }, 60000); // 1 minute
  //   fetchHelpers(); // Fetch immediately on start
  // };

  // const stopFetching = () => {
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //     intervalRef.current = null;
  //     setIsFetching(false);
  //   }
  // };

  const startAnimations = () => {
    startLoadingAnimation();
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -10, // Move up by 10 pixels
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0, // Move back to the original position
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    animations.current.forEach((animatedValue, index) => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        delay: index * 500, // Delay for sequential animation
        useNativeDriver: true,
      }).start();
    });
  };

    // Start loading animation
    const startLoadingAnimation = () => {
      loadingRotation.current = Animated.loop(
        Animated.timing(loadingRotation, {
          toValue: 3,
          duration: 2000, // 2 seconds for a full rotation
          useNativeDriver: true,
        })
      );
      loadingRotation.current.start();
    };

    const spin = loadingRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'], // Full rotation
    });

  useEffect(() => {
    fetchHelpers();
      startLoadingAnimation();
    return () => { 
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [bounceValue,animations]);
  return (
    <SafeAreaProvider>
      <SafeAreaView className="px-1 h-full relative flex-1 items-center bg-[#F7F7F8]" edges={['top']}>
          <Text className="font-bold text-[20px] text-black-100 mt-9">Lanceur D'alerte!</Text>
          <View className="w-full h-[80%] items-center justify-start py-24 px-4">
            <View className=" w-full flex flex-col  justify-center items-center   ">
              <View className="mb-6">
              {user.isAlerting?
                <Animated.View
                  style={[
                    styles.loadingCircle,
                    {
                      transform: [{ rotate: spin }],
                    },
                  ]}
                />:""}
                <View  style={styles.circle} className=' w-full'>
                  {helpers.map((helper, index) => {
                    const position = randomPositions.current[index];
                    if (!position) return null; // Safeguard for missing positions

                    const { x, y } = position;

                      return (
                        <TouchableOpacity onPress={() => setHelperId(helper.id)} key={index}>
                            <Animated.Image
                            key={helper.id}
                            source={{ uri: helper.avatar }}
                            style={[
                              styles.image,
                              {
                                transform: [
                                  { translateX: x },
                                  { translateY: y },
                                  { scale: animations.current[index] || 1 }, // Scale effect
                                ],
                              },
                            ]}
                          />
                        </TouchableOpacity>
                      );
                    })} 
                </View> 
              </View>
              {/* /* Display the helper information */ }

              {helperId && 
              <View className="bg-primary rounded-md w-full relative">
                  <TouchableOpacity  onPress={()=> setHelperId()} className="absolute -left-2 -top-1 z-10  w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Text className="font-bold text-center ">X</Text>
                  </TouchableOpacity>
                <View className="w-full p-3 flex flex-row gap-x-4 w-full ">
                  <View className='rounded-full w-24 h-24 rounded-full bg-white'>
                      <Image source={{ url: helpers.find((helper)=> helper.id === helperId)?.avatar}} alt='image' className="w-full h-full object-fit-contain  rounded-full"/>
                  </View>
                  <View className="flex flex-col gap-y-2">
                    <View className='mb-3'>
                      <Text className="text-white font-extrabold text-[16px] capitalize">{helpers.find((helper)=> helper.id === helperId)?.name} {helpers.find((helper)=> helper.id === helperId)?.firstname}</Text>
                      <Text className=" text-white text-[16px] capitalize">Medecin specialiste</Text>
                    </View>
                    <TouchableOpacity className='flex flex-col text-[14px] flex items-center'>
                      <Text className=" text-white text-[16px] capitalize underline">{helpers.find((helper)=> helper.id === helperId)?.address[0]}, Av:{helpers.find((helper)=> helper.id === helperId)?.address[1]}, Q/{helpers.find((helper)=> helper.id === helperId)?.address[2]}</Text>
                      <Text className=" text-white text-[16px] capitalize underline">{helpers.find((helper)=> helper.id === helperId)?.address[3]}/{helpers.find((helper)=> helper.id === helperId)?.address[4]}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => makeCall(helpers.find((helper)=> helper.id === helperId)?.phone)}  className=" absolute -right-1 top-3 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <LucidePhone color={"#6DB9EF"} fill={"#6DB9EF"}/>
                  </TouchableOpacity>
                </View>
              </View>
              }
              {user.isAlerting && 
                <View className="w-full bg-primary-100 h-52 p-2 rounded-md">
                  <View>
                    <View className=" w-12 h-12 mx-auto">
                      <Image source={{ url: user?.avatar }} resizeMode='contain' className=" bg-white w-full h-full rounded-full" alt='avatar'/>
                    </View>
                    <Text className="font-extrabold text-white text-[16px] text-center my-1">{user?.firstname} {user?.name} {user?.surname}</Text>
                  </View>
                    <View className="flex flex-row justify-between w-full mt-2">
                      <View className="gap-y-6 flex flex-col items-center">
                          <View className="">
                              <View className="flex flex-row gap-x-1"> 
                                <Text className="font-extrabold  text-white text-[15px]">Sexe : </Text> 
                                <Text className="capitalize  text-white text-white text-[15px] font-bold">{user?.gender === "male"? "Masculin":"Feminin"}</Text>
                              </View>
                          </View>
                          <View className=" text-[#1E1E2D99]">
                              <View className="flex flex-row gap-x-1"> 
                                <Text className="font-extrabold text-white text-[15px]">Né le: </Text> 
                                <Text className="capitalize  text-white text-white text-[15px] font-bold">{format(user?.birthdate, 'dd MMMM yyyy', { locale: fr })}</Text>
                              </View>
                          </View>
                          <View className=" text-[#1E1E2D99]">
                              <View className="flex flex-row gap-x-1"> 
                                <Text className="font-extrabold text-white text-[15px]">Contact : </Text> 
                                <Text className="capitalize text-white text-white text-[15px] font-bold">{user?.phone}</Text>
                              </View>
                          </View>
                      </View>

                      <View className="gap-y-6 flex flex-col items-center">
                          <View className=" text-[#1E1E2D99]">
                              <View className="flex flex-row gap-x-1"> 
                                <Text className="font-extrabold text-white text-[15px]">Groupe sanguin : </Text> 
                                <Text className="capitalize text-white text-white text-[15px] font-bold">{user?.medicalRecords?.bloodType}</Text>
                              </View>
                          </View>
                          <View className="text-[#1E1E2D99]">
                              <View className="flex flex-row gap-x-1"> 
                                <Text className="font-extrabold text-white text-[15px]">Poids : </Text> 
                                <Text className="capitalize text-white text-white text-[15px] font-bold">{!user?.weight ? "--": user?.weight+" kg"}</Text>
                              </View>
                          </View>
                          <View className=" text-[#1E1E2D99]">
                              <View className="flex flex-row gap-x-1"> 
                                <Text className="font-extrabold text-white text-[15px]">Taille: </Text> 
                                <Text className="capitalize text-white text-white text-[15px] font-bold">{!user?.weight ? "--": user?.weight+" m"}</Text>
                              </View>
                          </View>
                      </View>
                    </View>
                </View>
              }
            </View>

          </View>
         
          {user.isAlerting &&
             <Text className='text-center font-bold opacity-[0.8] text-[#1E1E2D] mb-4 px-2'>Votre fiche sera partagé au médecin qui acceptera de vous aider.</Text>
          }
          {!user.isAlerting &&
          <View className='absolute bottom-12 w-full flex items-center '>
             <Text className='text-center font-bold opacity-[0.8] text-[#1E1E2D] mb-4'>Appuyez longuement sur ce button pour toute suite recevoir de l'aide!</Text>
              <Animated.View style={{ transform: [{ translateY: bounceValue }] }}>
                <ArrowBigDown size={30} fill={'#000'} color={'#000'} />
              </Animated.View>
          </View>
          }
      </SafeAreaView>
  </SafeAreaProvider>
  )
}


const styles = StyleSheet.create({
  centered: {
      position: 'absolute',
    },
    gif: {
      width: 200,
      height: 200,
    },
    circle: {
      width: 300,
      height: 300,
      borderRadius: 175,
      borderWidth: 9,
      borderColor: '#CDCDE044',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    image: {
      position: 'absolute',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    loadingCircle: {
      position: 'absolute',
      width: 300,
      height: 300,
      borderRadius: 175,
      borderWidth: 9,
      zIndex: 10,
      borderColor: '#CDCDE044', // Light blue color
      borderTopColor: '#6DB9EF77', // Darker blue for the rotating part
    },
});
export default Alert