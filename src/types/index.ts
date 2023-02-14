// Exercise
export interface Exercise {
  name: string;
  items: ExerciseItem[];
}

export type ExerciseItem = Set | Rest | Note;

export interface Set {
  id: number;
  reps: string;
  rpe: string; // Rating of Perceived Exertion
  orm: string; // One Rep Max
}

export interface Rest {
  id: number;
  minutes: string;
  seconds: string;
}

export interface Note {
  id: number;
  text: string;
}

export interface EditableWorkout {
  id: string;
  name?: string;
  created_by?: string;
  exercises?: Exercise[];
}

export interface ConsumableSet {
  reps?: number;
  weight?: number;
  bodyweight?: boolean;
  ref: Set; // The reference set, i.e. the prescribed reps, rpe, and %orm
}

export interface ConsumableExercise {
  name: string;
  sets: ConsumableSet[];
}

/**
 * Example ConsumableWorkout with one exercise and one set
 * {
 *  id: 'xC12ilA201P'
 *  name: 'Back and Bis',
 *  created_by: 'uid12345',
 *  exercises: [
 *    {
 *      name: 'Pullups',
 *      sets: [
 *        reps: 0,
 *        weight: 0,
 *        bodyweight: false,
 *        ref: {
 *          key: 0,
 *          reps: 12,
 *          rpe: 7,
 *          orm: 75
 *        }
 *      ]
 *    }
 *  ]
 * }
 */
export interface ConsumableWorkout {
  id: string;
  name?: string;
  created_by?: string;
  started_at?: Date;
  ended_at?: Date;
  exercises?: ConsumableExercise[];
}

export type ConsumableWorkoutTemplate = Omit<ConsumableWorkout, 'id'>;

export const PLACEHOLDER_EXERCISE_NAME = 'placeholder';
