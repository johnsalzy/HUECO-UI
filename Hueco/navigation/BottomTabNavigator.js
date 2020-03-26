import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';

//Import screens/fonts
import AboutUs from '../screens/AboutUs';
import LoginScreen from '../screens/LoginScreen';
import TestScreen1 from '../screens/Test1';
import Profile from '../screens/Profile';
import ToDoScreen from '../screens/ToDoApp';

// //Redux imports
import {connect} from 'react-redux';
import { useSelector } from 'react-redux'
// import { loginUserNormal } from '../redux/actions'
// import {addTodo} from '../actions';

const BottomTab = createBottomTabNavigator();
let INITIAL_ROUTE_NAME = 'Login';

// export default class BottomNavigation extends React.Component {
//     render(){
//       navigation = this.props.navigation;
//       route = this.props.route;

//       return(
//         <View>  <Text>Hello</Text></View>


//       );
//     }


// }


function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerShown: getHeaderShown(route),  headerTitle: getHeaderTitle(route) });
  const login = useSelector(state => state.login)
  const loggedIn = login.status
  // alert('User Logged Props from nav: ' + JSON.stringify(login))

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
          name="Login"
          component={TestScreen1}
          options={{
            title: 'Login',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          }}
          navigationOptions={{
            headerShown: false
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
          }}
        />
        <BottomTab.Screen
          name="ToDo"
          component={ToDoScreen}
          options={{
            title: 'List',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
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
      case 'ToDo':
        return 'To So Screen';
  }
}

function getHeaderShown(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case 'Login':
      return false;
    case 'Profile':
      return true;
      case 'ToDo':
        return true;
  }
}