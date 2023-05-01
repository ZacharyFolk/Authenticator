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
    const {data} = await Promise.race([
      client.post('/user/create', {
        ...values,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 5000),
      ), // 5000ms timeout
    ]);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const signin = async values => {
  try {
    const {data} = await Promise.race([
      client.post('/user/signin', {
        ...values,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 5000),
      ), // 5000ms timeout
    ]);
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

export const validateAuthToken = async token => {
  try {
    console.log('doing stuff', token);
    const response = await fetch(
      'http://10.0.2.2:8000/api/user/validate-auth',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('Raw response:', response); // Add this line to log the raw response

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error validating auth token:', error);
    return {success: false, error: 'Error validating auth token'};
  }
};
