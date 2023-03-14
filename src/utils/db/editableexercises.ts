import { supabase } from '../supabaseClient';
import { EditableExercise, EditableExerciseItem, ExerciseTemplate } from '../../types';

export const EDITABLE_EXERCISES_TABLE_NAME = 'editableexercises';

/**
 * Fetch All with Options -- 'editableexercises'
 * @param params
 * @returns
 */
export const getEditableExercises = async ({
  userId,
  editableWorkoutId,
  exerciseName,
}: {
  userId: string;
  editableWorkoutId?: string;
  exerciseName?: string;
}): Promise<EditableExercise[]> => {
  let request = supabase.from(EDITABLE_EXERCISES_TABLE_NAME).select('*').eq('created_by', userId);

  if (editableWorkoutId) request = request.eq('editableWorkoutId', editableWorkoutId);

  if (exerciseName) request = request.eq('exerciseName', exerciseName);

  const { data, error } = await request.order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

/**
 * Create -- 'editableexercises'
 * @param exerciseName
 * @param editableWorkoutId
 * @param userId
 * @returns
 */
export const createEditableExercise = async ({
  exerciseName,
  editableWorkoutId,
  userId,
  exerciseItems = [],
}: {
  exerciseName: string;
  editableWorkoutId: string;
  userId: string;
  exerciseItems?: EditableExerciseItem[];
}): Promise<EditableExercise> => {
  const { data, error } = await supabase
    .from(EDITABLE_EXERCISES_TABLE_NAME)
    .insert({
      exerciseName,
      editableWorkoutId,
      created_by: userId,
      exerciseItems,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
};

/**
 * Read -- 'editableexercises'
 * @param exerciseName
 * @param editableWorkoutId
 * @returns
 */
export const getEditableExercise = async ({
  exerciseName,
  editableWorkoutId,
}: {
  exerciseName: string;
  editableWorkoutId: string;
}): Promise<EditableExercise> => {
  const { data, error } = await supabase
    .from(EDITABLE_EXERCISES_TABLE_NAME)
    .select(`*`)
    .eq('exerciseName', exerciseName)
    .eq('editableWorkoutId', editableWorkoutId)
    .single();

  if (error) throw error;

  return data as EditableExercise;
};

/**
 * Get all exercise templates from supabase
 * @returns {Array} Array of exercises [{name, muscle_group}]
 */
export const getAllEditableExercises = async () => {
  const { data, error } = await supabase.from('exercises').select('name, muscle_group');

  if (error) throw error;

  // console.log('getAllEditableExercises:', data);
  return data as ExerciseTemplate[];
};

/**
 * Update -- 'editableexercises'
 * @param editableWorkoutId
 * @param exerciseName
 * @param payload
 */
export const updateEditableExercise = async ({
  editableWorkoutId,
  exerciseName,
  payload,
}: {
  editableWorkoutId: string;
  exerciseName: string;
  payload: Partial<EditableExercise>;
}) => {
  const { error } = await supabase
    .from(EDITABLE_EXERCISES_TABLE_NAME)
    .update(payload)
    .eq('exerciseName', exerciseName)
    .eq('editableWorkoutId', editableWorkoutId);

  if (error) throw error;
};

/**
 * Delete -- 'editableexercises'
 * @param params
 */
export const deleteEditableExercise = async ({
  exerciseName,
  editableWorkoutId,
}: {
  exerciseName: string;
  editableWorkoutId: string;
}) => {
  const { error } = await supabase
    .from(EDITABLE_EXERCISES_TABLE_NAME)
    .delete()
    .eq('exerciseName', exerciseName)
    .eq('editableWorkoutId', editableWorkoutId);

  if (error) throw error;
};

export const duplicateEditableExercise = async ({
  exerciseName,
  fromEditableWorkoutId,
  toEditableWorkoutId,
  userId,
}: {
  exerciseName: string;
  fromEditableWorkoutId: string;
  toEditableWorkoutId: string;
  userId: string;
}) => {
  const editableExercise = await getEditableExercise({
    exerciseName,
    editableWorkoutId: fromEditableWorkoutId,
  });

  await createEditableExercise({
    exerciseName,
    editableWorkoutId: toEditableWorkoutId,
    userId,
    exerciseItems: editableExercise.exerciseItems,
  });
};
