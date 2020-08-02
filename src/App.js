import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {ThemeProvider} from 'react-native-elements';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
