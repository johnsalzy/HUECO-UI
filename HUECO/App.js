import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Import Screens
import ToDoApp from './src/Screens/ToDoApp';

//REdux
import store from './src/Redux/Store';
import {Provider} from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <ToDoApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
