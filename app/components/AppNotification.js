import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';

const AppNotification = ({type, text}) => {
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: 50,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  let backgroundColor = type === 'error' ? '#f8d7da' : '#d4edda'; // rgba(255, 0, 0, 0.5)
  return (
    <Animated.View style={[styles.container, {height, backgroundColor}]}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  text: {
    color: '#721c24',
    fontSize: 18,
  },
});
export default AppNotification;
