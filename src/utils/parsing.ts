import { ConsumableExercise, ConsumableExerciseItem, ConsumableWorkout } from '../types';
import { isSet } from './typeCheck';
import { getConsumableExercise } from './db/consumableexercises';
import { LocalConsumableExercise } from '../hooks/useActiveWorkout';

export const AbbreviatedMonths = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUNE',
  'JULY',
  'AUG',
  'SEPT',
  'OCT',
  'NOV',
  'DEC',
];

export const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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

/**
 * Count non-empty exercise sets in a consumable exercise
 *
 * @param {ConsumableExerciseItem[]} exercise
 * @returns {number} number of sets started
 */
export const countStartedSetsInConsumableExercise = (
  exercise: ConsumableExerciseItem[]
): number => {
  let startedSets = 0;
  exercise.forEach((item) => {
    if (!isSet(item.ref)) return;
    startedSets += item.data?.reps ? 1 : 0;
  });

  return startedSets;
};

/**
 * Checks if a ConsumedExercise has non-empty sets
 *
 * @param {ConsumableExercise} exercise
 * @returns {boolean} true if at least 1 non-empty set in exercise
 */
export const isConsumableExerciseEmpty = (
  exercise: ConsumableExercise | LocalConsumableExercise
): boolean => {
  return countStartedSetsInConsumableExercise(exercise.exerciseItems) == 0;
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

export const formatDate = (date: Date | undefined | null, useFull = false) => {
  if (date === undefined || date === null) return '';
  date = new Date(date);
  const month = useFull ? Months[date.getMonth()] : AbbreviatedMonths[date.getMonth()];

  const day = date.getDate().toString();
  const year = date.getFullYear().toString();

  return month + ' ' + day + ', ' + year;
};
export const formatDateTime = (date: Date | undefined | null) => {
  if (date === undefined || date === null) return '';
  date = new Date(date);
  return date.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
};

export const milliToDays = (milliseconds: number) => milliseconds / 1000 / 60 / 60 / 24;

export const timeBetween = (d1: Date, d2: Date) => {
  let seconds = (new Date(d2).getTime() - new Date(d1).getTime()) / 1000;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  seconds = Math.floor(seconds);
  return { hours, minutes, seconds };
};

export const formattedTimeBetween = (d1: Date, d2: Date) => {
  const { hours: _h, minutes: _m, seconds: _s } = timeBetween(d1, d2);

  return {
    hours: _h.toString().padStart(1, '0'),
    minutes: _m.toString().padStart(2, '0'),
    seconds: _s.toString().padStart(2, '0'),
  };
};

export const formattedTimeBetweenToString = (d1: Date, d2: Date) => {
  const { hours, minutes, seconds } = formattedTimeBetween(d1, d2);

  return `${hours !== '0' ? hours + ':' : ''}${minutes}:${seconds}`;
};
