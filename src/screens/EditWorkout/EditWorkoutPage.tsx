import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import AddButton from '../../components/AddButton';
import { NavigatorParamList } from '../DrawerNavigator';
import { Exercise, PLACEHOLDER_EXERCISE_NAME } from '../../types/';
import ExerciseBlock from '../../components/ExerciseBlock';
import { useEditableWorkout } from '../../hooks/useEditableWorkout';
import {
  insertExerciseIntoWorkout,
  updateExerciseInWorkout,
  deleteExerciseInWorkout,
} from '../../utils/workouts';
import useBreadcrumbHistory from '../../hooks/useBreadcrumbHistory';

type EditWorkoutPageProps = NativeStackScreenProps<NavigatorParamList, 'EditWorkoutPage'>;

const EditWorkoutPage: React.FC<EditWorkoutPageProps> = ({ navigation }) => {
  const [selectedWorkout, setSelectedExercise] = useBreadcrumbHistory((state) => [
    state.workout,
    state.setExercise,
  ]);
  const { workout } = useEditableWorkout(selectedWorkout?.id, true);
  const [editingExercise, setEditingExercise] = useState<string | undefined>(undefined);

  /**
   * Update an exercise or insert one if just created, alert if an error
   * We need to take in the `currentName` param to see if it's a placeholder or not
   * @param currentName
   * @param exercise
   */
  const updateOrInsertExercise = async (currentName: string, exercise: Exercise) => {
    if (workout) {
      try {
        // If currentName is the placeholder, we need to delete the placeholder and
        // then insert the new exercise with the selected name
        if (currentName === PLACEHOLDER_EXERCISE_NAME) {
          await deleteExerciseInWorkout(PLACEHOLDER_EXERCISE_NAME, workout.id);
          await insertExerciseIntoWorkout(exercise.name, workout.id);
        } else {
          await updateExerciseInWorkout(exercise, workout.id);
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const addExerciseBlock = async () => {
    if (selectedWorkout) {
      try {
        insertExerciseIntoWorkout(PLACEHOLDER_EXERCISE_NAME, selectedWorkout.id);
        setEditingExercise(PLACEHOLDER_EXERCISE_NAME);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };
  const deleteExerciseBlock = async (exerciseName: string) => {
    if (workout) {
      try {
        await deleteExerciseInWorkout(exerciseName, workout.id);
        setEditingExercise(undefined);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
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
        updateExercise={updateOrInsertExercise}
        deleteExercise={deleteExerciseBlock}
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
