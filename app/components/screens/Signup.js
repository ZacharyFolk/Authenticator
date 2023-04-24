import React, {useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import {
  navigateToLogin,
  navigateToForgotPassword,
  updateNotification,
} from '../../utils/helper';
import CustomFormik from '../CustomFormik';
import {signup} from '../../utils/auth';
import AppNotification from '../AppNotification';
const initialValues = {
  name: '',
  email: '',
  password: '',
};
const validationSchema = Yup.object({}).shape({
  name: Yup.string().required('Name is missing!'),
  email: Yup.string().email('Invalid Email!').required('Email is missing!'),
  password: Yup.string()
    .trim()
    .min(8, 'Too short')
    .max(20, 'Too long')
    .required('Password is missing!'),
});

const Signup = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState({type: '', text: ''});

  const handleSignup = async (values, formikActions) => {
    const res = await signup(values);
    formikActions.setSubmitting(false);
    if (!res.success) {
      return updateNotification(setMessage, res.error);
    }
    formikActions.resetForm();

    navigation.dispatch(
      StackActions.replace('Verification', {profile: res.user}), // user object from API
    );
    console.log(res);
  };

  return (
    <>
      {message.text ? (
        <AppNotification type={message.type} text={message.text} />
      ) : null}
      <FormContainer>
        <CustomFormik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}>
          <AppInput name="name" placeholder="Username" />
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
    </>
  );
};
export default Signup;
