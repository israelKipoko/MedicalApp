
import { ActivityIndicator, Text, TouchableOpacity, Image, View } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  iconStyles,
  textStyles,
  isLoading,
  icon
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={` rounded-xl min-h-[52px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <View className="flex flex-row gap-x-2 items-center">
        <Image source={icon}  resizeMode="contain" className={` ${iconStyles}`}/>

        <Text className={`text-[#fff] font-bold text-lg ${textStyles}`}>
          {title}
        </Text>
      </View>
      
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
