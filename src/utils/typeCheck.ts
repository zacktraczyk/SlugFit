import {
  ConsumableExercise,
  ConsumableExerciseItem,
  EditableExercise,
  EditableExerciseItem,
} from '../types';

export function isEditableExercise(obj: EditableExercise | ConsumableExercise) {
  return (
    'exerciseName' in obj &&
    'exerciseItems' in obj &&
    'created_by' in obj &&
    'created_at' in obj &&
    'editableWorkoutId' in obj
  );
}
export function isConsumableExercise(obj: EditableExercise | ConsumableExercise) {
  return (
    'exerciseName' in obj &&
    'exerciseItems' in obj &&
    'created_by' in obj &&
    'created_at' in obj &&
    'consumableWorkoutId' in obj
  );
}
export function isConsumableExerciseItem(obj: ConsumableExerciseItem | EditableExerciseItem) {
  return 'data' in obj && 'ref' in obj && (isSet(obj.ref) || isNote(obj.ref) || isRest(obj.ref));
}
export function isSet(obj: EditableExerciseItem) {
  return 'id' in obj && 'reps' in obj && 'rpe' in obj && 'orm' in obj && 'warmup' in obj;
}
export function isNote(obj: EditableExerciseItem) {
  return 'id' in obj && 'text' in obj;
}
export function isRest(obj: EditableExerciseItem) {
  return 'id' in obj && 'minutes' in obj && 'seconds' in obj;
}
