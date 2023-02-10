import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AddButton from '../../components/AddButton';
import SetCard from '../../components/SetCard';
import { getExerciseInWorkout, updateExerciseInWorkout } from '../../utils/workouts';
import { NavigatorParamList } from '../DrawerNavigator';
import { ExerciseItem } from '../../types';
import RestCard from '../../components/RestCard';
import NoteCard from '../../components/NoteCard';

type EditExercisePageProps = NativeStackScreenProps<NavigatorParamList, 'EditExercisePage'>;

// const emptySet = {};

// data validation
// sets 999
// rpe 0-10
// 0-100

// Default ExerciseItem data
const createEmptySet = (id: number) => ({ id, reps: '', rpe: '', orm: '' });
const createEmptyRest = (id: number) => ({ id, minutes: '', seconds: '' });
const createEmptyNote = (id: number) => ({ id, text: '' });

// TODO: Append rests or sets, not just sets
const EditExercisePage: React.FC<EditExercisePageProps> = ({ route }) => {
  const { exerciseName, workoutId } = route.params;

  const [exerciseItems, setExerciseItems] = useState<ExerciseItem[]>([]);

  const updateCard = async (key, property, val) => {
    const _exerciseItems = exerciseItems.map((item) => {
      if (item.id === key) {
        const _set = { ...item };
        _set[property] = val;
        return _set;
      }
      return item;
    });

    setExerciseItems(_exerciseItems);
    updateExerciseInWorkout({ name: exerciseName, items: _exerciseItems }, workoutId);
  };

  const appendEmptySet = () =>
    setExerciseItems([...exerciseItems, createEmptySet(exerciseItems.length)]);

  const appendEmptyRest = () =>
    setExerciseItems([...exerciseItems, createEmptyRest(exerciseItems.length)]);

  const appendEmptyNote = () =>
    setExerciseItems([...exerciseItems, createEmptyNote(exerciseItems.length)]);

  const reorderExerciseItems = (reorder: ExerciseItem[]) => {
    setExerciseItems(reorder);
    updateExerciseInWorkout({ name: exerciseName, items: reorder }, workoutId);
  };

  useEffect(() => {
    const fetchSets = async () => {
      const exercise = await getExerciseInWorkout(exerciseName, workoutId);
      setExerciseItems(exercise ? exercise.items : []);
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
        />
      );
    } else if (item.minutes !== undefined) {
      Card = (
        <RestCard
          minutes={item.minutes}
          setMinutes={(val) => updateCard(item.id, 'minutes', val)}
          seconds={item.seconds}
          setSeconds={(val) => updateCard(item.id, 'seconds', val)}
        />
      );
    } else if (item.text !== undefined) {
      Card = <NoteCard text={item.text} setText={(val) => updateCard(item.id, 'text', val)} />;
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
      <TouchableWithoutFeedback accessibilityRole="button" onPress={Keyboard.dismiss}>
        <View className="h-full bg-white p-10 px-5">
          <DraggableFlatList
            data={exerciseItems}
            onDragEnd={({ data }) => reorderExerciseItems(data)}
            keyExtractor={(item) => '' + item.id}
            renderItem={renderItem}
          />
        </View>
      </TouchableWithoutFeedback>
      <AddButton onPress={() => appendEmptySet()} />
      {/* <AddButton onPress={() => appendEmptyRest()} /> */}
      {/* <AddButton onPress={() => appendEmptyNote()} /> */}
    </>
  );
};

export default EditExercisePage;
