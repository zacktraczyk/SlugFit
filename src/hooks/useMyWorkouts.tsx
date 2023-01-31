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
