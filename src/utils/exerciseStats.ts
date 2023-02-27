import { ConsumableExerciseData, ConsumableExerciseItem } from '../types';
import { isSet } from './typeCheck';

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
export const getMaxLbs = (exercise: ConsumableExerciseItem[]): number => {
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
export const getMaxIntensity = (exercise: ConsumableExerciseItem[]): number => {
  let maxWeightSet: ConsumableExerciseData | undefined = undefined;

  exercise.forEach((item) => {
    if (isSet(item.ref)) {
      if (item.data?.bodyweight) {
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
    return -1;
  }

  const { weight, reps } = maxWeightSet as ConsumableExerciseData;
  return Math.round(Number(weight) * (36 / (37 - Number(reps)))) || 0;
};

/**
 * Get Total Volume of an exercise
 *
 * @param {ConsumableExerciseItem[]} exercise an exercise
 * @returns {number} total volume in pounds (-1 if bodyweight)
 */
export const getTotalVolume = (exercise: ConsumableExerciseItem[]): number => {
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
