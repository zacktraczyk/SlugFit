export function isEditableExercise(obj: any) {
  return (
    'exerciseName' in obj &&
    'exerciseItems' in obj &&
    'created_by' in obj &&
    'created_at' in obj &&
    'editableWorkoutId' in obj
  );
}
export function isConsumableExercise(obj: any) {
  return (
    'exerciseName' in obj &&
    'exerciseItems' in obj &&
    'created_by' in obj &&
    'created_at' in obj &&
    'consumableWorkoutId' in obj
  );
}
export function isConsumableExerciseItem(obj: any) {
  return 'data' in obj && 'ref' in obj && (isSet(obj.ref) || isNote(obj.ref) || isRest(obj.ref));
}
export function isSet(obj: any) {
  return 'id' in obj && 'reps' in obj && 'rpe' in obj && 'orm' in obj && 'warmup' in obj;
}
export function isNote(obj: any) {
  return 'id' in obj && 'text' in obj;
}
export function isRest(obj: any) {
  return 'id' in obj && 'minutes' in obj && 'seconds' in obj;
}
