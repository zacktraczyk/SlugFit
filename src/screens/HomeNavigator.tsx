import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import AccountSettings from './Account/AccountSettings';
import Home from './Home';

export type HomeStackParamList = {
  Home: undefined;
  AccountSettings: undefined;
};

const Drawer = createDrawerNavigator<HomeStackParamList>();

function HomeNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{
          title: 'Account Settings',
        }}
      />
    </Drawer.Navigator>
  );
}

export default HomeNavigator;
