import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItem, ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AddButton from '../../components/buttons/AddButton';
import SetCard from '../../components/blocks/SetCard';
import { NavigatorParamList } from '../DrawerNavigator';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import RestCard from '../../components/blocks/RestCard';
import NoteCard from '../../components/blocks/NoteCard';
import CardCreationModal from '../../components/modals/CardCreationModal';
import { EditableExerciseItem, ExerciseNote, ExerciseRest, ExerciseSet } from '../../types';
import { updateEditableExercise, getEditableExercise } from '../../utils/db/editableexercises';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorScreen from '../../components/ErrorScreen';
import { isSet, isNote, isRest } from '../../utils/typeCheck';

type EditExercisePageProps = NativeStackScreenProps<NavigatorParamList, 'EditExercisePage'>;

// Default ExerciseItem data
const createEmptySet = (id: number) => ({ id, reps: '', rpe: '', orm: '', warmup: false });
const createEmptyRest = (id: number) => ({ id, minutes: '', seconds: '' });
const createEmptyNote = (id: number) => ({ id, text: '' });

const EditExercisePage: React.FC<EditExercisePageProps> = ({ route }) => {
  const { exerciseName, editableWorkoutId } = route.params;
  const [exerciseItems, setExerciseItems] = useState<EditableExerciseItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Card Operations
  const updateCard = async (
    id: number,
    property: keyof ExerciseSet | keyof ExerciseNote | keyof ExerciseRest,
    val: string | boolean
  ) => {
    const _exerciseItems = exerciseItems.map((item) => {
      if (item.id === id) {
        const _exerciseItem = { ...item };
        _exerciseItem[property] = val;
        return _exerciseItem;
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

  const duplicateCard = (id: number) => {
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

  const deleteCard = (id: number) => {
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

  const renderItem: RenderItem<EditableExerciseItem> = ({ item, drag, isActive }) => {
    // Identify card by property
    let Card = <></>;
    if (isSet(item)) {
      const set = item as ExerciseSet;
      Card = (
        <SetCard
          {...set}
          setReps={(val) => updateCard(set.id, 'reps', val)}
          setRpe={(val) => updateCard(set.id, 'rpe', val)}
          setOrm={(val) => updateCard(set.id, 'orm', val)}
          warmupSet={set.warmup}
          setWarmupSet={(val) => updateCard(set.id, 'warmup', val)}
          {...cardProps}
        />
      );
    } else if (isRest(item)) {
      const rest = item as ExerciseRest;
      Card = (
        <RestCard
          {...rest}
          setMinutes={(val) => updateCard(rest.id, 'minutes', val)}
          setSeconds={(val) => updateCard(rest.id, 'seconds', val)}
          {...cardProps}
        />
      );
    } else if (isNote(item)) {
      const note = item as ExerciseNote;
      Card = (
        <NoteCard {...note} setText={(val) => updateCard(note.id, 'text', val)} {...cardProps} />
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

  useEffect(() => {
    const fetchSets = async () => {
      const exercise = await getEditableExercise({ exerciseName, editableWorkoutId });
      setExerciseItems(exercise ? exercise.exerciseItems : []);
      setLoading(false);
    };

    fetchSets().catch(console.error);
  }, []);

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
