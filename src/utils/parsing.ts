import { ConsumableWorkout } from '../types';

// count the # of completed/total sets in a workout
// iterates through a workout's exercises, keeping a running count

export const countSets = (workout: ConsumableWorkout) => {
  let done = 0;
  let total = 0;

  workout.exercises.map((currExercise) => {
    total += currExercise.sets.length;

    currExercise.sets.map((currSet) => {
      if (Number(currSet.reps) > 0) {
        done++;
      }
    });
  });

  return { done, total };
};
