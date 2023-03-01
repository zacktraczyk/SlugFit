import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { ConsumableExercise } from '../types';
import {
  getConsumableExercise,
  CONSUMABLE_EXERCISES_TABLE_NAME,
} from '../utils/db/consumableexercises';

/**
 * Hooks in to a specific ConsumableExercise and gets data
 * @returns `{consumableExercise, fetch, loading, listening}`
 */
export const useConsumableExercise = (
  exerciseName: string,
  consumableWorkoutId: string,
  useRealtime = false
) => {
  const [loading] = useState<boolean>(false);
  const [listening, setListening] = useState<boolean>(false);
  const [consumableExercise, setConsumableExercise] = useState<Partial<ConsumableExercise>>({
    exerciseName,
    consumableWorkoutId,
    exerciseItems: [],
  });

  const listen = () => {
    const exerciseChannel = supabase.channel(
      `consumable-exercise-${exerciseName}-${consumableWorkoutId}-channel`
    );

    exerciseChannel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: CONSUMABLE_EXERCISES_TABLE_NAME,
        filter: `consumableWorkoutId=eq.${consumableWorkoutId}, exerciseName=eq.${exerciseName}`,
      },
      (payload) => {
        setConsumableExercise(payload.new as ConsumableExercise);
      }
    );

    exerciseChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        setListening(true);
      }
    });

    return () => {
      supabase.removeChannel(exerciseChannel);
      setListening(false);
    };
  };

  const fetch = async () => {
    try {
      const data = await getConsumableExercise({ consumableWorkoutId, exerciseName });
      setConsumableExercise(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch();
    if (useRealtime) {
      const unsubscribe = listen();
      return unsubscribe;
    }
  }, [consumableWorkoutId, exerciseName, useRealtime]);

  return { consumableExercise, fetch, loading, listening };
};
