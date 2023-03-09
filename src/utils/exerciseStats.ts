import { ChartDataPoint } from 'react-native-responsive-linechart';
import { ConsumableExercise, ConsumableExerciseData, ConsumableExerciseItem } from '../types';
import { getConsumableExercises } from './db/consumableexercises';
import { milliToDays } from './parsing';
import { isSet } from './typeCheck';

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
 * Format LBs string
 *
 * @param {number} lbs weight in pounds (-1 if bodyweight)
 * @returns {string} 'Body' or pounds (e.g. '100LB')
 */
export const formatLbs = (lbs: number): string => {
  if (isNaN(lbs)) {
    // console.error('lbs is not a number');
    return '';
  }

  if (lbs == -1) {
    return 'body';
  }

  return `${lbs}LBs`;
};

/**
 * Get maximum LBs lifted in an exercise
 *
 * Note: if given exercise contains both number and bodyweight reps, number
 * will always be the maximum
 *
 * @param {ConsumableExerciseItem[]} exercise an exercise
 * @returns {number} max pounds (-1 if bodyweight)
 */
export const calculateMaxWeight = (exercise: ConsumableExerciseItem[]): number => {
  let maxWeight = 0;
  let bodyWeight = false;

  exercise.forEach((item) => {
    if (isSet(item.ref)) {
      if (item.data?.bodyweight) {
        bodyWeight = true;
        return;
      }

      maxWeight = Math.max(maxWeight, Number(item.data?.weight ?? '0'));
    }
  });

  if (maxWeight == 0 && bodyWeight) {
    return -1;
  }

  return maxWeight;
};

/**
 * Get 1rm of an exercise using the Brzycki Formula
 *
 * @param {ConsumableExerciseItem[]} exercise an exercise
 * @returns {number} 1rm in pounds (-1 if bodyweight)
 */
export const calculateMaxIntensity = (exercise: ConsumableExerciseItem[]): number => {
  let maxWeightSet: ConsumableExerciseData | undefined = undefined;
  let bodyWeight = false;

  exercise.forEach((item) => {
    if (isSet(item.ref)) {
      if (item.data?.bodyweight) {
        bodyWeight = true;
        return;
      }

      if (maxWeightSet === undefined) {
        maxWeightSet = item.data;
      }

      if (Number(item.data?.weight) > Number(maxWeightSet?.weight)) {
        maxWeightSet = item.data;
      }
    }
  });

  // No non bodyweight exercises found
  if (maxWeightSet === undefined) {
    return bodyWeight ? -1 : 0;
  }

  const { weight, reps } = maxWeightSet as ConsumableExerciseData;
  return Math.round(Number(weight) / (1.0278 - 0.0278 * Number(reps))) || 0;
};

/**
 * Get Total Volume of an exercise
 *
 * @param {ConsumableExerciseItem[]} exercise an exercise
 * @returns {number} total volume in pounds (-1 if bodyweight)
 */
export const calculateTotalVolume = (exercise: ConsumableExerciseItem[]): number => {
  let totalVolume = 0;
  let bodyWeight = false;

  exercise.forEach((item) => {
    if (isSet(item.ref)) {
      if (item.data?.bodyweight) {
        bodyWeight = true;
        return;
      }

      totalVolume += Number(item.data?.reps) * Number(item.data?.weight);
    }
  });

  if (totalVolume == 0 && bodyWeight) {
    return -1;
  }

  return totalVolume || 0;
};

export const getAnalyticsForExercise = async (
  exerciseName: string,
  userId: string
): Promise<AnalyticsSelector> => {
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
              value = Math.max(0, calculateMaxIntensity(exercise.exerciseItems));
              break;
            case MetricType.VOLUME:
              value = Math.max(0, calculateTotalVolume(exercise.exerciseItems));
              break;
            case MetricType.WEIGHT:
              value = Math.max(0, calculateMaxWeight(exercise.exerciseItems));
              break;
          }
          return {
            x: timeframe - exercise.dayDiff,
            y: value,
            meta: exercise,
          };
        }),
    };

    return analytics;
  }) as AnalyticsSelector;
};
