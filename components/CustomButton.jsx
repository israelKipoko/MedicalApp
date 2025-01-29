import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, Image, View } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  imageStyles,
  textStyles,
  isLoading,
  isDisabled,
  image,
  icon: Icon, color, size,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={` rounded-md min-h-[54px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading  || isDisabled ? "opacity-50" : ""
      }`}
      disabled={isLoading || isDisabled}
    >
      {isLoading? (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      ):
        <View className="flex flex-row gap-x-2 items-center justify-center">
          {image &&<Image source={image}  resizeMode="contain" className={` ${imageStyles}`}/>}
            {Icon && <Icon color={color} size={size} />}
            <Text className={`text-[#fff] font-bold text-lg ${textStyles}`}>
              {title}
            </Text>
          </View>
        }
    </TouchableOpacity>
  );
};

export default CustomButton;
