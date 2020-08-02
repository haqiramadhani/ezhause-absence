import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Colors} from '../../utils';
import executeQuery from '../../utils/db';
import {Icon, ListItem} from 'react-native-elements';
import {Body, Button, Left, Right, Title, Header, Text} from 'native-base';

const Splash = ({navigation, route}) => {
  const [data, setData] = useState();
  const [search, setSearch] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleGoBack = () => {
    if (search) {
      setSearch(false);
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      executeQuery(
        'SELECT * FROM employees WHERE department_id = ? AND name LIKE ? ORDER BY id DESC',
        [route.params.id, `%${keyword}%`],
      ).then((r) => setData(r.rows.raw()));
    });
  }, [keyword, navigation, route.params.id]);

  return (
    <View style={styles.page}>
      <Header style={styles.defaultColor}>
        <Left>
          <Button transparent onPress={handleGoBack}>
            <Icon name="arrow-back" color={Colors.textLight} />
          </Button>
        </Left>
        {search ? (
          <>
            <Body>
              <TextInput
                placeholder="Search Employee"
                autoFocus
                style={{color: Colors.textLight, fontSize: 17}}
                placeholderTextColor={Colors.placeholder}
                onChangeText={(text) => setKeyword(text)}
              />
            </Body>
            <Right />
          </>
        ) : (
          <>
            <Body>
              <Title>Employee Lists</Title>
              <Title style={{fontSize: 13}}>
                {route.params.name} - {route.params.description}
              </Title>
            </Body>
            <Right>
              <Button transparent onPress={() => setSearch(true)}>
                <Icon name="search" color={Colors.textLight} />
              </Button>
            </Right>
          </>
        )}
      </Header>
      {data?.length ? (
        data.map((item, index) => (
          <ListItem
            leftAvatar={
              <View
                style={{
                  display: 'flex',
                  backgroundColor: Colors.backgroundDefault,
                  width: 45,
                  height: 45,
                  justifyContent: 'center',
                  borderRadius: 30,
                }}>
                <Icon
                  name={item.gender ? 'male' : 'female'}
                  type="font-awesome-5"
                  size={30}
                />
              </View>
            }
            key={index}
            title={item.name}
            subtitle={item.nik}
            bottomDivider
            chevron
            onPress={() => navigation.navigate('Employee List')}
          />
        ))
      ) : (
        <View style={{justifyContent: 'center', flex: 1}}>
          <Icon name="folder-open" type="font-awesome-5" size={80} />
          <Text style={styles.text}>No Employees.</Text>
          <Text style={styles.text}>Press + to add employee</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('Add Employee', route.params)
        }>
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

export default Splash;
