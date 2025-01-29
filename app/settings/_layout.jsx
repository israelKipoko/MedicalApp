import React, {useMemo} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import Index from './index';
import Profile from './profile';
import Settings from './settings';
const BottomSheetStack  = createStackNavigator();

const SettingsLayout = ({user}) => {
  const screenOptions = useMemo(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerMode: 'screen',
      headerShown: false,
      safeAreaInsets: { top: 0 },
      cardStyle: {
        backgroundColor: 'white',
        overflow: 'visible',
      },
    }),
    []
  );

  const screenAOptions = useMemo(() => ({ headerLeft: () => null }), []);
  return (
        <NavigationContainer  independent={true}>
          <BottomSheetStack.Navigator  initialRouteName="Index" screenOptions={screenOptions}>
            <BottomSheetStack.Screen name="Index" component={Index}  initialParams={{user: user}} options={screenAOptions} />
            <BottomSheetStack.Screen name="Profile" component={Profile} initialParams={{user: user}} options={screenAOptions} />
            <BottomSheetStack.Screen name="Settings" component={Settings}   options={screenAOptions} />
          </BottomSheetStack.Navigator>
        </NavigationContainer> 
  )
}

export default SettingsLayout