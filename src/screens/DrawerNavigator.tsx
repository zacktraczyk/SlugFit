import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import UseWorkoutPage from './UseWorkout/UseWorkout';
import Settings from './Settings/Settings';
import CustomDrawer from '../components/CustomDrawer';
import AccountSettings from './Account/AccountSettings';

export type NavigatorParamList = {
  Tabs: undefined;
  AccountSettings: undefined;
  Home: undefined;
  HomeStack: undefined;
  SelectWorkout: undefined;
  WorkoutSummary: { consumableWorkoutId?: string };
  UseWorkout: { userId: string };
  MyWorkouts: undefined;
  MyWorkoutsStack: undefined;
  EditWorkoutPage: { editableWorkoutId: string; editableWorkoutName: string; exerciseName: string };
  EditExercisePage: {
    editableWorkoutId: string;
    editableWorkoutName: string;
    exerciseName: string;
  };
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<NavigatorParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        drawerPosition: 'left',
        headerShown: false,
      })}
      drawerContent={() => <CustomDrawer />}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="AccountSettings" component={AccountSettings} />
      <Drawer.Screen
        name="UseWorkout"
        component={UseWorkoutPage}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
