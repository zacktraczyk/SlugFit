import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import AccountSettings from './Account/AccountSettings';
import UseWorkoutPage from './UseWorkout/UseWorkout';

export type NavigatorParamList = {
  Tabs: undefined;
  AccountSettings: undefined;
  Home: undefined;
  HomeStack: undefined;
  SelectWorkout: undefined;
  UseWorkout: { workoutId: string };
  MyWorkouts: undefined;
  MyWorkoutsStack: undefined;
  EditWorkoutPage: undefined;
  EditExercisePage: { workoutId: string; exerciseName: string };
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
      <Drawer.Screen
        name="UseWorkout"
        component={UseWorkoutPage}
        options={{ swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
