import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { ConsumableWorkout } from '../types';
import { getConsumableWorkout } from '../utils/workouts';

/**
 * Hooks in to a ConsumableWorkout and gets data
 * either with async fetch or realtime listener
 * @param workoutId Id of the ConsumableWorkout
 * @param useRealtime Set to true if you want to create a realtime listener for this workout
 * @returns `{workout, fetch, listening}`
 */
export const useConsumableWorkout = (workoutId: string | undefined, useRealtime = false) => {
  if (workoutId === null || workoutId === undefined) return {};
  const [listening, setListening] = useState<boolean>(false);
  const [workout, setWorkout] = useState<ConsumableWorkout>({ id: workoutId, exercises: [] });

  const listen = () => {
    const workoutChannel = supabase.channel('workout-channel');

    workoutChannel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'consumableworkouts', filter: `id=eq.${workoutId}` },
      (payload) => {
        setWorkout(payload.new as ConsumableWorkout);
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
      const data = await getConsumableWorkout(workoutId);
      setWorkout(data);
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
  }, [workoutId, useRealtime]);

  return { workout, fetch, listening };
};
