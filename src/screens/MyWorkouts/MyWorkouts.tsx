import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, FlatList, Platform, StyleSheet } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import AddButton from '../../components/buttons/AddButton';
import WorkoutBlock from '../../components/blocks/WorkoutBlock';
import { useAuth } from '../../contexts/AuthProvider';
import { useMyEditableWorkouts } from '../../hooks/useMyEditableWorkouts';
import { EditableWorkout } from '../../types';
import {
  createEditableWorkout,
  duplicateEditableWorkout,
  updateEditableWorkout,
  deleteEditableWorkout,
} from '../../utils/db/editableworkouts';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorScreen from '../../components/ErrorScreen';

export type MyWorkoutsProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkouts'>;

const MyWorkouts: React.FC<MyWorkoutsProps> = ({ navigation }) => {
  const { session } = useAuth();
  const {
    editableWorkouts,
    loading,
    fetch: fetchEditableWorkouts,
  } = useMyEditableWorkouts(session);
  const [editingWorkout, setEditingWorkout] = useState<string | undefined>(undefined);

  const addWorkoutBlock = async () => {
    if (!session) throw new Error('Unauthenticated');
    const workout = await createEditableWorkout({ userId: session.user.id });
    if (workout) setEditingWorkout(workout.id);
    if (fetchEditableWorkouts) await fetchEditableWorkouts();
  };

  const updateWorkout = async (editableWorkoutId: string, payload: Partial<EditableWorkout>) => {
    await updateEditableWorkout({
      editableWorkoutId,
      payload,
    });
    setEditingWorkout(undefined);
    if (fetchEditableWorkouts) await fetchEditableWorkouts();
  };

  const deleteWorkoutBlock = async (editableWorkoutId: string) => {
    await deleteEditableWorkout({ editableWorkoutId });
    if (fetchEditableWorkouts) await fetchEditableWorkouts();
  };

  const duplicateWorkoutBlock = async (editableWorkoutId: string) => {
    if (!session) throw new Error('Unauthenticated');
    await duplicateEditableWorkout({ editableWorkoutId, userId: session.user.id });
    if (fetchEditableWorkouts) await fetchEditableWorkouts();
  };

  const navigateToWorkout = (editableWorkout: EditableWorkout) => {
    navigation.navigate('EditWorkoutPage', {
      editableWorkoutId: editableWorkout.id,
      editableWorkoutName: editableWorkout.name,
      exerciseName: '',
    });
  };

  const renderWorkoutBlock = ({ item }) => {
    return (
      <WorkoutBlock
        editing={editingWorkout}
        setEditing={setEditingWorkout}
        workout={item}
        updateName={updateWorkout}
        deleteWorkout={deleteWorkoutBlock}
        duplicateWorkout={duplicateWorkoutBlock}
        onPress={navigateToWorkout}
      />
    );
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex w-full flex-1 flex-col items-center justify-center bg-white"
        enabled={!loading}
      >
        <FlatList
          data={editableWorkouts}
          renderItem={renderWorkoutBlock}
          keyExtractor={(item) => item.id}
          className="w-full"
          contentContainerStyle={styles.flatList}
          keyboardShouldPersistTaps="always"
        />
        <AddButton onPress={addWorkoutBlock} />

        <Spinner visible={loading} />
      </KeyboardAvoidingView>
    </ErrorBoundary>
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
