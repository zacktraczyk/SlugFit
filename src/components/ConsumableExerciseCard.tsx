import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import NoteBlock from './blocks/ExerciseNoteBlock';
import RestBlock from './blocks/ExerciseRestBlock';
import SetBlock from './blocks/ExerciseSetBlock';
import {
  ConsumableExerciseData,
  ConsumableExerciseItem,
  ConsumableExercise,
  ExerciseSet,
  ExerciseRest,
} from '../types';
import { isRest, isSet } from '../utils/typeCheck';
import { getConsumableExercises } from '../utils/db/consumableexercises';
import PastWorkoutPerformance from './PastWorkoutPerformance';
import { formatDateTime } from '../utils/parsing';
import { LocalConsumableExercise, useActiveWorkout } from '../hooks/useActiveWorkout';

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
        if (isSet(ref)) {
          const set = ref as ExerciseSet;
          return (
            <SetBlock
              currentWorkoutKey={currentExercise.consumableWorkoutId || ''}
              workoutKey={selectedExercise.consumableWorkoutId || ''}
              key={index}
              index={index}
              setNumber={'warmup' in ref && ref.warmup ? ++numWarmups : ++numWorking}
              setRef={set}
              reps={data?.reps ?? ''}
              weight={data?.weight ?? ''}
              bodyweight={data?.bodyweight ?? false}
              onChange={updateExerciseCardItem}
            />
          );
        } else if (isRest(ref)) {
          const rest = ref as ExerciseRest;
          return <RestBlock key={index} minutes={rest.minutes} seconds={rest.seconds} />;
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

  const updateExerciseCardItem = (index: number, payload: ConsumableExerciseData) => {
    updateExerciseItem(exerciseName, index, payload);
    setRerender((_old) => !_old);
  };

  if (consumableExercise === undefined || consumableExercise === null) return null;

  return (
    <>
      <ScrollView className="bg-white h-full w-full flex-1 p-4 ">
        <View className="border-slate-200 mb-2 h-10 w-full flex-row content-evenly justify-between border-b">
          <Text className="m-1 mt-3 ml-3 text-center font-bold ">
            {selectedExercise.exerciseName}
          </Text>
          {/* <Text style={currentSetsDone==maxSets.current?styling.greenText:styling.redText} className="m-1 mt-3 mr-3 font-bold"> {currentSetsDone} / {maxSets.current} Sets Done</Text> */}
        </View>
        <View className="flex-row">
          {!closePastPerformance && (
            <TouchableOpacity
              accessibilityRole="button"
              className=" bg-gray-200 ml-2  rounded-lg"
              onPress={() => {
                setClosePastPerformance(true);
              }}
            >
              <Text className="text bg-gray-200 text-gray-500 m-1 mt-1 h-6 w-48 text-center font-bebas text-lg font-bold">
                View Past Performance
              </Text>
            </TouchableOpacity>
          )}

          {closePastPerformance && (
            <TouchableOpacity
              accessibilityRole="button"
              className=" bg-gray-200 ml-2  rounded-lg"
              onPress={() => {
                setClosePastPerformance(false);
                renderConsumableExerciseItems(selectedExercise);
                setIndex(0);
              }}
            >
              <Text
                className="text bg-gray-200 text-gray-500 m-1 mt-1 h-6 w-48 text-center font-bebas text-lg font-bold
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

export default ConsumableExerciseCard;
