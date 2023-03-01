/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import NoteBlock from './blocks/ExerciseNoteBlock';
import RestBlock from './blocks/ExerciseRestBlock';
import SetBlock from './blocks/ExerciseSetBlock';
import {
  ConsumableExerciseData,
  EditableExerciseItem,
  ConsumableExerciseItem,
  ConsumableExercise,
} from '../types';
import { isSet } from '../utils/typeCheck';
import { useConsumableExercise } from '../hooks/useConsumableExercise';
import { updateConsumableExercise } from '../utils/db/consumableexercises';

/**
 * @param exercise inputs value to a card
 * @param getUserRecordedSets returns array of user input RecordedValue or undefined if user fails to fil out all values
 */
export interface ConsumableExerciseCardProps {
  exerciseName: string;
  consumableWorkoutId: string;
}

const ConsumableExerciseCard: React.FC<ConsumableExerciseCardProps> = ({
  exerciseName,
  consumableWorkoutId,
}) => {
  const { consumableExercise } = useConsumableExercise(exerciseName, consumableWorkoutId);
  const [exercise, setExercise] = useState<Partial<ConsumableExercise>>(consumableExercise);
  const [rerender, setRerender] = useState(false);
  const [exerciseItems, setExerciseItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setExercise(consumableExercise);
  }, [consumableExercise]);

  useEffect(() => {
    let numWarmups = 0;
    let numWorking = 0;
    setExerciseItems(
      exercise.exerciseItems?.map((item: ConsumableExerciseItem, index: number) => {
        const { ref, data } = item;
        if ('warmup' in ref && 'reps' in ref && data) {
          return (
            <SetBlock
              key={index}
              index={index}
              setNumber={'warmup' in ref && ref.warmup ? ++numWarmups : ++numWorking}
              setRef={ref}
              reps={data?.reps}
              weight={data?.weight}
              bodyweight={data?.bodyweight}
              onChange={updateExerciseCardItem}
            />
          );
        } else if ('minutes' in ref && 'seconds' in ref) {
          return <RestBlock key={index} minutes={ref.minutes} seconds={ref.seconds} />;
        } else {
          return <NoteBlock key={index} note={'text' in ref ? ref.text : ''} />;
        }
      }) || []
    );
  }, [exercise, rerender]);

  // Load font
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  // Load font
  useFonts({
    BebasNeue_400Regular,
  });

  const updateExerciseCardItem = (index, payload: Partial<ConsumableExerciseData>) => {
    setExercise((oldExercise) => {
      if (oldExercise.exerciseItems) {
        const oldData = oldExercise.exerciseItems[index].data;
        oldExercise.exerciseItems[index].data = {
          reps: oldData?.reps || '0',
          weight: oldData?.weight || '0',
          bodyweight: oldData?.bodyweight || false,
          ...payload,
        };
      }
      updateConsumableExercise({ consumableWorkoutId, exerciseName, payload: oldExercise });
      return oldExercise;
    });
    setRerender((_rerender) => !_rerender);
  };

  return (
    <ScrollView className="h-full w-full flex-1 bg-white p-4">
      <View className="mb-2 h-10 w-full flex-row content-evenly justify-between border-b border-slate-200">
        <Text className="m-1 mt-3 ml-3 text-center font-bold">{exercise.exerciseName}</Text>
        {/* <Text style={currentSetsDone==maxSets.current?styling.greenText:styling.redText} className="m-1 mt-3 mr-3 font-bold"> {currentSetsDone} / {maxSets.current} Sets Done</Text> */}
      </View>
      {exerciseItems}
    </ScrollView>
  );
};

const styling = StyleSheet.create({
  container: {
    height: '90%',
  },
  greenText: {
    color: '#3BD15E',
  },
  redText: {
    color: '#ED4E39',
  },
});

/**
 * helper function
 * @param arr array of exercise items
 * @returns number of working sets
 */
function calculateNumWorkingSets(arr: EditableExerciseItem[]): number {
  let numWorkingSets = 0;
  for (let i = 0; i < arr.length; i++) {
    if (isSet(arr[i])) {
      if (!arr[i].warmup) {
        numWorkingSets++;
      }
    }
  }
  return numWorkingSets;
}

/**
 * helper function
 * @param arr array of exercise items
 * @returns number of working sets + warmup sets
 */
function calculateNumSets(arr: EditableExerciseItem[]): number {
  let numSets = 0;
  for (let i = 0; i < arr.length; i++) {
    if (isSet(arr[i])) {
      numSets++;
    }
  }
  return numSets;
}

export default ConsumableExerciseCard;
