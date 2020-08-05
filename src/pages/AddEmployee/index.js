import React, {createRef, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import {Colors} from '../../utils';
import {Icon, Input} from 'react-native-elements';
import executeQuery from '../../utils/db';
import {
  Body,
  Button,
  Header,
  Left,
  Right,
  Title,
  Picker,
  Form,
  Label,
} from 'native-base';

const AddClass = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [nik, setNik] = useState('');
  const [gender, setGender] = useState(1);
  const [title, setTitle] = useState('Tambah Karyawan');

  const inputRefs = [
    {
      field: 'Nama Lengkap',
      ref: createRef(),
      value: name,
      setter: (value) => setName(value),
    },
    {
      field: 'NIK',
      ref: createRef(),
      value: nik,
      setter: (value) => setNik(value),
      keyboard: 'number',
    },
  ];

  const nextInputRef = (index) => {
    if (index !== inputRefs.length - 1) {
      inputRefs[index + 1].focus();
    }
  };

  const createEmployee = async () => {
    let data;
    if (name && nik && gender) {
      if (!route.params.id) {
        data = await executeQuery(
          'INSERT INTO employees (name, nik, gender, department_id) VALUES (?, ?, ?, ?)',
          [name, nik, gender, route.params.department_id],
        );
      } else {
        data = await executeQuery(
          'UPDATE employees SET name = ?, nik = ?, gender = ? WHERE id = ?',
          [name, nik, gender, route.params.id],
        );
      }
      if (data.insertId) {
        navigation.goBack();
      }
    } else {
      ToastAndroid.show('full name & NIK is required !', ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    console.log(route.params);
    if (route.params.id) {
      setTitle('Edit Karyawan');
      setName(route.params.name);
      setNik(route.params.nik);
      setGender(route.params.gender);
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
          <Title style={styles.miniTitle}>
            {route.params.name} - {route.params.description}
          </Title>
        </Body>
        <Right />
      </Header>
      <View style={styles.container}>
        {inputRefs.map((item, index) => (
          <Input
            labelStyle={{color: Colors.textDefault}}
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
        <Form>
          <Label style={styles.formLabel}>{'  '}Jenis Kelamin</Label>
          <Picker
            note
            mode="dropdown"
            style={styles.picker}
            selectedValue={gender}
            onValueChange={(v) => setGender(v)}>
            <Picker.Item label="  Laki-laki" value="1" />
            <Picker.Item label="  Perempuan" value="0" />
          </Picker>
        </Form>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={createEmployee}>
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
  miniTitle: {fontSize: 13},
  picker: {width: 200, color: Colors.textDefault},
  formLabel: {color: Colors.textDefault, fontWeight: 'bold'},
});

export default AddClass;
