import React from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import {UserProvider} from './app/context/UserContext';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    primary: 'tomato',
  },
};
export default function App() {
  return (
    <UserProvider>
      <NavigationContainer theme={theme}>
        <AuthNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
