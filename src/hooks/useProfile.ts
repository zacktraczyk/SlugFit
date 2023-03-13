import { useCallback, useEffect, useState } from 'react';
import { ProfileType } from '../types';
import { getUserProfile } from '../utils/db/profiles';

export const useProfile = (userId: string | undefined) => {
  const [userData, setUserData] = useState<ProfileType>({});
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      if (userId === undefined || userId === null) {
        throw 'no user session';
      }

      const data = await getUserProfile(userId);

      if (data) {
        setUserData(data);
      }
    } catch (error) {
      let message;

      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [userId]);

  return { userData, loading, refresh };
};
