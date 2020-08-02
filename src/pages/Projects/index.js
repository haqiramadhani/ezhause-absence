import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils';
import {Icon} from 'react-native-elements';

const Value = () => {
  return (
    <View style={styles.page}>
      <View>
        <Icon name="folder-open" type="font-awesome-5" size={80} />
        <Text style={styles.text}>Belum ada Nilai.</Text>
        <Text style={styles.text}>Ketuk + untuk menambah</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" type="font-awesome-5" color="white" />
      </TouchableOpacity>
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
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textDefault,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: Colors.backgroundButton,
    borderRadius: 90,
    bottom: 20,
    fontSize: 20,
    paddingVertical: 20,
    paddingHorizontal: 22,
    position: 'absolute',
    right: 20,
  },
});

export default Value;
