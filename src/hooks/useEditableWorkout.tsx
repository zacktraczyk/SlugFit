import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { EditableWorkout } from '../types/';
import { getEditableWorkout } from '../utils/workouts';

/**
 * Hooks in to a specific EditableWorkout and gets data
 * either with async fetch or realtime listener
 * @param workoutId Id of the EditableWorkout
 * @param useRealtime Set to true if you want to create a realtime listener for this workout
 * @returns `{workout, fetch, listening}`
 */
export const useEditableWorkout = (workoutId: string | undefined, useRealtime = false) => {
  if (workoutId === null || workoutId === undefined) return {};
  const [listening, setListening] = useState<boolean>(false);
  const [workout, setWorkout] = useState<EditableWorkout>({ id: workoutId });
  const [loading, setLoading] = useState<boolean>(false);
  const listen = () => {
    const workoutChannel = supabase.channel('workout-channel');

    workoutChannel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'workouts', filter: `id=eq.${workoutId}` },
      (payload) => {
        setWorkout(payload.new as EditableWorkout);
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
      setLoading(true);
      const data = await getEditableWorkout(workoutId);
      setWorkout(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
    if (useRealtime) {
      const unsubscribe = listen();
      return unsubscribe;
    }
  }, [workoutId, useRealtime]);

  return { workout, fetch, listening, loading };
};
