import { ChartDataPoint } from 'react-native-responsive-linechart';
import { ConsumableExercise } from '../types';
import { getConsumableExercises } from './db/consumableexercises';
import { isCompletedSet, milliToDays } from './parsing';

export const enum MetricType {
  INTENSITY = 'intensity',
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
  graphData: ChartDataPoint[];
}

export type AnalyticsSelector = ({
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
  const sets = exercise.exerciseItems.filter(isCompletedSet).map((set) => {
    const k = brzyckiOneRepMax(
      parseFloat(set.data?.weight || '0'),
      parseFloat(set.data?.reps || '0')
    );
    return k;
  });
  return Math.max(0, ...sets);
};

/**
 * Max Weight used in all sets
 * @param exercise
 * @returns
 */
export const calculateTotalVolume = (exercise: ConsumableExercise): number => {
  const volume = exercise.exerciseItems
    .filter(isCompletedSet)
    .map((set) => parseFloat(set.data?.weight || '0') * parseInt(set.data?.reps || '0'))
    .reduce((acc, vol) => acc + vol);
  return volume;
};

export const calculateMaxWeight = (exercise: ConsumableExercise): number => {
  const sets = exercise.exerciseItems
    .filter(isCompletedSet)
    .map((set) => parseFloat(set.data?.weight || '0'));
  return Math.max(0, ...sets);
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

  return (({ metricType, timeframe }: { metricType: MetricType; timeframe: Timeframe }) => {
    const analytics: ExerciseAnalytics = {
      exerciseName,
      metricType,
      graphData: exercises
        .map((exercise) => {
          const exerciseDate = new Date(exercise.created_at);
          const dayDiff = milliToDays(today.getTime() - exerciseDate.getTime());
          return {
            ...exercise,
            dayDiff,
          };
        })
        .filter(({ dayDiff }) => {
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
            x: timeframe - exercise.dayDiff,
            y: value,
          };
        }),
    };

    return analytics;
  }) as AnalyticsSelector;
};
