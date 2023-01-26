import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import SearchBarWorkout from './WorkoutSearchBar';

type MyWorkoutsProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkouts'>;

const MyWorkouts: React.FC<MyWorkoutsProps> = () => {
  return (
    <View className="flex h-full flex-col items-center ">
      <SearchBarWorkout />
    </View>
  );
};

export default MyWorkouts;
