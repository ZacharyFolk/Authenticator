import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import {navigateToLogin, navigateToForgotPassword} from '../../utils/helper';

const Signup = () => {
  const navigation = useNavigation();
  return (
    <FormContainer>
      <AppInput placeholder="Username" />
      <AppInput placeholder="Email" />
      <AppInput placeholder="Password" />
      <SubmitButton title="Sign up" />
      <FormNavigator
        leftLinkAction={navigateToLogin(navigation)}
        leftLinkText="Log In"
        rightLinkAction={navigateToForgotPassword(navigation)}
        rightLinkText="Forgot Password"
      />
    </FormContainer>
  );
};
export default Signup;
