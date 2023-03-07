import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import UseWorkoutPage from './UseWorkout/UseWorkout';
import Settings from './Settings/Settings';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomDrawer from '../components/CustomDrawer';
import MyWorkouts from './MyWorkouts/MyWorkouts';
import EditWorkoutPage from './EditWorkout/EditWorkoutPage';
import EditExercisePage from './EditExercise/EditExercisePage';
import ToggleDrawerButton from '../components/ToggleDrawerButton';
import BreadcrumbHeader from '../components/BreadcrumbsHeader';
import MyWorkoutsStack from './MyWorkouts/MyWorkoutsStack';


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
      screenOptions={({ route, navigation }) => ({
        drawerPosition: 'left',
        headerShown: false,
      })}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="MyWorkouts" component={MyWorkouts} />
      <Drawer.Screen
        name="MyWorkoutsStack"
        component={MyWorkoutsStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="EditWorkoutPage" component={EditWorkoutPage} />
      <Drawer.Screen name="EditExercisePage" component={EditExercisePage} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
