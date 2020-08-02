import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from '../../utils';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Employee Attendance');
    }, 3000);
  });

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Employee Attendance</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.backgroundDefault,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textDefault,
  },
});

export default Splash;
