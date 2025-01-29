import { Pressable, StyleSheet, Text, View } from 'react-native';


function FlatButton({ children, onPress, buttonStyles, textStyles, Icon }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      className={` ${buttonStyles}`} 
    >
      {Icon && <Icon color={"#3081D0"} />}
      <View>
        <Text className={` ${textStyles}`} >{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});