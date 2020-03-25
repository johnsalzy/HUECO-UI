import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';

//Import screens/fonts
import AboutUs from '../screens/AboutUs';
import LoginScreen from '../screens/LoginScreen';
// import LinksScreen from '../screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Login';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerMode: 'screen'}); //, headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
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
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Login':
      return 'Join Today';
    case 'About':
      return 'About Us';
  }
}
