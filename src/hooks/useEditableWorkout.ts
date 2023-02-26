import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { EditableWorkout } from '../types';
import { EDITABLE_WORKOUTS_TABLE_NAME, getEditableWorkout } from '../utils/db/editableworkouts';

/**
 * Hooks in to a specific EditableWorkout and gets data
 * either with async fetch or realtime listener
 * @param workoutId Id of the EditableWorkout
 * @param useRealtime Set to true if you want to create a realtime listener for this workout
 * @returns `{workout, fetch, listening}`
 */
export const useEditableWorkout = (editableWorkoutId: string, useRealtime = false) => {
  const [listening, setListening] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editableWorkout, setEditableWorkout] = useState<Partial<EditableWorkout>>({
    id: editableWorkoutId,
    exercises: [],
  });

  const listen = () => {
    const workoutChannel = supabase.channel(`editable-workout-${editableWorkoutId}-channel`);

    workoutChannel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: EDITABLE_WORKOUTS_TABLE_NAME,
        filter: `id=eq.${editableWorkoutId}`,
      },
      (payload) => {
        setEditableWorkout(payload.new as EditableWorkout);
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
      const data = await getEditableWorkout({ editableWorkoutId });
      setEditableWorkout(data);
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
  }, [editableWorkoutId, useRealtime]);

  return { editableWorkout, fetch, listening, loading };
};
