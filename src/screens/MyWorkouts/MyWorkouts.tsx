import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useEditableWorkout from '../../hooks/useEditableWorkout';
import ExerciseSearchBar from './WorkoutSearchBar';

type MyWorkoutsProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkouts'>;

const MyWorkouts: React.FC<MyWorkoutsProps> = ({ navigation }) => {
  const [setEditableWorkoutName] = useEditableWorkout((state) => [state.setName]);
  const navigateToEditWorkoutPage = () => {
    setEditableWorkoutName('Back and Bis');
    navigation.navigate('EditWorkoutPage');
  };
  const selectExercise = (exercise: string) => {
    alert(exercise);
  };
  return (
    <View className="flex h-full flex-col items-center justify-center">
      <TouchableOpacity accessibilityRole="button" onPress={navigateToEditWorkoutPage}>
        <ExerciseSearchBar onSelectExercise={selectExercise} />
      </TouchableOpacity>
    </View>
  );
};

export default MyWorkouts;
