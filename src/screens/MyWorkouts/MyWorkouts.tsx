import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, FlatList, Platform, StyleSheet } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import AddButton from '../../components/AddButton';
import WorkoutBlock from '../../components/WorkoutBlock';
import { useAuth } from '../../contexts/AuthProvider';
import { useMyWorkouts } from '../../hooks/useMyWorkouts';
import {
  createEditableWorkout,
  deleteEditableWorkout,
  updateEditableWorkout,
} from '../../hooks/useEditableWorkout';

import { EditableWorkout } from '../../types/EditableWorkout';
import useSelectedWorkout from '../../hooks/useSelectedWorkout';

export type MyWorkoutsProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkouts'>;

const MyWorkouts: React.FC<MyWorkoutsProps> = ({ navigation }) => {
  const { session } = useAuth();
  const { workouts, refresh: refreshWorkouts } = useMyWorkouts(session);
  const [editingWorkout, setEditingWorkout] = useState<string | undefined>(undefined);
  const [setSelectedWorkout] = useSelectedWorkout((state) => [state.setWorkout]);

  const addWorkoutBlock = async () => {
    const workout = await createEditableWorkout(session);
    if (workout) setEditingWorkout(workout.id);
    if (refreshWorkouts) await refreshWorkouts();
  };
  const deleteWorkoutBlock = async (id) => {
    await deleteEditableWorkout(id);
    setEditingWorkout(undefined);
    if (refreshWorkouts) await refreshWorkouts();
  };
  const updateWorkout = async (payload) => {
    await updateEditableWorkout(payload);
    setEditingWorkout(undefined);
    if (refreshWorkouts) await refreshWorkouts();
  };

  const navigateToWorkout = (workout: EditableWorkout) => {
    setSelectedWorkout(workout);
    navigation.navigate('EditWorkoutPage');
  };

  const renderWorkoutBlock = ({ item }) => {
    return (
      <WorkoutBlock
        editing={editingWorkout}
        setEditing={setEditingWorkout}
        workout={item}
        updateName={updateWorkout}
        deleteWorkout={deleteWorkoutBlock}
        onPress={navigateToWorkout}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex w-full flex-1 flex-col items-center justify-center bg-white"
    >
      <FlatList
        data={workouts}
        renderItem={renderWorkoutBlock}
        keyExtractor={(item) => item.id}
        className="w-full"
        contentContainerStyle={styles.flatList}
        keyboardShouldPersistTaps="always"
      />
      <AddButton onPress={addWorkoutBlock} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default MyWorkouts;
