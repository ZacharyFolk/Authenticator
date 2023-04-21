import React from 'react';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import {navigateToLogin, navigateToSignup} from '../../utils/helper';
import CustomFormik from '../CustomFormik';

const initialValues = {
  email: '',
};
const validationSchema = Yup.object({}).shape({
  email: Yup.string().email('Invalid Email!').required('Email is missing!'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const handleResetLink = (values, formikActions) => {
    console.log(values);
  };
  return (
    <FormContainer>
      <CustomFormik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleResetLink}>
        <AppInput name="email" placeholder="Email" />
        <SubmitButton title="Send Email" />
        <FormNavigator
          leftLinkAction={navigateToLogin(navigation)}
          leftLinkText="Log In"
          rightLinkAction={navigateToSignup(navigation)}
          rightLinkText="Sign up"
        />
      </CustomFormik>
    </FormContainer>
  );
};
export default ForgotPassword;
