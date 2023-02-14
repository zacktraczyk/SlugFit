import { supabase } from './supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { ConsumableWorkout, ConsumableWorkoutTemplate, EditableWorkout, Exercise } from '../types';
import { DuplicateExerciseError, ExerciseNotFoundError, UnauthenticatedError } from '../errors';
import { fromEditableWorkout } from './parsing';

/**
 *
 * @param userId Id of the current user
 * @returns An array of Editable Workouts
 */
export const getEditableWorkoutsByUserId = async (userId: string): Promise<EditableWorkout[]> => {
  const { data, error } = await supabase
    .from('workouts')
    .select(`id, name`)
    .eq('created_by', userId);
  if (error) throw error;
  return data;
};

/**
 * Create a new EditableWorkout in supabase and get the auto generated id
 * @param session Current session -- from the AuthProvider context
 * @returns An `EditableWorkout`
 * @throws `PostgresError` or `UnauthenticatedError`
 */
export const createEditableWorkout = async (
  session: Session | null
): Promise<EditableWorkout | undefined> => {
  if (session === undefined || session === null)
    throw new UnauthenticatedError('Cannot create a workout with no active user session.');

  const user: User = session.user;

  const { data, error } = await supabase
    .from('workouts')
    .insert({ name: '', created_by: user.id })
    .select(`id`)
    .single();
  if (error) throw error;

  return data as EditableWorkout;
};

/**
 * Returns an EditableWorkout from supabase
 * @param workoutId Id of the EditableWorkout
 * @returns An `EditableWorkout`
 * @throws `PostgresError`
 */
export const getEditableWorkout = async (workoutId: string): Promise<EditableWorkout> => {
  const { data, error } = await supabase.from('workouts').select('*').eq('id', workoutId).single();
  if (error) throw error;

  return data as EditableWorkout;
};

/**
 * Delete an EditableWorkout by id in supabase
 * @param workoutId Id of the EditableWorkout
 * @throws `PostgresError`
 */
export const deleteEditableWorkout = async (workoutId: string) => {
  const { error } = await supabase.from('workouts').delete().eq('id', workoutId);
  if (error) throw error;
};

/**
 * Updates an EditableWorkout in supabase
 * @param workoutId The id of the EditableWorkout to update
 * @param payload The updates to apply to the EditableWorkout
 * @throws `PostgresError`
 */
export const updateEditableWorkout = async (workoutId: string, payload: EditableWorkout) => {
  const { error } = await supabase.from('workouts').update(payload).eq('id', workoutId);
  if (error) throw error;
};

/**
 * Returns the exercises in an EditableWorkout from supabase
 * @param workoutId The id of the EditableWorkout
 * @returns Array of exercises
 * @throws `PostgresError`
 */
export const getExercisesInWorkout = async (workoutId: string): Promise<Exercise[]> => {
  const { error, data } = await supabase
    .from('workouts')
    .select('exercises')
    .eq('id', workoutId)
    .single();

  if (error) throw error;

  const exercises: Array<Exercise> = data.exercises;
  return exercises;
};

/**
 *  Returns a single exercise from an EditableWorkout in supabase by name
 * @param exerciseName
 * @param workoutId
 * @returns An `Exercise`
 * @throws `ExerciseNotFoundError`
 */
export const getExerciseInWorkout = async (
  exerciseName: string,
  workoutId: string
): Promise<Exercise> => {
  const exercises: Array<Exercise> = await getExercisesInWorkout(workoutId);

  for (let i = 0; i < exercises.length; i++) {
    if (exercises[i].name === exerciseName) {
      return exercises[i];
    }
  }

  throw new ExerciseNotFoundError('Cannot find exercise in current workout');
};

/**
 * Returns an array of exercises with the new exercise updates
 * @param exercise New `Exercise` object
 * @throws `PostgresError` or `ExerciseNotFoundError`
 */
export const updateExerciseInWorkout = async (exercise: Exercise, workoutId: string) => {
  const exercises: Array<Exercise> = await getExercisesInWorkout(workoutId);

  let found = false;
  for (let i = 0; i < exercises.length; i++) {
    if (exercises[i].name === exercise.name) {
      exercises[i] = exercise;
      found = true;
      break;
    }
  }
  if (!found) throw new ExerciseNotFoundError(`No exercise found with name ${exercise.name}`);

  const { error } = await supabase.from('workouts').update({ exercises }).eq('id', workoutId);
  if (error) throw error;
};

/**
 * Inserts an exercise into an EditableWorkout in supabase
 * @param exerciseName New exercise name to insert into the workout
 * @param workoutId The id of the `EditableWorkout`
 * @throws `PostgresError` or `DuplicateExerciseError
 */
export const insertExerciseIntoWorkout = async (exerciseName: string, workoutId: string) => {
  const exercises: Array<Exercise> = await getExercisesInWorkout(workoutId);

  const hasExerciseAlready = exercises.find((e) => e.name === exerciseName);

  if (hasExerciseAlready)
    throw new DuplicateExerciseError('Cannot add the same exercise to a workout');

  const exerciseToInsert = {
    name: exerciseName,
    items: [],
  } as Exercise;

  exercises.push(exerciseToInsert);

  const { error } = await supabase.from('workouts').update({ exercises }).eq('id', workoutId);
  if (error) throw error;
};

/**
 * Deletes an exercise in an editable workout in supabase
 * @param exerciseName name of the exercise to delete
 * @param workoutId Id of the EditableWorkout
 * @throws `PostgresError` or `ExerciseNotFoundError`
 */
export const deleteExerciseInWorkout = async (exerciseName: string, workoutId: string) => {
  const exercises: Array<Exercise> = await getExercisesInWorkout(workoutId);

  const index = exercises.findIndex((e) => e.name === exerciseName);

  if (index < 0) throw new ExerciseNotFoundError(`No exercise found with name ${exerciseName}`);

  exercises.splice(index, 1);

  const { error } = await supabase.from('workouts').update({ exercises }).eq('id', workoutId);
  if (error) throw error;
};

/**
 * Creates a consumale workout from an editable workout id
 * @param session Current session -- from AuthProvider context
 * @param workoutId Id of the editable workout
 * @returns `ConsumableWorkout`
 */
export const createConsumableWorkout = async (
  session: Session | null,
  workoutId: string
): Promise<ConsumableWorkout> => {
  if (session === undefined || session === null)
    throw new UnauthenticatedError('Cannot create a workout with no active user session.');

  const user: User = session.user;
  const workout = await getEditableWorkout(workoutId);

  const consumableWorkout = fromEditableWorkout(workout);

  const { error, data } = await supabase
    .from('consumableworkouts')
    .insert({
      ...consumableWorkout,
      created_by: user.id,
    })
    .select('*')
    .single();

  if (error) throw error;

  return data;
};

/**
 * Fetches a consumable workout from supabase
 * @param workoutId Id of the consumable workout
 * @returns `ConsumableWorkout`
 */
export const getConsumableWorkout = async (workoutId: string): Promise<ConsumableWorkout> => {
  const { error, data } = await supabase
    .from('consumableworkouts')
    .select('*')
    .eq('id', workoutId)
    .single();

  if (error) throw error;

  return data;
};

/**
 * Updates a consumable workout in supabase
 * @param workoutId Id of the consumable workout
 * @param payload `ConsumableWorkoutTemplate` updates to be applied
 */
export const updateConsumableWorkout = async (
  workoutId: string,
  payload: ConsumableWorkoutTemplate
) => {
  const { error } = await supabase.from('consumableworkouts').update(payload).eq('id', workoutId);
  if (error) throw error;
};

/**
 * Delete a consumable workout in supabase
 * @param workoutId Id of the consumable workout
 */
export const deleteConsumableWorkout = async (workoutId: string) => {
  const { error } = await supabase.from('consumableworkouts').delete().eq('id', workoutId);
  if (error) throw error;
};
