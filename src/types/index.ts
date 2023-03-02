export type EditableExerciseItem = ExerciseSet | ExerciseRest | ExerciseNote;

export interface EditableExercise {
  exerciseName: string; // Primary Key, Relation
  editableWorkoutId: string; // Primary Key, Relation
  created_by: string; // Relation to Profile uid
  created_at: Date;
  exerciseItems: EditableExerciseItem[];
}

export interface ExerciseSet {
  id: number;
  reps: string;
  rpe: string; // Rating of Perceived Exertion
  orm: string; // One Rep Max
  warmup: boolean;
}

export interface ExerciseRest {
  id: number;
  minutes: string;
  seconds: string;
}

export interface ExerciseNote {
  id: number;
  text: string;
}

export interface EditableWorkout {
  id: string; // Primary Key
  name: string;
  created_by: string; // Relation to Profile uid
  created_at: Date;
  exercises: string[];
}

export interface ConsumableExerciseData {
  reps: string;
  weight: string;
  bodyweight: boolean;
}

export interface ConsumableExerciseItem {
  data?: ConsumableExerciseData;
  ref: EditableExerciseItem; // contains the reference editable exercise
}

export interface ConsumableExercise {
  exerciseName: string; // Primary Key, Relation
  consumableWorkoutId: string; // Primary Key, Relation
  created_by: string; // Relation
  created_at: Date;
  exerciseItems: ConsumableExerciseItem[];
}

export interface ConsumableWorkout {
  id: string; // Primary Key
  created_by: string; // Relation
  name: string;
  created_at: Date;
  started_at: Date;
  ended_at: Date | null;
  exercises: string[];
}

export type ProfileType = {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  website?: string;
  bodyweight?: number;
};
