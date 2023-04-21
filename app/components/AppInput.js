import React from 'react';
import {useFormikContext} from 'formik';
import {StyleSheet, Dimensions, TextInput, Text} from 'react-native';

const AppInput = ({name, placeholder, ...rest}) => {
  const {errors, values, touched, handleBlur, handleChange} =
    useFormikContext();
  const value = values[name];
  const error = errors[name];
  const isInputTouched = touched[name];

  return (
    <>
      {error && isInputTouched ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        style={styles.input}
        {...rest}
      />
    </>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  input: {
    width: width - 40,
    backgroundColor: '#eae9e7',
    height: 50,
    fontSize: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: '#8469cf',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default AppInput;
