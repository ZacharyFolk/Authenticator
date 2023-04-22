import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import {
  navigateToSignup,
  navigateToForgotPassword,
  updateNotification,
} from '../../utils/helper';
import CustomFormik from '../CustomFormik';
import {signin} from '../../utils/auth';
import AppNotification from '../AppNotification';

const initialValues = {
  email: '',
  password: '',
};
const validationSchema = Yup.object({}).shape({
  email: Yup.string().email('Invalid Email!').required('Email is missing!'),
  password: Yup.string()
    .trim()
    .min(8, 'Too short')
    .max(20, 'Too long')
    .required('Password is missing!'),
});

const Login = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState({type: '', text: ''});

  const handleLogin = async (values, formikActions) => {
    const res = await signin(values);
    formikActions.setSubmitting(false);
    if (!res.success) {
      return updateNotification(setMessage, res.error);
    }
    formikActions.resetForm();
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
          onSubmit={handleLogin}>
          <AppInput name="email" placeholder="Email" />
          <AppInput secureTextEntry name="password" placeholder="Password" />
          <SubmitButton title="Login" />
          <FormNavigator
            leftLinkAction={navigateToSignup(navigation)}
            leftLinkText="Sign Up"
            rightLinkAction={navigateToForgotPassword(navigation)}
            rightLinkText="Forgot Password"
          />
        </CustomFormik>
      </FormContainer>
    </>
  );
};
export default Login;
