import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import {navigateToLogin, navigateToSignup} from '../../utils/helper';
const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <FormContainer>
      <AppInput placeholder="Email" />
      <SubmitButton title="Send Email" />
      <FormNavigator
        leftLinkAction={navigateToLogin(navigation)}
        leftLinkText="Log In"
        rightLinkAction={navigateToSignup(navigation)}
        rightLinkText="Sign up"
      />
    </FormContainer>
  );
};
export default ForgotPassword;
