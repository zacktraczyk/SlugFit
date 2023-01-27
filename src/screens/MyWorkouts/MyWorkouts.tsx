import React, { useState, useRef, LegacyRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, FlatList, Platform, TextInput } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import AddButton from '../../components/AddButton';
import WorkoutBlock from '../../components/WorkoutBlock';
import { EditableWorkout } from '../../types/EditableWorkout';

export type MyWorkoutsProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkouts'>;

const MyWorkouts: React.FC<MyWorkoutsProps> = () => {
  const [workouts, setWorkouts] = useState<Array<EditableWorkout>>([]);
  const [editingWorkout, setEditingWorkout] = useState<string | undefined>(undefined);

  const renderWorkoutBlock = ({ item }) => {
    return <WorkoutBlock editing={editingWorkout} name={item.name} id={item.id} />;
  };

  const addWorkoutBlock = () => {
    const newWorkout = { id: Math.floor(Math.random() * 1000).toString(), name: 'fake name' };
    setWorkouts((oldWorkouts) => {
      return [...oldWorkouts, newWorkout];
    });
    setEditingWorkout(newWorkout.id);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex flex-1 flex-col items-center justify-center bg-white"
    >
      <FlatList data={workouts} renderItem={renderWorkoutBlock} keyExtractor={(item) => item.id} />
      <AddButton onPress={addWorkoutBlock} />
    </KeyboardAvoidingView>
  );
};

export default MyWorkouts;
