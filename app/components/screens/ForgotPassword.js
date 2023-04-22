import React, {useState} from 'react';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import {
  navigateToLogin,
  navigateToSignup,
  updateNotification,
} from '../../utils/helper';
import CustomFormik from '../CustomFormik';
import {forgotPassword} from '../../utils/auth';
import AppNotification from '../AppNotification';

const initialValues = {
  email: '',
};
const validationSchema = Yup.object({}).shape({
  email: Yup.string().email('Invalid Email!').required('Email is missing!'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState({type: '', text: ''});

  const handleResetLink = async (values, formikActions) => {
    const res = await forgotPassword(values.email);
    formikActions.setSubmitting(false);
    if (!res.success) {
      return updateNotification(setMessage, res.error);
    }
    formikActions.resetForm();
    return updateNotification(setMessage, res.message, 'success');
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
    </>
  );
};
export default ForgotPassword;
