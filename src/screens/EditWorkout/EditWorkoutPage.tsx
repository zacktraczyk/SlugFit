import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import AddButton from '../../components/AddButton';
import { NavigatorParamList } from '../DrawerNavigator';
import ExerciseBlock from '../../components/blocks/ExerciseBlock';
import { useEditableWorkout } from '../../hooks/useEditableWorkout';
import Spinner from 'react-native-loading-spinner-overlay';
import { createEditableExercise } from '../../utils/db/editableexercises';
import { useAuth } from '../../contexts/AuthProvider';
import { updateEditableWorkout } from '../../utils/db/editableworkouts';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorScreen from '../../components/ErrorScreen';

type EditWorkoutPageProps = NativeStackScreenProps<NavigatorParamList, 'EditWorkoutPage'>;

const EditWorkoutPage: React.FC<EditWorkoutPageProps> = ({ navigation, route }) => {
  const { session } = useAuth();
  const { editableWorkout, loading } = useEditableWorkout(route.params.editableWorkoutId, true);
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
