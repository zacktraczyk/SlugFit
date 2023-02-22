import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { NavigatorParamList } from './DrawerNavigator';
import { useConsumableWorkout } from '../hooks/useConsumableWorkout';
import { ConsumableExercise } from '../types';
import { getConsumableExercises } from '../utils/db/consumableexercises';
import { useAuth } from '../contexts/AuthProvider';
import { isSet } from '../utils/typeCheck';

type ProfileProps = NativeStackScreenProps<NavigatorParamList, 'WorkoutSummary'>;

const WorkoutSummary: React.FC<ProfileProps> = ({ route }) => {
  const { consumableWorkoutId } = route.params;
  const { session } = useAuth();
  const { consumableWorkout } = useConsumableWorkout(consumableWorkoutId);

  const [exercises, setExercises] = useState<ConsumableExercise[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (!session) return;
      setExercises(await getConsumableExercises({ userId: session.user.id, consumableWorkoutId }));
    };
    fetch();
  }, [consumableWorkout, session]);

  return (
    <ScrollView className="flex h-full flex-col">
      <Text className="text-4xl">Good Stuff! 🎉</Text>
      {consumableWorkout &&
        exercises?.map((exercise, i) => {
          return (
            <View className="py-10" key={i}>
              <View className="mb-5 flex flex-row items-center gap-2">
                <Text className="w-20 text-right">{exercise.exerciseName}</Text>
                <View className="h-0 w-[110px] border"></View>
                <Text className="w-10 text-center">Reps</Text>
                <View className="h-0 w-3 border"></View>
                <Text className="w-10 text-center">Weight</Text>
              </View>
              {exercise.exerciseItems.map(({ data, ref }, j) => {
                if (!isSet(ref)) return null;
                return (
                  <View className="flex flex-row items-center gap-2 py-4" key={j}>
                    <Text className="w-20 text-right">Set {j + 1}</Text>
                    <View className="w-[110px]"></View>
                    <Text className="w-10 text-center">{data?.reps}</Text>
                    <View className="w-3"></View>
                    <Text className="w-10 text-center">{data?.weight}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
    </ScrollView>
  );
};

export default WorkoutSummary;
