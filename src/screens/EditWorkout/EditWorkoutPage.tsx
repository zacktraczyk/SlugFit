import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import AddButton from '../../components/AddButton';
import { NavigatorParamList } from '../DrawerNavigator';
import { Exercise, PLACEHOLDER_EXERCISE_NAME } from '../../types/Exercise';
import ExerciseBlock from '../../components/ExerciseBlock';
import { updateExerciseInWorkout, useEditableWorkout } from '../../hooks/useEditableWorkout';
import useSelectedWorkout from '../../hooks/useSelectedWorkout';

type EditWorkoutPageProps = NativeStackScreenProps<NavigatorParamList, 'EditWorkoutPage'>;

const EditWorkoutPage: React.FC<EditWorkoutPageProps> = ({ navigation }) => {
  const [selectedWorkout, setSelectedExercise] = useSelectedWorkout((state) => [
    state.workout,
    state.setExercise,
  ]);
  const { workout } = useEditableWorkout(selectedWorkout?.id);
  const [editingExercise, setEditingExercise] = useState<string | undefined>(undefined);

  const updateExercise = (identifier: string, exercise: Exercise) => {
    if (workout) {
      try {
        updateExerciseInWorkout(identifier, exercise, workout.id);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const addExerciseBlock = async () => {
    if (selectedWorkout) {
      await updateExerciseInWorkout(
        PLACEHOLDER_EXERCISE_NAME,
        { name: PLACEHOLDER_EXERCISE_NAME, sets: [] },
        selectedWorkout.id
      );
      setEditingExercise(PLACEHOLDER_EXERCISE_NAME);
    }
  };

  const navigateToExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    if (!workout) {
      console.error('navigateToExercise: current workout is undefined');
      return;
    }
    navigation.navigate('EditExercisePage', {
      workoutId: workout.id,
      exerciseName: exercise.name,
    });
  };

  const renderExerciseBlock = ({ item }) => {
    return (
      <ExerciseBlock
        exercise={item}
        editing={editingExercise}
        update={updateExercise}
        onPress={navigateToExercise}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex w-full flex-1 flex-col items-center justify-center bg-white"
    >
      <FlatList
        data={workout?.exercises}
        renderItem={renderExerciseBlock}
        keyExtractor={(item) => item.name}
        className="w-full"
        contentContainerStyle={styles.flatList}
        keyboardShouldPersistTaps="always"
      />
      <AddButton onPress={addExerciseBlock} />
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

export default EditWorkoutPage;
