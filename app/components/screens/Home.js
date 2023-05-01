import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {UserContext} from '../../context/UserContext';
import {StackActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateAuthToken} from '../../utils/auth';
validateAuthToken;
const Home = () => {
  const {user, setUser} = React.useContext(UserContext);
  const navigation = useNavigation();
  console.log('HOME', user);

  useEffect(() => {
    if (!user) {
      navigation.dispatch(
        StackActions.replace('Login'), // user object from API
      );
    }
  }, [user]);

  // check for token
  useEffect(() => {
    const loadAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          console.log('TOKEN IS STILL HERE');
          console.log('token', token);
          const res = await validateAuthToken(token);
          if (res.success) {
            console.log('========= SUCCESS FROM AUTH TOKEN =============');
            console.log(res.user);
            setUser(res.user); // set user object in context
          }
          console.log(res);
        }
      } catch (error) {
        console.log('Error loading token from AsyncStorage:', error);
      }
    };
    loadAuthToken();
  }, []);

  return (
    <View>
      <Text>{user ? user.name : 'wut?'}</Text>
      {/* <Text>{user.verified ? 'yes' : 'no'} </Text>
      <Text>{user.email}</Text>
      <Text>{user.id} </Text> */}
    </View>
  );
};

export default Home;
