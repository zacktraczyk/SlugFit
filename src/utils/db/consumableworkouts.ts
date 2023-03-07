import { supabase } from '../supabaseClient';
import { ConsumableExercise, ConsumableWorkout } from '../../types';
import { getEditableWorkout } from './editableworkouts';
import { createConsumableExercise, deleteConsumableExercise } from './consumableexercises';
import { LocalConsumableExercise, LocalConsumableWorkout } from '../../hooks/useActiveWorkout';

export const CONSUMABLE_WORKOUTS_TABLE_NAME = 'consumableworkouts';

/**
 * Fetch All -- 'consumableworkouts'
 * @param userId Id of the current user
 * @returns An array of Consumable Workouts
 */
export const getConsumableWorkoutsByUserId = async ({
  userId,
}: {
  userId: string;
}): Promise<ConsumableWorkout[]> => {
  const { data, error } = await supabase
    .from(CONSUMABLE_WORKOUTS_TABLE_NAME)
    .select(`*`)
    .eq('created_by', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
};

/**
 * Create -- 'consumableworkouts'
 * @param userId Id of the current user
 * @param editableWorkoutId Id of the workout to branch from
 * @returns `ConsumableWorkout`
 */
export const createConsumableWorkout = async ({
  userId,
  editableWorkoutId,
}: {
  userId: string;
  editableWorkoutId: string;
}): Promise<ConsumableWorkout> => {
  const editableWorkout = await getEditableWorkout({ editableWorkoutId });

  const { data, error } = await supabase
    .from(CONSUMABLE_WORKOUTS_TABLE_NAME)
    .insert({
      name: editableWorkout.name,
      created_by: userId,
      exercises: editableWorkout.exercises,
    })
    .select(`*`)
    .single();

  if (error) throw error;

  const promises: Promise<ConsumableExercise>[] = [];
  for (const exerciseName of data.exercises) {
    promises.push(
      createConsumableExercise({
        exerciseName,
        consumableWorkoutId: data.id,
        editableWorkoutId,
        userId,
      })
    );
  }
  await Promise.all(promises);

  return data as ConsumableWorkout;
};

export const createConsumableWorkoutFromLocal = async ({
  userId,
  workout,
  started_at,
  ended_at,
  exercises,
}: {
  userId: string;
  workout: LocalConsumableWorkout;
  started_at: Date;
  ended_at: Date;
  exercises: LocalConsumableExercise[];
}) => {
  const { data: consumableWorkout, error } = await supabase
    .from(CONSUMABLE_WORKOUTS_TABLE_NAME)
    .insert({ ...workout, started_at, ended_at })
    .select(`*`)
    .single();

  if (error) throw error;

  const promises: Promise<ConsumableExercise>[] = [];
  for (const exercise of exercises) {
    promises.push(
      createConsumableExercise({
        exerciseName: exercise.exerciseName,
        consumableWorkoutId: consumableWorkout.id,
        exerciseItems: exercise.exerciseItems,
        userId,
      })
    );
  }
  await Promise.all(promises);
};

/**
 * Read -- 'consumableworkouts'
 * @param workoutId Id of the ConsumableWorkout
 * @returns An `ConsumableWorkout`
 * @throws `PostgresError`
 */
export const getConsumableWorkout = async ({
  consumableWorkoutId,
}: {
  consumableWorkoutId: string;
}): Promise<ConsumableWorkout> => {
  const { data, error } = await supabase
    .from(CONSUMABLE_WORKOUTS_TABLE_NAME)
    .select('*')
    .eq('id', consumableWorkoutId)
    .single();
  if (error) throw error;

  return data as ConsumableWorkout;
};

/**
 * Update -- 'consumableworkouts'
 * @param consumableWorkoutId The id of the ConsumableWorkout to update
 * @param payload The updates to apply to the ConsumableWorkout
 * @throws `PostgresError`
 */
export const updateConsumableWorkout = async ({
  consumableWorkoutId,
  payload,
}: {
  consumableWorkoutId: string;
  payload: Partial<ConsumableWorkout>;
}) => {
  const { error } = await supabase
    .from(CONSUMABLE_WORKOUTS_TABLE_NAME)
    .update(payload)
    .eq('id', consumableWorkoutId);

  if (error) throw error;
};

/**
 * Delete -- 'consumableworkouts'
 * @param workoutId Id of the ConsumableWorkout
 * @throws `PostgresError`
 */
export const deleteConsumableWorkout = async ({
  consumableWorkoutId,
}: {
  consumableWorkoutId: string;
}) => {
  const consumableWorkout = await getConsumableWorkout({ consumableWorkoutId });

  const promises: Promise<void>[] = [];
  for (const exerciseName of consumableWorkout.exercises) {
    promises.push(deleteConsumableExercise({ exerciseName, consumableWorkoutId }));
  }
  await Promise.all(promises);

  const { error } = await supabase
    .from(CONSUMABLE_WORKOUTS_TABLE_NAME)
    .delete()
    .eq('id', consumableWorkoutId);

  if (error) throw error;
};
