import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';

const FormContainer = ({children}) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.logo} source={require('../assets/cardback.jpg')} />
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 20,
    marginTop: 30,
    alignSelf: 'center',
  },
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
  btnContainer: {
    backgroundColor: '#8469cf',
    width: width - 40,
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: 20,
    color: '#fff',
  },
  textLink: {
    fontSize: 16,
    color: '#8469cf',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FormContainer;
