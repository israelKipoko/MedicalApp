import { View, Text, TextInput, StyleSheet } from 'react-native';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  onFocusHandler,
  value,
  isInvalid,
  ErrorText,
  placeholder,
  pressIn
}) {
  return (
    <View style={styles.inputContainer} className='w-[300px] w-full'> 
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label} :
      </Text>
      <TextInput
        className='border h-14 w-full '
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
        onFocus={onFocusHandler}
        onPressIn={pressIn}
      />
      {isInvalid && (
       <Text className="pl-1 mt-1 text-red-600">{ErrorText}</Text>
      )}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  labelInvalid: {
    color: 'red',
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderRadius: 8,
    fontSize: 16,
    width: '100%',
    borderColor: '#6DB9EF',
  },
  inputInvalid: {
    borderColor: "red",
  },
});