import {
  ConsumableExercise,
  ConsumableExerciseItem,
  EditableExercise,
  ConsumableWorkout,
} from '../types';
import { isSet } from './typeCheck';
import { getConsumableExercise } from './db/consumableexercises';

export const isCompletedSet = (s: ConsumableExerciseItem) => {
  return (
    isSet(s.ref) &&
    s.data &&
    s.data.reps !== undefined &&
    s.data.reps !== null &&
    parseInt(s.data.reps) > 0
  );
};

/**
 * Count the # of completed and total sets in a ConsumableExercise
 * @param workout
 * @returns `{ done: Number, total: Number }`
 */
export const countSetsInConsumableExercise = (
  consumableExercise: ConsumableExercise
): { done: number; total: number } => {
  let done = 0;
  let total = 0;

  consumableExercise.exerciseItems.map((item: ConsumableExerciseItem) => {
    if (isSet(item.ref)) {
      total++;
      if (isCompletedSet(item)) done++;
    }
  });

  return { done, total };
};

/**
 * Counts all the sets in a Consumable Workout
 * @param consumableWorkout
 * @returns
 */
export const countSetsInConsumableWorkout = async (
  consumableWorkout: ConsumableWorkout
): Promise<{ done: number; total: number }> => {
  const promises: Promise<ConsumableExercise>[] = [];
  for (const exerciseName of consumableWorkout.exercises) {
    promises.push(
      getConsumableExercise({ exerciseName, consumableWorkoutId: consumableWorkout.id })
    );
  }
  const res = await Promise.all(promises);
  return res
    .map((consumableExercise) => countSetsInConsumableExercise(consumableExercise))
    .reduce(
      ({ done, total }, item) => {
        return { done: done + item.done, total: total + item.total };
      },
      { done: 0, total: 0 }
    );
};

export const formatDateToMMDDYYYY = (date: Date) => {
  date = new Date(date);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${month}/${day}/${year}`;
};

export const formatDateToISO = (date: Date) => {
  date = new Date(date);
  return date.toISOString().split('T')[0];
};

// format workout's completion date into: MMM DD, YYYY
// breaks down "ended_at" attribute into month, date, & year
// month is converted from numeric to string abreviation, ie. 01 -> JAN

export const formatDate = (date) => {
  if (date === undefined || date === null) return '';
  date = new Date(date);
  let month = '';

  switch (date.getMonth().toString()) {
    case '0':
      month = 'JAN';
      break;
    case '1':
      month = 'FEB';
      break;
    case '2':
      month = 'MAR';
      break;
    case '3':
      month = 'APR';
      break;
    case '4':
      month = 'MAY';
      break;
    case '5':
      month = 'JUNE';
      break;
    case '6':
      month = 'JULY';
      break;
    case '7':
      month = 'AUG';
      break;
    case '8':
      month = 'SEPT';
      break;
    case '9':
      month = 'OCT';
      break;
    case '10':
      month = 'NOV';
      break;
    default:
      month = 'DEC';
  }

  const day = date.getDate().toString();
  const year = date.getFullYear().toString();

  return month + ' ' + day + ', ' + year;
};

export const milliToDays = (milliseconds: number) => milliseconds / 1000 / 60 / 60 / 24;
