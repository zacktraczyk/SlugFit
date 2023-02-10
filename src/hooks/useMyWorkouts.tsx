import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { EditableWorkout } from '../types/';
import { getEditableWorkoutsByUserId } from '../utils/workouts';

/**
 * Hooks into the user's workouts
 * @param session Current session from AuthProvider
 * @returns An array of the user's EditableWorkouts
 */
export const useMyWorkouts = (session: Session | null) => {
  const [workouts, setWorkouts] = useState<Array<EditableWorkout>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  if (session === undefined || session === null) return {};

  const user: User = session.user;

  const fetch = async () => {
    try {
      setLoading(true);

      const data = await getEditableWorkoutsByUserId(user.id);

      if (data) setWorkouts(data);

      setError(undefined);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [user]);

  return { workouts, loading, error, fetch };
};
