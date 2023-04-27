import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {UserContext} from '../../context/UserContext';
import {StackActions, useNavigation} from '@react-navigation/native';
const Home = () => {
  const {user} = React.useContext(UserContext);
  const navigation = useNavigation();
  console.log('HOME', user);

  useEffect(() => {
    if (!user) {
      navigation.dispatch(
        StackActions.replace('Login'), // user object from API
      );
    }
  }, [user]);

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
