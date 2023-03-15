import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { EditableWorkout } from '../types';
import { getEditableWorkoutsByUserId } from '../utils/db/editableworkouts';
import { PostgrestError } from '@supabase/supabase-js';

/**
 * Hooks into the user's editable workouts
 * @param session Current session from AuthProvider
 */
export const useMyEditableWorkouts = (session: Session | null) => {
  const [editableWorkouts, setEditableWorkouts] = useState<Array<EditableWorkout>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError | undefined>(undefined);

  if (session === undefined || session === null) return {};

  const user: User = session.user;

  const fetch = async () => {
    try {
      setLoading(true);

      const data = await getEditableWorkoutsByUserId({ userId: user.id });

      if (data) setEditableWorkouts(data);

      setError(undefined);
    } catch (error) {
      setError(error as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [user]);

  return { editableWorkouts, loading, error, fetch };
};
