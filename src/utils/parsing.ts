import { ConsumableExercise, ConsumableWorkoutTemplate, EditableWorkout } from '../types';

export const fromEditableWorkout = (workout: EditableWorkout): ConsumableWorkoutTemplate => {
  const consumable: ConsumableWorkoutTemplate = {
    name: workout.name,
    exercises: [],
  };

  workout.exercises?.map((_exercise) => {
    const exercise: ConsumableExercise = { name: _exercise.name, sets: [] };

    _exercise.sets?.map((_set) => {
      const set = { ref: _set };
      exercise.sets.push(set);
    });

    consumable.exercises?.push(exercise);
  });

  return consumable;
};
