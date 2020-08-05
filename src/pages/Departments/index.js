import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils';
import {Icon, ListItem} from 'react-native-elements';
import {Body, Header, Label, Title} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import executeQuery from '../../utils/db';

const Class = ({navigation, route}) => {
  const [data, setData] = useState();

  useEffect(() => {
    return navigation.addListener('focus', () => {
      executeQuery('SELECT * FROM departments ORDER BY id DESC', []).then((r) =>
        setData(r.rows.raw()),
      );
    });
  }, [navigation]);

  const promptDeleteItem = (item) => {
    Alert.alert('Delete', 'Apakah Anda yakin ingin menghapus departemen ini?', [
      {text: 'Tidak', style: 'cancel'},
      {
        text: 'Iya',
        style: 'default',
        onPress: () => {
          executeQuery('DELETE FROM departments WHERE id = ?', [item.id]);
          setData(data.filter((i) => i.id !== item.id));
        },
      },
    ]);
  };

  const editItem = (item) => {
    navigation.navigate('Add Department', item);
  };

  return (
    <View style={styles.page}>
      <Header style={styles.defaultColor}>
        <Body>
          <Title> Departemen </Title>
        </Body>
      </Header>
      {/*<ScrollView>*/}
      {data?.length ? (
        <SwipeListView
          data={data.map((i) => ({...i, key: `${i.id}`}))}
          renderItem={({index, item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Employee List', item)}
                onLongPress={() => navigation.navigate('Employee List', item)}>
                <ListItem
                  key={index}
                  title={item.name}
                  subtitle={item.description}
                  bottomDivider
                  chevron
                />
              </TouchableOpacity>
            );
          }}
          renderHiddenItem={({index, item}) => {
            return (
              <View style={styles.hiddenButton}>
                <TouchableOpacity
                  onPress={() => promptDeleteItem(item)}
                  style={{
                    backgroundColor: 'red',
                    width: 75,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Label style={{color: Colors.textLight}}>Hapus</Label>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => editItem(item)}
                  style={{
                    backgroundColor: 'green',
                    width: 75,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Label style={{color: Colors.textLight}}>Edit</Label>
                </TouchableOpacity>
              </View>
            );
          }}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      ) : (
        // data.map((item, index) => ())
        <View style={{justifyContent: 'center', height: 300}}>
          <Icon name="folder-open" type="font-awesome-5" size={80} />
          <Text style={styles.text}>Tidak ada departemen.</Text>
          <Text style={styles.text}>Ketuk + untuk menambah</Text>
        </View>
      )}
      {/*</ScrollView>*/}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add Department')}>
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
  hiddenButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundDefault,
  },
});

export default Class;
