export interface EditableWorkout {
  id: string;
  name?: string;
  created_by?: string;
  exercises?: Array<object>;
}
