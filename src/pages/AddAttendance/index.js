import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
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

const AddAbsence = ({navigation, route}) => {
  const [date, setDate] = useState(new Date());
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({});
  const [title, setTitle] = useState('Tambah Absensi');
  const [selected, setSelected] = useState(null);

  const getEmployees = () => {
    return executeQuery(
      'SELECT * FROM employees WHERE department_id = ? ORDER BY id DESC',
      [department.id],
    )
      .then((result) => {
        // setEmployees(result.rows.raw());
        return result.rows.raw();
      })
      .catch(() => null);
  };

  const getDepartments = () => {
    executeQuery('SELECT * FROM departments ORDER BY id DESC', [])
      .then((result) => setDepartments(result.rows.raw()))
      .catch(() => null);
  };

  const createAttendance = async () => {
    const employees = await getEmployees();
    const params = [];
    await employees.map((employee) => {
      params.push(JSON.stringify(date));
      params.push(employee.department_id);
      params.push(employee.id);
      params.push(1);
    });
    if (params.length) {
      const exist = await executeQuery(
        'SELECT COUNT(*) AS exist FROM attendances WHERE attendance_date = ? AND department_id = ?',
        [JSON.stringify(date), department.id],
      );
      if (exist.rows.raw()[0].exist)
        return ToastAndroid.show('Absensi sudah dibuat !', ToastAndroid.LONG);
      const data = await executeQuery(
        // 'SELECT * FROM attendances',
        `INSERT INTO attendances (attendance_date, department_id, employee_id, attendance) VALUES ${employees.map(
          () => '(?, ?, ?, ?)',
        )}`,
        // [],
        [...params],
      );
      if (data.insertId) {
        navigation.replace('Attendance Detail', {
          department_id: department.id,
          attendance_date: JSON.stringify(date),
        });
      } else {
        ToastAndroid.show('Data karyawan masih kosong !', ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show('Data karyawan masih kosong !', ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    getDepartments();
    if (route.params.id) {
      setTitle('Edit Absensi');
      setDate(route.params.attendance_date);
      setSelected(
        departments.findIndex((i) => (i.id = route.params.department_id)),
      );
      setDepartment(
        departments.find((i) => (i.id = route.params.department_id)),
      );
    }
  }, []);

  useEffect(() => {
    getDepartments();
  }, [department]);

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
        <Label>Tanggal</Label>
        <DatePicker
          defaultDate={date}
          maximumDate={date}
          locale={'id'}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={'fade'}
          androidMode={'default'}
          placeHolderText={date.toString().substr(4, 0)}
          textStyle={{color: Colors.textDefault}}
          placeHolderTextStyle={{color: Colors.textDefault}}
          onDateChange={setDate}
          disabled={false}
        />
        <Label>Departemen</Label>
        <ScrollView style={{marginTop: 10, marginBottom: 140}}>
          {departments?.length
            ? departments.map((item, index) => (
                <ListItem
                  leftElement={
                    <Radio
                      selected={selected === index}
                      onPress={() => {
                        setDepartment(item);
                        setSelected(index);
                      }}
                    />
                  }
                  key={index}
                  title={item.name}
                  bottomDivider
                  onPress={() => {
                    setDepartment(item);
                    setSelected(index);
                  }}
                />
              ))
            : null}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={createAttendance}>
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

export default AddAbsence;
