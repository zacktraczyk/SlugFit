import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import AddButton from '../../components/AddButton';
import { NavigatorParamList } from '../DrawerNavigator';
import ExerciseBlock from '../../components/blocks/ExerciseBlock';
import { useEditableWorkout } from '../../hooks/useEditableWorkout';
import Spinner from 'react-native-loading-spinner-overlay';
import { createEditableExercise, deleteEditableExercise } from '../../utils/db/editableexercises';
import { useAuth } from '../../contexts/AuthProvider';
import updateWorkout from '../MyWorkouts/MyWorkouts';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorScreen from '../../components/ErrorScreen';
import { updateEditableWorkout } from '../../utils/db/editableworkouts';

type EditWorkoutPageProps = NativeStackScreenProps<NavigatorParamList, 'EditWorkoutPage'>;

const EditWorkoutPage: React.FC<EditWorkoutPageProps> = ({ navigation, route }) => {
  const { session } = useAuth();
  const {
    editableWorkout,
    fetch: fetchEditableExercises,
    loading,
  } = useEditableWorkout(route.params.editableWorkoutId, true);
  const [exercises, setExercises] = useState<string[]>([]);

  useEffect(() => {
    if (editableWorkout.exercises) {
      setExercises(editableWorkout.exercises);
    }
  }, [editableWorkout]);

  const updateEditableExercise = async (exerciseName: string) => {
    if (!editableWorkout.exercises) return;
    if (!session) return;

    await createEditableExercise({
      exerciseName,
      editableWorkoutId: route.params.editableWorkoutId,
      userId: session.user.id,
    });

    setExercises((_exercises) => _exercises.filter((ex) => ex !== ''));

    await updateEditableWorkout({
      editableWorkoutId: route.params.editableWorkoutId,
      payload: {
        exercises: [...editableWorkout.exercises, exerciseName],
      },
    });
  };
  const deleteExerciseBlock = async (exerciseName: string) => {
    await deleteEditableExercise({
      exerciseName,
      editableWorkoutId: route.params.editableWorkoutId,
    });
    setExercises((_exercises) => _exercises.filter((ex) => ex !== ''));

    await updateEditableWorkout({
      editableWorkoutId: route.params.editableWorkoutId,
      payload: {
        exercises: editableWorkout.exercises?.splice(
          editableWorkout.exercises?.indexOf(exerciseName),
          1
        ),
      },
    });

    //if (fetchEditableExercises) await fetchEditableExercises();
  };

  const addTemporaryEditableExerciseBlock = () => {
    if (!exercises.find((ex) => ex === '')) {
      setExercises((old) => [...old, '']);
    }
  };

  const navigateToEditableExercise = (exerciseName) => {
    navigation.navigate('EditExercisePage', {
      editableWorkoutId: route.params.editableWorkoutId,
      editableWorkoutName: route.params.editableWorkoutName,
      exerciseName,
    });
  };

  const renderExerciseBlock = ({ item }) => {
    return (
      <ExerciseBlock
        exerciseName={item}
        update={updateEditableExercise}
        onPress={navigateToEditableExercise}
        deleteExerciseBlock={deleteExerciseBlock}
      />
    );
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex flex-col items-center justify-center flex-1 w-full bg-white"
        enabled={!loading}
      >
        <FlatList
          data={exercises}
          renderItem={renderExerciseBlock}
          keyExtractor={(item) => item}
          className="w-full"
          contentContainerStyle={styles.flatList}
          keyboardShouldPersistTaps="always"
        />
        <AddButton onPress={addTemporaryEditableExerciseBlock} />
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

export default EditWorkoutPage;
