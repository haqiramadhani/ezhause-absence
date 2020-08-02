import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../utils';
import {Icon, ListItem} from 'react-native-elements';
import {Body, Header, Title} from 'native-base';
import executeQuery from '../../utils/db';

const Absence = ({navigation}) => {
  const [data, setData] = useState();

  useEffect(() => {
    return navigation.addListener('focus', () => {
      executeQuery(
        'SELECT attendances.*, departments.name, departments.description FROM attendances, departments WHERE attendances.department_id = departments.id ORDER BY attendances.attendance_date DESC',
        [],
      ).then((r) => {
        // ...
        const dataRows = [];
        r.rows.raw().map((item) => {
          const found = dataRows.findIndex(
            (row) =>
              row.department_id === item.department_id &&
              row.attendance_date === item.attendance_date,
          );
          if (found === -1) {
            item.attendance = [
              item.attendance === 1 ? 1 : 0,
              item.attendance === 2 ? 1 : 0,
              item.attendance === 3 ? 1 : 0,
              item.attendance === 4 ? 1 : 0,
            ];
            dataRows.push(item);
          } else {
            dataRows[found].attendance[item.attendance - 1] += 1;
          }
        });
        setData(dataRows);
        // ...
      });
    });
  }, [navigation]);

  return (
    <View style={styles.page}>
      <Header style={styles.defaultColor}>
        <Body>
          <Title> Attendances </Title>
        </Body>
      </Header>
      <ScrollView>
        {data?.length ? (
          data.map((item, index) => (
            <ListItem
              key={index}
              title={item.name}
              subtitle={`${item.description}\n${
                item.attendance[0] ? item.attendance[0] + ' present ' : ''
              }${item.attendance[1] ? item.attendance[1] + ' absence ' : ''}${
                item.attendance[2] ? item.attendance[2] + ' sick ' : ''
              }${item.attendance[3] ? item.attendance[3] + ' permit ' : ''}`}
              bottomDivider
              chevron
              onPress={() => navigation.navigate('Attendance Detail', item)}
            />
          ))
        ) : (
          <View
            style={{
              justifyContent: 'center',
              height: 300,
            }}>
            <Icon name="folder-open" type="font-awesome-5" size={80} />
            <Text style={styles.text}>No Attendance.</Text>
            <Text style={styles.text}>Press + to add attendance</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add Attendance')}>
        <Icon name="plus" type="font-awesome-5" color="white" />
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
  defaultColor: {backgroundColor: Colors.backgroundCard},
});

export default Absence;
