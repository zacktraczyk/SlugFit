import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AddButton from '../../components/buttons/AddButton';
import SetCard from '../../components/blocks/SetCard';
import { NavigatorParamList } from '../DrawerNavigator';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import RestCard from '../../components/blocks/RestCard';
import NoteCard from '../../components/blocks/NoteCard';
import CardCreationModal from '../../components/modals/CardCreationModal';
import { EditableExerciseItem } from '../../types';
import { updateEditableExercise, getEditableExercise } from '../../utils/db/editableexercises';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorScreen from '../../components/ErrorScreen';

type EditExercisePageProps = NativeStackScreenProps<NavigatorParamList, 'EditExercisePage'>;

// const emptySet = {};

// data validation
// sets 999
// rpe 0-10
// 0-100

// Default ExerciseItem data
const createEmptySet = (id: number) => ({ id, reps: '', rpe: '', orm: '', warmup: false });
const createEmptyRest = (id: number) => ({ id, minutes: '', seconds: '' });
const createEmptyNote = (id: number) => ({ id, text: '' });

// TODO: Append rests or sets, not just sets
const EditExercisePage: React.FC<EditExercisePageProps> = ({ route }) => {
  const { exerciseName, editableWorkoutId } = route.params;
  const [exerciseItems, setExerciseItems] = useState<EditableExerciseItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  // Card Operations
  const updateCard = async (id, property, val) => {
    const _exerciseItems = exerciseItems.map((item) => {
      if (item.id === id) {
        const _set = { ...item };
        _set[property] = val;
        return _set;
      }
      return item;
    });

    setExerciseItems(_exerciseItems);
    updateEditableExercise({
      editableWorkoutId,
      exerciseName,
      payload: {
        exerciseItems: _exerciseItems,
      },
    });
  };

  const duplicateCard = (id) => {
    if (id === undefined) {
      throw 'ExerciseItem id not given';
    }
    const _exerciseItems: EditableExerciseItem[] = [];
    let acc = 0;
    for (let i = 0; i < exerciseItems.length; i++) {
      const item = exerciseItems[i];
      if (item.id === id) {
        item.id = acc;
        _exerciseItems.push({ ...exerciseItems[i] });
        acc++;
      }

      item.id = acc;
      _exerciseItems.push(exerciseItems[i]);
      acc++;
    }
    setExerciseItems(_exerciseItems);
    updateEditableExercise({
      editableWorkoutId,
      exerciseName,
      payload: {
        exerciseItems: _exerciseItems,
      },
    });
  };

  const deleteCard = (id) => {
    if (id === undefined) {
      throw 'ExerciseItem id not given';
    }

    const _exerciseItems: EditableExerciseItem[] = [];
    let acc = 0;
    for (let i = 0; i < exerciseItems.length; i++) {
      const item = exerciseItems[i];
      if (item.id === id) {
        continue;
      }

      item.id = acc;
      _exerciseItems.push(exerciseItems[i]);
      acc++;
    }
    setExerciseItems(_exerciseItems);
    updateEditableExercise({
      editableWorkoutId,
      exerciseName,
      payload: {
        exerciseItems: _exerciseItems,
      },
    });
  };

  const cardProps = { deleteCard, duplicateCard };

  const appendEmptySet = () =>
    setExerciseItems([...exerciseItems, createEmptySet(exerciseItems.length)]);

  const appendEmptyRest = () =>
    setExerciseItems([...exerciseItems, createEmptyRest(exerciseItems.length)]);

  const appendEmptyNote = () =>
    setExerciseItems([...exerciseItems, createEmptyNote(exerciseItems.length)]);

  const reorderExerciseItems = (reorder: EditableExerciseItem[]) => {
    setExerciseItems(reorder);
    updateEditableExercise({
      editableWorkoutId,
      exerciseName,
      payload: {
        exerciseItems: reorder,
      },
    });
  };

  useEffect(() => {
    const fetchSets = async () => {
      const exercise = await getEditableExercise({ exerciseName, editableWorkoutId });
      setExerciseItems(exercise ? exercise.exerciseItems : []);
      setLoading(false);
    };

    fetchSets().catch(console.error);
  }, []);

  const renderItem = ({ item, drag, isActive }) => {
    // Identify card by property
    let Card = <></>;
    if (item.reps !== undefined) {
      Card = (
        <SetCard
          reps={item.reps}
          setReps={(val) => updateCard(item.id, 'reps', val)}
          rpe={item.rpe}
          setRpe={(val) => updateCard(item.id, 'rpe', val)}
          orm={item.orm}
          setOrm={(val) => updateCard(item.id, 'orm', val)}
          warmupSet={item.warmup}
          setWarmupSet={(val) => updateCard(item.id, 'warmup', val)}
          id={item.id}
          {...cardProps}
        />
      );
    } else if (item.minutes !== undefined) {
      Card = (
        <RestCard
          minutes={item.minutes}
          setMinutes={(val) => updateCard(item.id, 'minutes', val)}
          seconds={item.seconds}
          setSeconds={(val) => updateCard(item.id, 'seconds', val)}
          id={item.id}
          {...cardProps}
        />
      );
    } else if (item.text !== undefined) {
      Card = (
        <NoteCard
          text={item.text}
          setText={(val) => updateCard(item.id, 'text', val)}
          id={item.id}
          {...cardProps}
        />
      );
    } else {
      throw "Can't identify ExerciseItem in renderItem";
    }

    return (
      <ScaleDecorator>
        <TouchableOpacity accessibilityRole="button" onLongPress={drag} disabled={isActive}>
          <View className="py-2">{Card}</View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorScreen}>
        <TouchableWithoutFeedback
          accessibilityRole="button"
          onPress={Keyboard.dismiss}
          disabled={loading}
        >
          <View className="h-full bg-white p-10 px-5">
            <DraggableFlatList
              data={exerciseItems}
              onDragEnd={({ data }) => reorderExerciseItems(data)}
              keyExtractor={(item) => '' + item.id}
              renderItem={renderItem}
            />
          </View>
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView enabled={!loading}>
          <AddButton onPress={() => setModalVisible(true)} />
          <CardCreationModal
            visible={modalVisible}
            setVisible={setModalVisible}
            newNote={appendEmptyNote}
            newRest={appendEmptyRest}
            newSet={appendEmptySet}
          />
        </KeyboardAvoidingView>
        <Spinner visible={loading} />
      </ErrorBoundary>
    </>
  );
};

export default EditExercisePage;
