import { Exercise } from './Exercise';
export interface EditableWorkout {
  id: string;
  name?: string;
  created_by?: string;
  exercises?: Array<Exercise>;
}
