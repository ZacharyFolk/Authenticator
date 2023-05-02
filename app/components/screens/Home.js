import {Button, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserContext} from '../../context/UserContext';
import {StackActions, useNavigation} from '@react-navigation/native';
import {loadAuthToken, validateAuthToken} from '../../utils/auth';

const ClearAsyncStorageButton = () => {
  const handleClearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View>
      <Button title="Clear AsyncStorage" onPress={handleClearAsyncStorage} />
    </View>
  );
};

const Home = () => {
  const {user, setUser} = React.useContext(UserContext);
  const navigation = useNavigation();
  console.log('HOME', user);

  // check for token
  useEffect(() => {
    console.log('RUNNING loadAuthToken(setUser)');
    const init = async () => {
      await loadAuthToken(setUser);
      console.log('ALL DONE');
      console.log('USER', user);
      // if (!user) {
      //   navigation.dispatch(
      //     StackActions.replace('Login'), // user object from API
      //   );
      // }
    };
    init();
  }, []);

  return (
    <View>
      <Text>{user ? user.name : 'wut?'}</Text>

      <ClearAsyncStorageButton />
      {/* <Text>{user.verified ? 'yes' : 'no'} </Text>
      <Text>{user.email}</Text>
      <Text>{user.id} </Text> */}
    </View>
  );
};

export default Home;
