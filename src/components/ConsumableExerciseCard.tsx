import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
import { getConsumableExercises } from '../utils/db/consumableexercises';
import PastWorkoutPerformance from './PastWorkoutPerformance';
import { formatDateTime } from '../utils/parsing';
import { LocalConsumableExercise, useActiveWorkout } from '../hooks/useActiveWorkout';

/**
 * @param exercise inputs value to a card
 * @param getUserRecordedSets returns array of user input RecordedValue or undefined if user fails to fil out all values
 */
export interface ConsumableExerciseCardProps {
  exerciseName: string;
  userId: string;
}

const ConsumableExerciseCard: React.FC<ConsumableExerciseCardProps> = ({
  exerciseName,
  userId,
}) => {
  const [consumableExercise, updateExerciseItem] = useActiveWorkout((state) => [
    state.exercises.find((e) => e.exerciseName === exerciseName) as LocalConsumableExercise,
    state.updateExerciseItem,
  ]);
  const [selectedExercise, setExercise] = useState<Partial<ConsumableExercise>>(consumableExercise);
  const [rerender, setRerender] = useState(false);
  const [exerciseItems, setExerciseItems] = useState<JSX.Element[]>([]);
  const [pastExerciseVisible, setPastExerciseVisible] = useState(false);
  const [pastExercises, setPastExercises] = useState<ConsumableExercise[]>();
  const [index, setIndex] = useState(0);
  const [closePastPerformance, setClosePastPerformance] = useState(false);
  const getPastConsumableExercises = async () => {
    try {
      const data = await getConsumableExercises({ userId, exerciseName });
      setPastExercises(data.slice().reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setExercise(consumableExercise);
    getPastConsumableExercises();
    setIndex(0);
  }, [consumableExercise]);

  const renderConsumableExerciseItems = (currentExercise: Partial<ConsumableExercise>) => {
    if (currentExercise === undefined || currentExercise === null) return;
    let numWarmups = 0;
    let numWorking = 0;
    setExerciseItems(
      currentExercise.exerciseItems?.map((item: ConsumableExerciseItem, index: number) => {
        const { ref, data } = item;
        if ('warmup' in ref && 'reps' in ref && data) {
          return (
            <SetBlock
              currentWorkoutKey={currentExercise.consumableWorkoutId || ''}
              workoutKey={selectedExercise.consumableWorkoutId || ''}
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
  };

  useEffect(() => {
    renderConsumableExerciseItems(selectedExercise);
  }, [selectedExercise, rerender]);

  // Load font
  useFonts({
    BebasNeue_400Regular,
  });

  const updateExerciseCardItem = (index, payload: ConsumableExerciseData) => {
    updateExerciseItem(exerciseName, index, payload);
    setRerender((_old) => !_old);
  };

  if (consumableExercise === undefined || consumableExercise === null) return null;

  return (
    <>
      <ScrollView className="h-full w-full flex-1 bg-white p-4 ">
        <View className="mb-2 h-10 w-full flex-row content-evenly justify-between border-b border-slate-200">
          <Text className="m-1 mt-3 ml-3 text-center font-bold ">
            {selectedExercise.exerciseName}
          </Text>
          {/* <Text style={currentSetsDone==maxSets.current?styling.greenText:styling.redText} className="m-1 mt-3 mr-3 font-bold"> {currentSetsDone} / {maxSets.current} Sets Done</Text> */}
        </View>
        <View className="flex-row">
          {!closePastPerformance && (
            <TouchableOpacity
              accessibilityRole="button"
              className=" ml-2 rounded-lg  bg-gray-200"
              onPress={() => {
                setClosePastPerformance(true);
              }}
            >
              <Text className="text m-1 mt-1 h-6 w-48 bg-gray-200 text-center font-bebas text-lg font-bold text-gray-500">
                View Past Performance
              </Text>
            </TouchableOpacity>
          )}

          {closePastPerformance && (
            <TouchableOpacity
              accessibilityRole="button"
              className=" ml-2 rounded-lg  bg-gray-200"
              onPress={() => {
                setClosePastPerformance(false);
                renderConsumableExerciseItems(selectedExercise);
                setIndex(0);
              }}
            >
              <Text
                className="text m-1 mt-1 h-6 w-48 bg-gray-200 text-center font-bebas text-lg font-bold text-gray-500
                "
              >
                Close Past Performance
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => {
              setPastExerciseVisible(true);
              setClosePastPerformance(true);
              // {pastExercises &&(setIndex(pastExercises.length-1))
              // }
            }}
            className="bg-white"
          >
            {pastExercises && closePastPerformance && (
              <View className="mt-1">
                <Text className=" ml-2  text-center font-bebas text-lg font-bold ">
                  {closePastPerformance && pastExercises.length > 0
                    ? formatDateTime(pastExercises[index].created_at)
                    : formatDateTime(selectedExercise.created_at)}
                </Text>
              </View>
            )}
            {pastExerciseVisible && pastExercises && pastExercises.length > 0 && (
              <PastWorkoutPerformance
                index={index}
                setIndex={setIndex}
                consumableExercises={pastExercises}
                setModalVisible={(bool: boolean) => setPastExerciseVisible(bool)}
                renderConsumableExercise={renderConsumableExerciseItems}
              />
            )}
          </TouchableOpacity>
        </View>
        {exerciseItems}
      </ScrollView>
    </>
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
