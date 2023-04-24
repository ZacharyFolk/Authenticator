import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StackActions} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {verifyEmail} from '../../utils/auth';
const inputs = Array(4).fill('');
let newInputIndex = 0;

const isObjValid = obj => {
  // converts object to array and returns values, every returns true if all values are true
  return Object.values(obj).every(val => val.trim());
};
const Verification = ({route, navigation}) => {
  // profile comes from handleSignup
  const {profile} = route.params;

  console.log('route', route);
  console.log('profile', profile);

  const inputRef = useRef();
  const [OTP, setOTP] = useState({0: '', 1: '', 2: '', 3: ''});
  const [nextInputIndex, setNextInputIndex] = useState(0);
  const handleChangeText = (text, index) => {
    const newOTP = {...OTP};
    newOTP[index] = text;
    setOTP(newOTP);

    const lastInputIndex = inputs.length - 1;

    if (!text) {
      // if delete then move move back an input
      newInputIndex = index === 0 ? 0 : index - 1;
    } else {
      newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    }
    setNextInputIndex(newInputIndex);
  };

  const submitOTP = async () => {
    Keyboard.dismiss();

    if (isObjValid(OTP)) {
      let val = '';
      Object.values(OTP).forEach(v => (val += v));

      console.log('val', val);
      console.log('profile.id', profile.id);

      const res = await verifyEmail(val, profile.id);
      if (!res.success) {
        return console.log(res.error);
      }
      navigation.dispatch(
        StackActions.replace('Home', {profile: res.user}), // user object from API
      );
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, [nextInputIndex]);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.heading}>
        Please verify your account. A PIN has been sent to your email.
      </Text>
      <View style={styles.otpContainer}>
        {inputs.map((inp, index) => {
          return (
            <View style={styles.inputContainer} key={index.toString()}>
              <TextInput
                value={OTP[index]}
                onChangeText={text => handleChangeText(text, index)}
                placeholder="0"
                keyboardType="numeric"
                maxLength={1}
                style={styles.input}
                ref={nextInputIndex === index ? inputRef : null}
              />
            </View>
          );
        })}
      </View>
      <TouchableOpacity onPress={submitOTP} style={styles.submitIcon}>
        <Icon name="checkmark-outline" color="#fff" size={24} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const {width} = Dimensions.get('window');
const inputWidth = Math.round(width / 6);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    color: '#8469cf',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: inputWidth,
    height: inputWidth,
    borderWidth: 2,
    borderColor: '#8469cf',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 25,
    paddingHorizontal: 20, // make all of it touchable
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: inputWidth / 2,
  },
  submitIcon: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#8469cf',
    borderRadius: 50,
    marginTop: 20,
  },
});

export default Verification;
