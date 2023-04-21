import React from 'react';
import {StyleSheet, Dimensions, Pressable, Text} from 'react-native';

const SubmitButton = ({title, onPress}) => {
  return (
    <Pressable style={styles.submit} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  submit: {
    backgroundColor: '#8469cf',
    width: width - 40,
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
  },
});
export default SubmitButton;
