import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

const StatsScreen = ({navigation}) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const handleSubmit = () => {
    // Save age to the context or local state
    // navigation.navigate('Height');
  };

  return (
    <View>
      <Text>Enter your age:</Text>
      <TextInput value={age} onChangeText={setAge} keyboardType="numeric" />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StatsScreen;
