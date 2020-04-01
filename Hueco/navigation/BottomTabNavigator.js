import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';

//Import screens/fonts
import AboutUs from '../screens/AboutUs';
import LoginScreen from '../screens/LoginScreen';
import HomePage from '../screens/HomePage';
import Profile from '../screens/Profile';
import ToDoScreen from '../screens/ToDoApp';
import SearchScreen from '../screens/SearchScreen';

// //Redux imports
import {connect} from 'react-redux';
import { useSelector } from 'react-redux'
// import { loginUserNormal } from '../redux/actions'
// import {addTodo} from '../actions';

const BottomTab = createBottomTabNavigator();
let INITIAL_ROUTE_NAME = 'Login';

function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerShown: getHeaderShown(route),  headerTitle: getHeaderTitle(route) });
  const login = useSelector(state => state.login)
  const loggedIn = login.status

  if(!loggedIn){
    return (
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          }}
          navigationOptions={{
            headerShown: false
          }}
        />
        <BottomTab.Screen
          name="About"
          component={AboutUs}
          options={{
            title: 'About Us',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
          }}
        />
      </BottomTab.Navigator>
    );
  } else {
    return (
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
          name="Home"
          component={HomePage}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          }}
          navigationOptions={{
            headerShown: false
          }}
        />
        <BottomTab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Search',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
          }}
        />
        <BottomTab.Screen
          name="ToDo"
          component={ToDoScreen}
          options={{
            title: 'Add',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle" />,
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
          }}
        />
      </BottomTab.Navigator>
    );
  }
}
export default connect()(BottomTabNavigator);


function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case 'Login':
      return 'Join Today';
    case 'Profile':
      return 'Profile';
    case 'Search':
      return 'Search';
    case 'ToDo':
      return 'To So Screen';
  }
}

function getHeaderShown(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case 'Login':
      return false;
    case 'Home':
      return false;
    case 'Profile':
      return false;
    case 'Search':
      return false;
    case 'ToDo':
      return false;
  }
}