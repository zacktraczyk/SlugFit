import { useState, useEffect } from 'react';
import { ConsumableExercise } from '../types';
import { getConsumableExercise } from '../utils/db/consumableexercises';

/**
 * Hooks in to a specific ConsumableExercise and gets data
 * @returns `{consumableExercise, fetch, loading}`
 */
export const useConsumableExercise = (exerciseName: string, consumableWorkoutId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [consumableExercise, setConsumableExercise] = useState<Partial<ConsumableExercise>>({
    exerciseName,
    consumableWorkoutId,
    exerciseItems: [],
  });

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await getConsumableExercise({ exerciseName, consumableWorkoutId });
      setConsumableExercise(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [exerciseName, consumableWorkoutId]);

  return { consumableExercise, fetch, loading };
};
