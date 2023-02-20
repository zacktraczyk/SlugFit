import { Exercise } from '../types/Exercise';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';

type ProfileProps = NativeStackScreenProps<NavigatorParamList, 'Profile'>;

type ConsumedWorkout = {
  name: string;
  exercises: Exercise[];
  created_at: number;
  started_at: number;
  ended_at: number;
  // created_by: string; // UUID
};

const SampleConsumedWorkout: ConsumedWorkout = {
  name: 'Test Workout',
  exercises: [
    {
      name: 'Incline Bench',
      sets: [
        {
          key: 0,
          reps: '3',
          pre: '3',
          orm: '20',
        },
        {
          key: 0,
          reps: '5',
          pre: '3',
          orm: '20',
        },
      ],
    },
    {
      name: 'Pullups',
      sets: [
        {
          key: 0,
          reps: '3',
          pre: '3',
          orm: '20',
        },
      ],
    },
  ],
  created_at: Date.now(),
  started_at: Date.now(),
  ended_at: Date.now(),
  // created_by:
};

const WorkoutSummary: React.FC<ProfileProps> = () => {
  // const { consumedWorkoutId } = route.params;
  const [workout, setWorkout] = useState<ConsumedWorkout>(SampleConsumedWorkout);

  return (
    <View className="flex h-full flex-col items-center justify-center">
      <Text className="text-4xl">Good Stuff! 🎉</Text>
      {workout &&
        workout.exercises.map((exercise, i) => {
          return (
            <View className="py-10" key={i}>
              <View className="mb-5 flex flex-row items-center gap-2">
                <Text className="w-20 text-right">{exercise.name}</Text>
                <View className="h-0 w-[110px] border"></View>
                <Text className="w-10 text-center">Reps</Text>
                <View className="h-0 w-3 border"></View>
                <Text className="w-10 text-center">Pre</Text>
              </View>
              {exercise.sets.map((set, j) => {
                return (
                  <View className="flex flex-row items-center gap-2 py-4" key={j}>
                    <Text className="w-20 text-right">Set {j + 1}</Text>
                    <View className="w-[110px]"></View>
                    <Text className="w-10 text-center">{set.reps}</Text>
                    <View className="w-3"></View>
                    <Text className="w-10 text-center">{set.pre}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
    </View>
  );
};

export default WorkoutSummary;
