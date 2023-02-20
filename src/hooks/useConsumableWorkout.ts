import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { ConsumableWorkout } from '../types';
import {
  CONSUMABLE_WORKOUTS_TABLE_NAME,
  getConsumableWorkout,
} from '../utils/db/consumableworkouts';

/**
 * Hooks in to a ConsumableWorkout and gets data
 * either with async fetch or realtime listener
 * @param workoutId Id of the ConsumableWorkout
 * @param useRealtime Set to true if you want to create a realtime listener for this workout
 * @returns `{workout, fetch, listening}`
 */
export const useConsumableWorkout = (consumableWorkoutId: string, useRealtime = false) => {
  const [listening, setListening] = useState<boolean>(false);
  const [consumableWorkout, setConsumableWorkout] = useState<Partial<ConsumableWorkout>>({
    id: consumableWorkoutId,
    exercises: [],
  });

  const listen = () => {
    const workoutChannel = supabase.channel(`consumable-workout-${consumableWorkoutId}-channel`);

    workoutChannel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: CONSUMABLE_WORKOUTS_TABLE_NAME,
        filter: `id=eq.${consumableWorkoutId}`,
      },
      (payload) => {
        setConsumableWorkout(payload.new as ConsumableWorkout);
      }
    );

    workoutChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        setListening(true);
      }
    });

    return () => {
      supabase.removeChannel(workoutChannel);
      setListening(false);
    };
  };

  const fetch = async () => {
    try {
      const data = await getConsumableWorkout({ consumableWorkoutId });
      setConsumableWorkout(data);
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
  }, [consumableWorkoutId, useRealtime]);

  return { consumableWorkout, fetch, listening };
};
