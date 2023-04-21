import React from 'react';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';

const Login = () => {
  return (
    <FormContainer>
      <AppInput placeholder="Email" />
      <AppInput placeholder="Password" />
      <SubmitButton title="Zogin" />
      <FormNavigator leftLinkText="Sign Up" rightLinkText="Forgot Password" />
    </FormContainer>
  );
};
export default Login;
