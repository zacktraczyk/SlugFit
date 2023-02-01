import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useState } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AddButton from '../../components/AddButton';
import SetCard from '../../components/SetCard';
import { updateExerciseInWorkout, useEditableWorkout } from '../../hooks/useEditableWorkout';
import useSelectedWorkout from '../../hooks/useSelectedWorkout';
import { Exercise } from '../../types/Exercise';
import { NavigatorParamList } from '../DrawerNavigator';

type EditExercisePageProps = NativeStackScreenProps<NavigatorParamList, 'EditExercisePage'>;

type Item = {
  key: number;
  reps: string;
  pre: string;
  orm: string;
};

const initialData: Item[] = [
  {
    key: 0,
    reps: '',
    pre: '',
    orm: '',
  },
];

const EditExercisePage: React.FC<EditExercisePageProps> = ({ navigation, route }) => {
  // console.log(route.);
  const [sets, setSets] = useState<Item[]>(initialData);

  const [selectedWorkout, setSelectedExercise] = useSelectedWorkout((state) => [
    state.workout,
    state.setExercise,
  ]);

  const { workout } = useEditableWorkout(selectedWorkout?.id);
  const [editingExercise, setEditingExercise] = useState<string | undefined>(undefined);

  const updateExercise = (identifier: string, exercise: Exercise) => {
    if (workout) {
      try {
        updateExerciseInWorkout(identifier, exercise, workout);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const updateSet = (key, property, val) => {
    setSets((_sets) =>
      _sets.map((set) => {
        if (set.key === key) {
          const _set = { ...set };
          _set[property] = val;
          return _set;
        }
        return set;
      })
    );
  };

  const appendEmptySet = () => {
    setSets([...sets, { key: sets.length, reps: '', pre: '', orm: '' }]);
  };

  const editExerciseBlock = async () => {
    if (selectedWorkout) {
      await updateExerciseInWorkout(
        PLACEHOLDER_EXERCISE_NAME,
        { name: PLACEHOLDER_EXERCISE_NAME, sets: [] },
        selectedWorkout
      );
      setEditingExercise(PLACEHOLDER_EXERCISE_NAME);
    }
  };

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity accessibilityRole="button" onLongPress={drag} disabled={isActive}>
          <View className="py-2">
            <SetCard
              reps={item.reps}
              setReps={(val) => updateSet(item.key, 'reps', val)}
              pre={item.pre}
              setPre={(val) => updateSet(item.key, 'pre', val)}
              orm={item.orm}
              setOrm={(val) => updateSet(item.key, 'orm', val)}
            />
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <>
      <TouchableWithoutFeedback accessibilityRole="button" onPress={Keyboard.dismiss}>
        <View className="h-full p-10 px-5">
          <DraggableFlatList
            data={sets}
            onDragEnd={({ data }) => setSets(data)}
            keyExtractor={(item) => '' + item.key}
            renderItem={renderItem}
          />
          {/* <Button title="new set" onPress={() => appendSet()} /> */}
        </View>
      </TouchableWithoutFeedback>
      <AddButton onPress={() => appendEmptySet()} />
    </>
  );
};

export default EditExercisePage;
