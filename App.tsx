import {
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.logo}
          source={require('./app/assets/cardback.jpg')}
        />
        <TextInput placeholder="example@email.com" style={styles.input} />
        <TextInput placeholder="********" style={styles.input} />
        <Pressable style={styles.btnContainer}>
          <Text style={styles.btnTitle}>Log in</Text>
        </Pressable>
        <View style={styles.linkContainer}>
          <Pressable>
            <Text style={styles.textLink}>Sign up</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.textLink}>Forgot password</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
    marginTop: height * 0.1,
    alignSelf: 'center',
  },
  input: {
    width: width - 40,
    backgroundColor: '#eae9e7',
    height: 50,
    fontSize: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: '#8469cf',
    marginBottom: 20,
  },
  btnContainer: {
    backgroundColor: '#8469cf',
    width: width - 40,
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: 20,
    color: '#fff',
  },
  textLink: {
    fontSize: 16,
    color: '#8469cf',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
