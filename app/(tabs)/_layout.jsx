import { View, Text, Image, TouchableOpacity, StyleSheet, Vibration  } from 'react-native'
import React, {useState} from 'react'
import { IdCard, Search, Hand, UserCheck } from 'lucide-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Infos from './infos';
import SearchComponent from './search';
import Alert from './alert';
import * as Haptics from 'expo-haptics';
import { useGlobalContext } from '../../context/GlobalContect';
const Tab = createBottomTabNavigator();
const icons = {
    Info: IdCard,
    Recherche: Search,
  };

const CustomTabBarButton = ({ children, onPress, onLongPress, isDisbaled }) => {
    return (
        <TouchableOpacity
          style={{
            top: -35,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1} 
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: '100%',
              display: 'flex',
              justifyContent: 'center',
                alignItems: 'center',
              backgroundColor: '#3081D0'
            }}
          >
            {children}
          </View>
        </TouchableOpacity>
      );
  };

  function TabBar({ state, descriptors, navigation }) {
  const {alertFunction, user} = useGlobalContext();
    return (
      <View style={styles.tabBar} className="bg-[#CDCDE044]">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
          const IconComponent = icons[label]; 

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = async () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
            // const [isVibrating, setIsVibrating] = useState(false);
            // Haptics.notificationAsync(
            //   Haptics.NotificationFeedbackType.Success
            // )
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success
            )
            await alertFunction();
            if(user.isAlerting)
              navigation.navigate('Alert')
            // const startVibration = () => {
              // setIsVibrating(true);
            // };
          };
  
          return (
            <TouchableOpacity
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              // onLongPress={() => console.log('Long pressed')}
              style={{ flex: 1, alignItems: 'center' }}
              key={index}
              activeOpacity={1} 
            >
              {label === 'Alert' ? (
                <CustomTabBarButton onPress={onPress} onLongPress={onLongPress}>
                 {!user?.isAlerting?<Hand
                    size={30}
                    color={'#F5F7F8'}/>:<Text className='text-white font-bold text-[18px]'>Stop</Text>}
                </CustomTabBarButton>
              ) : (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                     <IconComponent
                    size={30}
                    color={isFocused ? '#3081D0' : '#748c9499'}/>
                    <Text  style={{ color: isFocused ? '#3081D0' : '#748c9499' }} className="capitalize text-[14px]">{label}</Text>
                </View>
               
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
const TabsLayout = () => {
  return (
       <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="Info" component={Infos} options={{
          headerShown: false,
          headerLargeTitle: true,
          title: 'Info',
        }}/>
         <Tab.Screen name="Alert" component={Alert}   options={{
          headerShown: false,
        }}/>
        <Tab.Screen name="Recherche" component={SearchComponent} options={{
          headerShown: false,
        }} />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      height: 70,
      backgroundColor: "white",
      borderTopWidth: 0,
      elevation: 5,
    },
    shadow: {
      shadowColor: '#7F5DF0',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  });

export default TabsLayout