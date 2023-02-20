import { supabase } from '../supabaseClient';
import { ConsumableWorkout } from '../../types';

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
    .eq('created_by', userId);

  if (error) throw error;

  return data;
};

/**
 * Create -- 'consumableworkouts'
 * @param userId Id of the current user
 * @returns `ConsumableWorkout`
 */
export const createConsumableWorkout = async ({
  userId,
}: {
  userId: string;
}): Promise<ConsumableWorkout> => {
  const { data, error } = await supabase
    .from(CONSUMABLE_WORKOUTS_TABLE_NAME)
    .insert({ name: '', created_by: userId })
    .select(`*`)
    .single();

  if (error) throw error;

  return data as ConsumableWorkout;
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
  const { error } = await supabase
    .from(CONSUMABLE_WORKOUTS_TABLE_NAME)
    .delete()
    .eq('id', consumableWorkoutId);

  if (error) throw error;
};
