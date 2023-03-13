import { useState, useEffect } from 'react';
import { ConsumableWorkout } from '../types';
import { getFriendsPosts } from '../utils/db/profiles';

export const useFriendsFeed = (userId: string | undefined) => {
  const [posts, setPosts] = useState<ConsumableWorkout[]>([]);

  const fetch = async () => {
    try {
      const _posts = await getFriendsPosts(userId, 10);

      setPosts(_posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) fetch();
  }, [userId]);

  return { posts, fetch };
};
