import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppLink from './AppLink';

const FormNavigator = ({
  leftLinkText,
  rightLinkText,
  leftLinkAction,
  rightLinkAction,
}) => {
  return (
    <View style={styles.linkContainer}>
      <AppLink text={leftLinkText} onPress={leftLinkAction} />
      <AppLink text={rightLinkText} onPress={rightLinkAction} />
    </View>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FormNavigator;
