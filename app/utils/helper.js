export const navigateToLogin = navigation => () => {
  navigation.navigate('Login');
};
export const navigateToSignup = navigation => () => {
  navigation.navigate('Signup');
};
export const navigateToForgotPassword = navigation => () => {
  navigation.navigate('ForgotPassword');
};
export const updateNotification = (updater, text, type = 'error') => {
  updater({text, type});
  setTimeout(() => {
    updater({text: '', type: ''});
  }, 2500);
};
