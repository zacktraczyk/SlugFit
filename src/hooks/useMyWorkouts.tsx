import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { EditableWorkout } from '../types/EditableWorkout';

export const useMyWorkouts = (session: Session | null) => {
  const [workouts, setWorkouts] = useState<Array<EditableWorkout>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (session === undefined || session === null) return {};

  const user: User = session.user;

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from('workouts')
        .select(`id, name`)
        .eq('created_by', user.id);

      if (error && status !== 406) throw error;

      if (data) setWorkouts(data);
    } catch (error) {
      let message;

      if (error instanceof Error) message = error.message;
      else message = String(error);
      setError(error);
      alert(message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [user]);

  return { workouts, loading, error, refresh };
};

export const createEditableWorkout = async (
  session: Session | null
): Promise<EditableWorkout | undefined> => {
  if (session === undefined || session === null) return undefined;

  const user: User = session.user;

  try {
    const { data, error } = await supabase
      .from('workouts')
      .insert({ name: '', created_by: user.id })
      .select(`id`)
      .single();
    if (error) throw error;

    return data as EditableWorkout;
  } catch (error) {
    console.error(error);
  }
};

export const deleteEditableWorkout = async (id: string) => {
  try {
    const { error } = await supabase.from('workouts').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

export const updateEditableWorkout = async (payload: EditableWorkout) => {
  try {
    const { error } = await supabase.from('workouts').update(payload).eq('id', payload.id);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};
