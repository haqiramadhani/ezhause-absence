import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../utils';
import {Icon} from 'react-native-elements';

function BottomNavigator({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const icons = {
    Departemen: 'university',
    Absensi: 'clipboard-list',
    Projects: 'receipt',
    Lainya: 'ellipsis-h',
  };

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingTop: 5,
              backgroundColor: Colors.backgroundBottom,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 50,
              },
              shadowOpacity: 0.5,
              shadowRadius: 10,
              elevation: 10,
            }}>
            <Icon
              name={icons[label]}
              type="font-awesome-5"
              color={
                isFocused
                  ? Colors.backgroundButton
                  : Colors.backgroundButtonInactive
              }
            />
            <Text
              style={{
                color: isFocused
                  ? Colors.backgroundButton
                  : Colors.backgroundButtonInactive,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomNavigator;
