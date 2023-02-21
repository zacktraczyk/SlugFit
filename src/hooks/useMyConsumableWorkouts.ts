import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { ConsumableWorkout } from '../types';
import { getConsumableWorkoutsByUserId } from '../utils/db/consumableworkouts';

/**
 * Hooks into the user's consumable workouts
 * @param session Current session from AuthProvider
 */
export const useMyConsumableWorkouts = (session: Session | null) => {
  const [consumableWorkouts, setConsumableWorkouts] = useState<Array<ConsumableWorkout>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  if (session === undefined || session === null) return { loading: false };

  const user: User = session.user;

  const fetch = async () => {
    try {
      setLoading(true);

      const data = await getConsumableWorkoutsByUserId({ userId: user.id });

      if (data) setConsumableWorkouts(data);

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

  return { consumableWorkouts, loading, error, fetch };
};
