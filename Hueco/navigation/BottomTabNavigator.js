import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import TabBarIcon from '../components/TabBarIcon';

//Import screens/fonts
import AboutUs from '../screens/AboutUs';
import LoginScreen from '../screens/LoginScreen';
import HomePage from '../screens/HomePage';
import Profile from '../screens/Profile';
import WorkOutScreen from '../screens/Workout';
import SearchScreen from '../screens/SearchScreen';
import { Transition } from './Transition';

// //Redux imports
import {connect} from 'react-redux';
import { useSelector } from 'react-redux'

const AuthStack = createBottomTabNavigator();
const AppStack = createBottomTabNavigator();
const RootStack = createStackNavigator();
let INITIAL_ROUTE_NAME = 'Login';

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator 
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{...Transition}}
      >
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="lock" />,
        }}
        navigationOptions={{
          headerShown: false
        }}
      />
      <AuthStack.Screen
        name="About"
        component={AboutUs}
        options={{
          title: 'About Us',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="people" />,
        }}
      />
    </AuthStack.Navigator>
  );
}

const HomeNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName={INITIAL_ROUTE_NAME} screenOptions={{...Transition}}>
      <AppStack.Screen
        name="Home"
        component={HomePage}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
        }}
        navigationOptions={{
          headerShown: false
        }}
      />
      <AppStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="search" />,
        }}
      />
      <AppStack.Screen
        name="Workout"
        component={WorkOutScreen}
        options={{
          title: 'Work Outs',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="fitness-center" />,
        }}
      />
      <AppStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="person" />,
        }}
      />
    </AppStack.Navigator>
  );
}


function BottomTabNavigator({ navigation }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerShown: false });
  const login = useSelector(state => state.login)
  const loggedIn = login.status
  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{
        ...Transition,
      }}>
      {!loggedIn ? (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <RootStack.Screen name="App" component={HomeNavigator} />
      )}
    </RootStack.Navigator>
  );



  // if(!loggedIn){
  //   return(
  //     <AuthNavigator />
  //   );
  // } else {
  //   return(
  //     <HomeNavigator />
  //   )
  // }
}
export default connect()(BottomTabNavigator);