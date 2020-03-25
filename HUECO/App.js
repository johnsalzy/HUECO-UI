import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Import Screens/Components/Styles
// import ToDoApp from './src/Screens/ToDoApp';
import Login from './src/Screens/LoginScreen';
import MainScreen from './src/Screens/MainScreen';

//REdux
import store from './src/Redux/Store';
import {Provider} from 'react-redux';

import {StackNavigator} from 'react-navigation';

export default class App extends Component {
    render(){
        const MainNavigator = StackNavigator({
          Main: {screen: MainScreen}
        })
        return (
        <Provider store={store}>
          {/* <ToDoApp /> */}
          {/* <Login /> */}
          <MainNavigator />
        </Provider>
        );
    }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
