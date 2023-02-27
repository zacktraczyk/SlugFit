import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { NavigatorParamList } from './DrawerNavigator';
import { useConsumableWorkout } from '../hooks/useConsumableWorkout';
import { ConsumableExercise } from '../types';
import { getConsumableExercises } from '../utils/db/consumableexercises';
import { useAuth } from '../contexts/AuthProvider';
import { isSet } from '../utils/typeCheck';
import { formatLbs, getMaxIntensity, getMaxLbs, getTotalVolume } from '../utils/exerciseStats';

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
    <ScrollView className="flex h-full flex-col gap-3 bg-white p-3">
      <View>
        <Stats
          maxLb="Max Weight Used"
          maxIntensity="Max Intensity (1 Rep Max Calculation)"
          totalVolume="Total Volume (Total Reps * Weight)"
        />
      </View>

      {consumableWorkout &&
        exercises?.map((exercise, i) => {
          return (
            <View
              className="my-4 flex flex-row items-center rounded-xl border border-gray-100 bg-white py-5 px-2 shadow"
              key={i}
            >
              <View className="">
                <View className="mb-1 flex flex-row items-start">
                  <Text className="w-20 text-left font-bebas">{exercise.exerciseName}</Text>
                  <View className="w-[5px]"></View>
                  <Text className="w-10 text-right font-bebas">Reps</Text>
                  <View className="h-0 w-3"></View>
                  <Text className="w-20 text-right font-bebas">Weight</Text>
                </View>
                {exercise.exerciseItems.map(({ data, ref }, j) => {
                  if (!isSet(ref)) return null;
                  return (
                    <View className="flex flex-row items-center py-1" key={j}>
                      <Text className="w-20 text-left font-bebas">Set {j + 1}</Text>
                      <View className="w-[5px]"></View>
                      <Text className="w-10 text-right font-bebas text-gray-500">{data?.reps}</Text>
                      <View className="w-3"></View>
                      <Text className="w-20 text-right font-bebas text-gray-500">
                        {data?.bodyweight ? 'Body' : data?.weight}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View className="ml-4">
                <Stats
                  maxLb={formatLbs(getMaxLbs(exercise.exerciseItems))}
                  maxIntensity={formatLbs(getMaxIntensity(exercise.exerciseItems))}
                  totalVolume={formatLbs(getTotalVolume(exercise.exerciseItems))}
                />
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

interface StatsProps {
  maxLb: string;
  maxIntensity: string;
  totalVolume: string;
}

const Stats: React.FC<StatsProps> = ({ maxLb, maxIntensity, totalVolume }) => {
  return (
    <View>
      <View className="flex flex-row pb-2">
        <View className="mr-3 flex w-10 items-center rounded bg-gray-300">
          <Text className="font-bebas text-lg">LB</Text>
        </View>
        <Text className="font-bebas text-lg">{maxLb}</Text>
      </View>
      <View className="flex flex-row pb-2">
        <View className="mr-3 flex w-10 items-center rounded bg-gray-300">
          <Text className="font-bebas text-lg">%</Text>
        </View>
        <Text className="font-bebas text-lg">{maxIntensity}</Text>
      </View>
      <View className="flex flex-row">
        <View className="mr-3 flex w-10 items-center rounded bg-gray-300">
          <Text className="font-bebas text-lg">VOL</Text>
        </View>
        <Text className="font-bebas text-lg">{totalVolume}</Text>
      </View>
    </View>
  );
};

export default WorkoutSummary;
