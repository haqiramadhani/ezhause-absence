import React, {createRef, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Colors} from '../../utils';
import {Icon, Input, ListItem} from 'react-native-elements';
import executeQuery from '../../utils/db';
import {
  Body,
  Button,
  Header,
  Left,
  Right,
  Title,
  DatePicker,
  Label,
  Radio,
} from 'native-base';

const AttendanceDetail = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(0);

  useEffect(() => {
    console.log('fetch');
    executeQuery(
      'SELECT attendances.id, attendances.attendance, employees.name FROM attendances, employees WHERE attendances.employee_id = employees.id AND attendances.department_id = ? AND attendances.attendance_date = ? ORDER BY attendances.attendance_date DESC',
      [route.params.department_id, route.params.attendance_date],
    )
      .then((r) => setData(r.rows.raw()))
      .catch((e) => console.log(e));
  }, [route.params, fetch]);

  const updater = (attendance, id) => {
    console.log(attendance, id);
    executeQuery('UPDATE attendances SET attendance = ? WHERE id = ?', [attendance, id])
      .then((r) => setData(r.rows.raw()))
      .catch((e) => console.log(e));
    setFetch(fetch + 1);
  };

  return (
    <View style={styles.page}>
      <Header style={styles.defaultColor}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" color={Colors.textLight} />
          </Button>
        </Left>
        <Body>
          <Title>Attendance Detail</Title>
        </Body>
        <Right />
      </Header>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: Colors.backgroundButton,
        }}>
        <View />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 5,
            // width: 150,
          }}>
          <Label style={{fontSize: 13, color: Colors.textLight}}>
            {' '}
            present{' '}
          </Label>
          <Label style={{fontSize: 13, color: Colors.textLight}}>
            {' '}
            absence{' '}
          </Label>
          <Label style={{fontSize: 13, color: Colors.textLight}}> sick </Label>
          <Label style={{fontSize: 13, color: Colors.textLight}}>
            {' '}
            permit{' '}
          </Label>
        </View>
      </View>
      <View>
        {data?.length
          ? data.map((item) => (
              <ListItem
                title={item.name}
                rightElement={
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 150,
                    }}>
                    <Radio selected={item.attendance === 1} onPress={() => updater(1, item.id)} />
                    <Radio selected={item.attendance === 2} onPress={() => updater(2, item.id)} />
                    <Radio selected={item.attendance === 3} onPress={() => updater(3, item.id)} />
                    <Radio selected={item.attendance === 4} onPress={() => updater(4, item.id)} />
                  </View>
                }
              />
            ))
          : null}
      </View>
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

export default AttendanceDetail;
