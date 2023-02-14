import { Exercise, Set, Note, Rest } from '../types';

export function isExercise(obj: any) {
  return 'name' in obj && 'items' in obj;
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
