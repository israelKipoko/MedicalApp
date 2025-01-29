import React from 'react'
import { Animated, View, TouchableOpacity, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FirstPage from './firstPage';
import SecondPage from './secondPage';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

const MedicalRecordsTabs = () => {
    function MyTabBar({ state, descriptors, navigation, position }) {
        const { colors } = useTheme();
        const { buildHref } = useLinkBuilder();
      
        return (
          <View style={{ flexDirection: 'row' }} className="p-2 bg-[#F7F7F8] flex flex-row justify-center gap-x-4">
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                    ? options.title
                    : route.name;
      
              const isFocused = state.index === index;
      
              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
      
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              };
      
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
      
              const inputRange = state.routes.map((_, i) => i);
              const opacity = position.interpolate({
                inputRange,
                outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
              });
      
              return (
                <TouchableOpacity
                 key={index}
                  href={buildHref(route.name, route.params)}
                  accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarButtonTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  className={` p-2 rounded-full ${isFocused ? 'bg-[#6DB9EF]' : 'bg-gray'} `}
                >
                  
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }
      
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="FirstPage" component={FirstPage} options={{
            headerShown: true,
            title: 'Page 1',}}/>
        <Tab.Screen name="SecondPage" component={SecondPage} options={{
            headerShown: true,
            title: 'Page 2',}}/>
    </Tab.Navigator>
  )
}

export default MedicalRecordsTabs