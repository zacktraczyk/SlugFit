import { ConsumableExercise } from '../types';
import { getConsumableExercises } from './db/consumableexercises';
import { isCompletedSet, milliToDays } from './parsing';

export const enum MetricType {
  INTENSITY = 'intenstiy',
  WEIGHT = 'weight',
  VOLUME = 'volume',
}

export enum Timeframe {
  WEEK = 7,
  MONTH = 31,
  THREE_MONTHS = 90,
  SIX_MONTHS = 180,
  YEAR = 365,
}

export interface ExerciseAnalytics {
  exerciseName: string;
  metricType: MetricType;
  graphData: Array<{
    date: Date;
    value: number;
  }>;
}

type AnalyticsSelector = ({
  metricType,
  timeframe,
}: {
  metricType: MetricType;
  timeframe: Timeframe;
}) => ExerciseAnalytics;

/**
 * Using Brzycki Formula
 * https://en.wikipedia.org/wiki/One-repetition_maximum
 * @param w weight
 * @param r reps
 * @returns one rep max
 */
const brzyckiOneRepMax = (w: number, r: number): number => {
  return w / (1.0278 - 0.0278 * r);
};

/**
 * Volume = weight * reps
 * @param exercise
 * @returns
 */
export const calculateMaxIntensity = (exercise: ConsumableExercise): number => {
  const sets = exercise.exerciseItems
    .filter(isCompletedSet)
    .map((set) => brzyckiOneRepMax(Number(set.data?.weight), Number(set.data?.reps)));
  return Math.max(...sets);
};

/**
 * Max Weight used in all sets
 * @param exercise
 * @returns
 */
export const calculateTotalVolume = (exercise: ConsumableExercise): number => {
  const volume = exercise.exerciseItems
    .filter(isCompletedSet)
    .map((set) => Number(set.data?.weight) * Number(set.data?.reps))
    .reduce((acc, vol) => acc + vol);
  return volume;
};

export const calculateMaxWeight = (exercise: ConsumableExercise): number => {
  const sets = exercise.exerciseItems.filter(isCompletedSet).map((set) => Number(set.data?.weight));
  return Math.max(...sets);
};

export const getAnalyticsForExercise = async ({
  exerciseName,
  userId,
}): Promise<AnalyticsSelector> => {
  const exercises: ConsumableExercise[] = await getConsumableExercises({
    userId,
    exerciseName,
  });

  const today = new Date();

  return ({ metricType, timeframe }: { metricType: MetricType; timeframe: Timeframe }) => {
    const analytics: ExerciseAnalytics = {
      exerciseName,
      metricType,
      graphData: exercises
        .filter((exercise) => {
          const exerciseDate = new Date(exercise.created_at);
          const dayDiff = milliToDays(today.getTime() - exerciseDate.getTime());
          return dayDiff <= timeframe;
        })
        .map((exercise) => {
          let value = 0;
          switch (metricType) {
            case MetricType.INTENSITY:
              value = calculateMaxIntensity(exercise);
              break;
            case MetricType.VOLUME:
              value = calculateTotalVolume(exercise);
              break;
            case MetricType.WEIGHT:
              value = calculateMaxWeight(exercise);
              break;
          }
          return {
            date: new Date(exercise.created_at),
            value,
          };
        }),
    };

    return analytics;
  };
};
