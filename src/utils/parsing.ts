import { ConsumableExercise, ConsumableWorkoutTemplate, EditableWorkout } from '../types';

export const fromEditableWorkout = (workout: EditableWorkout): ConsumableWorkoutTemplate => {
  const consumable: ConsumableWorkoutTemplate = {
    name: workout.name,
    exercises: [],
  };

  workout.exercises?.map((_exercise) => {
    const exercise: ConsumableExercise = { name: _exercise.name, items: [] };

    _exercise.items?.map((_set) => {
      const set = { ref: _set };
      exercise.items.push(set);
    });

    consumable.exercises?.push(exercise);
  });

  return consumable;
};
