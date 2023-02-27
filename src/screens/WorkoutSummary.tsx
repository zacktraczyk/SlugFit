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
    <ScrollView className="flex h-full flex-col bg-white p-3">
      <OverallStats
        maxLb="Max Weight Used"
        maxIntensity="Max Intensity (1 Rep Max Calculation)"
        totalVolume="Total Volume (Total Reps * Weight)"
      />

      {consumableWorkout &&
        exercises?.map((exercise, i) => {
          return <ConusmedExerciseStatsCard exercise={exercise} key={i} />;
        })}
    </ScrollView>
  );
};

interface StatsProps {
  maxLb: string;
  maxIntensity: string;
  totalVolume: string;
}

const OverallStats: React.FC<StatsProps> = ({ maxLb, maxIntensity, totalVolume }) => {
  return (
    <View>
      <View className="flex flex-row pb-2">
        <View className="mr-2 flex w-10 items-center rounded bg-gray-300">
          <Text className="font-bebas text-lg">LB</Text>
        </View>
        <Text className="font-bebas text-lg">{maxLb}</Text>
      </View>
      <View className="flex flex-row pb-2">
        <View className="mr-2 flex w-10 items-center rounded bg-gray-300">
          <Text className="font-bebas text-lg">%</Text>
        </View>
        <Text className="font-bebas text-lg">{maxIntensity}</Text>
      </View>
      <View className="flex flex-row">
        <View className="mr-2 flex w-10 items-center rounded bg-gray-300">
          <Text className="font-bebas text-lg">VOL</Text>
        </View>
        <Text className="font-bebas text-lg">{totalVolume}</Text>
      </View>
    </View>
  );
};

interface ConsumedExerciseStatsCard {
  exercise: ConsumableExercise;
}

const ConusmedExerciseStatsCard: React.FC<ConsumedExerciseStatsCard> = ({ exercise }) => {
  return (
    <View className="my-4 flex flex-row items-center rounded-xl border border-gray-100 bg-white py-5 px-2 shadow">
      <View className="">
        {/* Table Header */}
        <View className="mb-1 flex flex-row items-start">
          <Text className="w-[90px] text-left font-bebas">{exercise.exerciseName}</Text>
          <Text className="w-10 text-right font-bebas">Reps</Text>
          <Text className="w-20 text-right font-bebas">Weight</Text>
        </View>

        {/* Table Rows */}
        {exercise.exerciseItems.map(({ data, ref }, j) => {
          if (!isSet(ref)) return null;
          return (
            <View className="flex flex-row items-center py-1" key={j}>
              <Text className="w-[90px] text-left font-bebas">Set {j + 1}</Text>
              <Text className="w-10 text-right font-bebas text-gray-500">{data?.reps}</Text>
              <Text className="w-20 text-right font-bebas text-gray-500">
                {data?.bodyweight ? 'Body' : data?.weight}
              </Text>
            </View>
          );
        })}
      </View>

      <View className="ml-4">
        <OverallStats
          maxLb={formatLbs(getMaxLbs(exercise.exerciseItems))}
          maxIntensity={formatLbs(getMaxIntensity(exercise.exerciseItems))}
          totalVolume={formatLbs(getTotalVolume(exercise.exerciseItems))}
        />
      </View>
    </View>
  );
};
export default WorkoutSummary;
