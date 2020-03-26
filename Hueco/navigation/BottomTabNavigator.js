import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';

//Import screens/fonts
import AboutUs from '../screens/AboutUs';
import LoginScreen from '../screens/LoginScreen';
import TestScreen1 from '../screens/Test1';
import TestScreen2 from '../screens/Test2';
import TestScreen3 from '../screens/Test3';

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


export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerShown: getHeaderShown(route),  headerTitle: getHeaderTitle(route) });
  let loggedIn = false

  
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
          name="About"
          component={TestScreen2}
          options={{
            title: 'About Us',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
          }}
        />
        <BottomTab.Screen
          name="About2"
          component={TestScreen3}
          options={{
            title: 'About Us 2',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />,
          }}
        />
      </BottomTab.Navigator>
    );
  }
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case 'Login':
      return 'Join Today';
    case 'About':
      return 'About Us';
      case 'About2':
        return 'about us2';
  }
}

function getHeaderShown(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case 'Login':
      return false;
    case 'About':
      return true;
      case 'About2':
        return true;
  }
}