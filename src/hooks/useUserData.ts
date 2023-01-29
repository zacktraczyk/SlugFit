import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

export type UserData = {
  username?: undefined;
};

export const useUserData = (session: Session | null) => {
  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (session === undefined || session === null) return {};

  const user: User = session.user;

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      if (user === undefined || user === null) {
        throw 'no user session';
      }

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setUserData(data);
      }
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

  return { userData, loading, error, refresh };
};
