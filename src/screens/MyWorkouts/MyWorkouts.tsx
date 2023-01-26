import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import SearchBarWorkout from './WorkoutSearchBar';
import { SearchBarWorkoutProps } from './WorkoutSearchBar';

type MyWorkoutsProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkouts'>;

const MyWorkouts: React.FC<MyWorkoutsProps> = () => {
  const exerciseSelected = React.useRef({exercise: "", isOk:false}); 

  return (
    <View className="flex h-full flex-col items-center ">
      <SearchBarWorkout  selectedExercise={exerciseSelected.current} />
    </View>
  );
};

export default MyWorkouts;
