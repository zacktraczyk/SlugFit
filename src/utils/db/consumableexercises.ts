import { supabase } from '../supabaseClient';
import { ConsumableExercise, ConsumableExerciseItem } from '../../types';
import { getEditableExercise } from './editableexercises';

export const CONSUMABLE_EXERCISES_TABLE_NAME = 'consumableexercises';

/**
 * Fetch All with Options -- 'consumableexercises'
 * @param userId
 * @param consumableWorkoutId
 * @param exerciseName
 * @returns
 */
export const getConsumableExercises = async ({
  userId,
  consumableWorkoutId,
  exerciseName,
}: {
  userId: string;
  consumableWorkoutId?: string;
  exerciseName?: string;
}): Promise<ConsumableExercise[]> => {
  let request = supabase.from(CONSUMABLE_EXERCISES_TABLE_NAME).select('*').eq('created_by', userId);

  if (consumableWorkoutId) request = request.eq('consumableWorkoutId', consumableWorkoutId);

  if (exerciseName) request = request.eq('exerciseName', exerciseName);

  const { data, error } = await request.order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

/**
 * Create -- 'consumableexercises'
 * Requires either exerciseItems or editableWorkoutId
 * @param exerciseName
 * @param consumableWorkoutId
 * @param editableWorkoutId
 * @param userId
 * @returns
 */
export const createConsumableExercise = async ({
  exerciseName,
  consumableWorkoutId,
  editableWorkoutId,
  exerciseItems = [],
  userId,
}: {
  exerciseName: string;
  consumableWorkoutId: string;
  editableWorkoutId?: string;
  exerciseItems?: ConsumableExerciseItem[];
  userId: string;
}): Promise<ConsumableExercise> => {
  let editableExercise;
  if (editableWorkoutId)
    editableExercise = await getEditableExercise({ exerciseName, editableWorkoutId });

  const { data, error } = await supabase
    .from(CONSUMABLE_EXERCISES_TABLE_NAME)
    .insert({
      exerciseName: exerciseName,
      consumableWorkoutId,
      created_by: userId,
      exerciseItems: editableWorkoutId
        ? editableExercise?.exerciseItems.map((item) => ({ data: {}, ref: item }))
        : exerciseItems,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
};

/**
 * Read -- 'consumableexercises'
 * @param exerciseName
 * @param consumableWorkoutId
 * @returns
 */
export const getConsumableExercise = async ({
  exerciseName,
  consumableWorkoutId,
}: {
  exerciseName: string;
  consumableWorkoutId: string;
}): Promise<ConsumableExercise> => {
  const { data, error } = await supabase
    .from(CONSUMABLE_EXERCISES_TABLE_NAME)
    .select(`*`)
    .eq('exerciseName', exerciseName)
    .eq('consumableWorkoutId', consumableWorkoutId)
    .single();

  if (error) throw error;

  return data as ConsumableExercise;
};

/**
 * Update -- 'consumableexercises'
 * @param consumableWorkoutId
 * @param exerciseName
 * @param payload
 */
export const updateConsumableExercise = async ({
  consumableWorkoutId,
  exerciseName,
  payload,
}: {
  consumableWorkoutId: string;
  exerciseName: string;
  payload: Partial<ConsumableExercise>;
}) => {
  const { error } = await supabase
    .from(CONSUMABLE_EXERCISES_TABLE_NAME)
    .update(payload)
    .eq('exerciseName', exerciseName)
    .eq('consumableWorkoutId', consumableWorkoutId);

  if (error) throw error;
};

/**
 * Delete -- 'consumableexercises'
 * @param exerciseName
 * @param consumableWorkoutId
 */
export const deleteConsumableExercise = async ({
  exerciseName,
  consumableWorkoutId,
}: {
  exerciseName: string;
  consumableWorkoutId: string;
}) => {
  const { error } = await supabase
    .from(CONSUMABLE_EXERCISES_TABLE_NAME)
    .delete()
    .eq('exerciseName', exerciseName)
    .eq('consumableWorkoutId', consumableWorkoutId);

  if (error) throw error;
};
