import { useState, useEffect } from 'react';
import { EditableExercise } from '../types';
import { getEditableExercise } from '../utils/db/editableexercises';

/**
 * Hooks in to a specific EditableExercise and gets data
 * @returns `{editableExercise, fetch, loading}`
 */
export const useEditableExercise = (exerciseName: string, editableWorkoutId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editableExercise, setEditableExercise] = useState<Partial<EditableExercise>>({
    exerciseName,
    editableWorkoutId,
    exerciseItems: [],
  });

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await getEditableExercise({ exerciseName, editableWorkoutId });
      setEditableExercise(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [exerciseName, editableWorkoutId]);

  return { editableExercise, fetch, loading };
};
