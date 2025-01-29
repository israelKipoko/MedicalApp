import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

function Input({
  label,
  inputStyle,
  keyboardType,
  secure,
  onUpdateValue,
  onFocusHandler,
  value,
  isInvalid,
  ErrorText,
  placeholder,
  pressIn,
  readOnly
}) {
  return (
    <View style={styles.inputContainer} className='w-[300px] w-full '> 
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label} :
      </Text>
      <TextInput
        className={`border h-13 w-full  bg-white ${inputStyle}`}
        style={[styles.input, isInvalid && styles.inputInvalid]}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        autoComplete='off'
        readOnly={readOnly}
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
    borderColor: '#6DB9EF',
  },
  inputInvalid: {
    borderColor: "red",
  },
});