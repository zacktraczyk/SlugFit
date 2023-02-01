import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import AccountSettings from './Account/AccountSettings';
import { Exercise } from '../types/Exercise';

export type NavigatorParamList = {
  Tabs: undefined;
  AccountSettings: undefined;
  Home: undefined;
  MyWorkouts: undefined;
  MyWorkoutsStack: undefined;
  EditWorkoutPage: undefined;
  EditExercisePage: { exercise: Exercise };
  Profile: undefined;
};

const Drawer = createDrawerNavigator<NavigatorParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        drawerPosition: 'left',
        headerShown: false,
      })}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="AccountSettings" component={AccountSettings} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
