import React from 'react';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Formik} from 'formik';
import * as Yup from 'yup';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import {navigateToLogin, navigateToForgotPassword} from '../../utils/helper';
import CustomFormik from '../CustomFormik';
const initialValues = {
  username: '',
  email: '',
  password: '',
};
const validationSchema = Yup.object({}).shape({
  username: Yup.string().required('Name is missing!'),
  email: Yup.string().email('Invalid Email!').required('Email is missing!'),
  password: Yup.string()
    .trim()
    .min(8, 'Too short')
    .max(20, 'Too long')
    .required('Password is missing!'),
});

const Signup = () => {
  const navigation = useNavigation();

  const handleSignup = (values, formikActions) => {
    setTimeout(() => {
      console.log(values, formikActions);
      formikActions.resetForm();
      formikActions.setSubmitting(false);
    }, 3000);
  };
  return (
    <FormContainer>
      <CustomFormik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignup}>
        <AppInput name="username" placeholder="Username" />
        <AppInput name="email" placeholder="Email" />
        <AppInput secureTextEntry name="password" placeholder="Password" />
        <SubmitButton title="Sign up" />
        <FormNavigator
          leftLinkAction={navigateToLogin(navigation)}
          leftLinkText="Log In"
          rightLinkAction={navigateToForgotPassword(navigation)}
          rightLinkText="Forgot Password"
        />
      </CustomFormik>
    </FormContainer>
  );
};
export default Signup;
