import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../DrawerNavigator';
import MyWorkouts from './MyWorkouts';
import ToggleDrawerButton from '../shared/ToggleDrawerButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EditWorkoutPage from '../EditWorkout/EditWorkoutPage';
import EditExercisePage from '../EditExercise/EditExercisePage';

type MyWorkoutsStackProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkoutsStack'>;

const Stack = createNativeStackNavigator<NavigatorParamList>();

const MyWorkoutsStack: React.FC<MyWorkoutsStackProps> = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyWorkouts"
        component={MyWorkouts}
        options={{ headerLeft: () => <ToggleDrawerButton navigation={navigation} /> }}
      />
      <Stack.Screen name="EditWorkoutPage" component={EditWorkoutPage} />
      <Stack.Screen name="EditExercisePage" component={EditExercisePage} />
    </Stack.Navigator>
  );
};

export default MyWorkoutsStack;
