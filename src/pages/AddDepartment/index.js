import React, {createRef, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils';
import {Icon, Input} from 'react-native-elements';
import executeQuery from '../../utils/db';
import {Body, Button, Header, Left, Right, Title} from 'native-base';

const AddClass = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('Tambah Departemen');

  const inputRefs = [
    {
      field: 'Nama Departemen',
      ref: createRef(),
      value: name,
      setter: (value) => setName(value),
    },
    {
      field: 'Deskripsi',
      ref: createRef(),
      value: description,
      setter: (value) => setDescription(value),
    },
  ];

  const nextInputRef = (index) => {
    index === inputRefs.length - 1
      ? createClass()
      : inputRefs[index + 1].focus();
  };

  const createClass = async () => {
    if (!route.params?.id) {
      const data = await executeQuery(
        'INSERT INTO departments (name, description) VALUES (?, ?)',
        [name, description],
      );
      if (data.insertId) {
        navigation.setParams({update: true});
        navigation.setOptions({update: true});
        navigation.pop();
      }
    } else {
      const data = await executeQuery(
        'UPDATE departments SET name = ?, description = ? WHERE id = ?',
        [name, description, route.params.id],
      );
      if (data.insertId) {
        navigation.setParams({update: true});
        navigation.setOptions({update: true});
        navigation.pop();
      }
    }
  };

  useEffect(() => {
    if (route.params?.id) {
      setTitle('Edit Departemen');
      setName(route.params.name);
      setDescription(route.params.description);
    }
  }, []);

  return (
    <View style={styles.page}>
      <Header style={styles.defaultColor}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" color={Colors.textLight} />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right />
      </Header>
      <View style={styles.container}>
        {inputRefs.map((item, index) => (
          <Input
            autoFocus={!index}
            returnKeyType={index === inputRefs.length - 1 ? 'default' : 'next'}
            key={index}
            placeholder={item.field}
            label={item.field}
            ref={(r) => (inputRefs[index] = r)}
            onSubmitEditing={() => nextInputRef(index)}
            value={item.value}
            onChangeText={(e) => item.setter(e)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={createClass}>
        <Icon name="check" type="font-awesome-5" color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.backgroundDefault,
    flex: 1,
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
  container: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  defaultColor: {backgroundColor: Colors.backgroundCard},
});

export default AddClass;
