import client from '../api/client';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Date.now the number of milliseconds that have elapsed since the Unix Epoch - January 1, 1970 00:00:00 UTC
const isTokenExpired = token => {
  try {
    const decoded = jwtDecode(token);
    console.log('DECODED TOKEN', decoded);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return true;
    }
    return false;
  } catch (error) {
    return true;
  }
};

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
    console.log(
      '=============================validateAuthToken=============================',
    );
    console.log('token', token);
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
    console.log('Raw response:', response);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error validating auth token:', error);
    return {success: false, error: 'Error validating auth token'};
  }
};

export const refreshAccessToken = async refreshToken => {
  try {
    const response = await fetch(
      'http://10.0.2.2:8000/api/user/refresh-token',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refreshToken}),
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return {success: false, error: 'Error refreshing access token'};
  }
};

export const loadAuthToken = async setUserCallback => {
  try {
    let token = await AsyncStorage.getItem('authToken');
    let refreshToken = await AsyncStorage.getItem('refreshToken');

    if (token) {
      console.log(
        '=============================loadAuthToken=============================',
      );
      console.log('token', token);
      if (isTokenExpired(token)) {
        console.log('Token is expired, refreshing...');
        const refreshedToken = await refreshAccessToken(refreshToken);

        if (refreshedToken.success) {
          console.log('New access token:', refreshedToken.accessToken);
          await AsyncStorage.setItem('authToken', refreshedToken.accessToken);
          token = refreshedToken.accessToken;
        } else {
          console.log('Failed to refresh token');
          // You can handle token refresh failure here, e.g., log out the user or show an error message
        }
      }

      const res = await validateAuthToken(token);
      if (res.success) {
        console.log(
          '=============================loadAuthToken=============================',
        );
        console.log('*****SUCCESS*****');
        console.log(res.user);
        setUserCallback(res.user); // set user object in context
      }
      console.log(res);
    }
  } catch (error) {
    console.log('Error loading token from AsyncStorage:', error);
  }
};
