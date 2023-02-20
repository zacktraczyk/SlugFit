import { supabase } from '../supabaseClient';
import { EditableWorkout } from '../../types';

export const EDITABLE_WORKOUTS_TABLE_NAME = 'editableworkouts';

/**
 * Fetch All -- 'editableworkouts'
 * @param userId Id of the current user
 * @returns An array of Editable Workouts
 */
export const getEditableWorkoutsByUserId = async ({
  userId,
}: {
  userId: string;
}): Promise<EditableWorkout[]> => {
  const { data, error } = await supabase
    .from(EDITABLE_WORKOUTS_TABLE_NAME)
    .select(`*`)
    .eq('created_by', userId);

  if (error) throw error;

  return data;
};

/**
 * Create -- 'editableworkouts'
 * @param userId Id of the current user
 * @param name
 * @returns `EditableWorkout`
 */
export const createEditableWorkout = async ({
  userId,
  name,
}: {
  userId: string;
  name?: string;
}): Promise<EditableWorkout> => {
  const { data, error } = await supabase
    .from(EDITABLE_WORKOUTS_TABLE_NAME)
    .insert({ name, created_by: userId })
    .select(`*`)
    .single();

  if (error) throw error;

  return data as EditableWorkout;
};

/**
 * Read -- 'editableworkouts'
 * @param workoutId Id of the EditableWorkout
 * @returns An `EditableWorkout`
 * @throws `PostgresError`
 */
export const getEditableWorkout = async ({
  editableWorkoutId,
}: {
  editableWorkoutId: string;
}): Promise<EditableWorkout> => {
  const { data, error } = await supabase
    .from(EDITABLE_WORKOUTS_TABLE_NAME)
    .select('*')
    .eq('id', editableWorkoutId)
    .single();
  if (error) throw error;

  return data as EditableWorkout;
};

/**
 * Update -- 'editableworkouts'
 * @param editableWorkoutId The id of the EditableWorkout to update
 * @param payload The updates to apply to the EditableWorkout
 * @throws `PostgresError`
 */
export const updateEditableWorkout = async ({
  editableWorkoutId,
  payload,
}: {
  editableWorkoutId: string;
  payload: Partial<EditableWorkout>;
}) => {
  const { error } = await supabase
    .from(EDITABLE_WORKOUTS_TABLE_NAME)
    .update(payload)
    .eq('id', editableWorkoutId);

  if (error) throw error;
};

/**
 * Delete -- 'editableworkouts'
 * @param workoutId Id of the EditableWorkout
 * @throws `PostgresError`
 */
export const deleteEditableWorkout = async ({
  editableWorkoutId,
}: {
  editableWorkoutId: string;
}) => {
  const { error } = await supabase
    .from(EDITABLE_WORKOUTS_TABLE_NAME)
    .delete()
    .eq('id', editableWorkoutId);

  if (error) throw error;
};
