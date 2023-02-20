import { ConsumableExercise, ConsumableExerciseItem, EditableExercise } from '../types';
import { isSet } from './typeCheck';

export const isCompletedSet = (s: ConsumableExerciseItem) => {
  return isSet(s.ref) && s.data && s.data.reps !== undefined && s.data.reps !== null;
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
 * Takes an Editable Exercise and spits out a ConsumableExerciseTemplate form
 * @param editableExercise
 * @returns
 */
export const toConsumableExerciseTemplate = (
  editableExercise: EditableExercise
): Pick<ConsumableExercise, 'exerciseName' | 'exerciseItems'> => {
  return {
    exerciseName: editableExercise.exerciseName,
    exerciseItems: editableExercise.exerciseItems.map((item) => ({ data: {}, ref: item })),
  };
};
