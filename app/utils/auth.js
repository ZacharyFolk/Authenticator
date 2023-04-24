import client from '../api/client';
const catchError = error => {
  console.log(error?.response?.data);
  if (error?.response?.data) {
    return error.response.data;
  }
  return {success: false, error: error.message};
};
export const signup = async values => {
  try {
    const {data} = await client.post('/user/create', {
      ...values,
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const signin = async values => {
  try {
    const {data} = await client.post('/user/signin', {
      ...values,
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const forgotPassword = async email => {
  try {
    const {data} = await client.post('/user/forgot-password', {
      email,
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const verifyEmail = async (otp, userId) => {
  try {
    console.log('From verifyEmail', otp, userId);
    const {data} = await client.post('/user/verify-email', {otp, userId});
    console.log('data', data);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
