import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import {navigateToSignup, navigateToForgotPassword} from '../../utils/helper';
const Login = () => {
  const navigation = useNavigation();
  return (
    <FormContainer>
      <AppInput placeholder="Email" />
      <AppInput placeholder="Password" />
      <SubmitButton title="Login" />
      <FormNavigator
        leftLinkAction={navigateToSignup(navigation)}
        leftLinkText="Sign Up"
        rightLinkAction={navigateToForgotPassword(navigation)}
        rightLinkText="Forgot Password"
      />
    </FormContainer>
  );
};
export default Login;
