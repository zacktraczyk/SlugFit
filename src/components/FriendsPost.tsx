import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ConsumableWorkout, ConsumableExercise, ProfileType } from '../types';
import Ionicon from '@expo/vector-icons/Ionicons';
import { generateProfilePictureUrl } from '../utils/db/profiles';
import { useProfile } from '../hooks/useProfile';
import { formatDate, countSetsInConsumableExercise, timeBetween } from '../utils/parsing';
import { getConsumableExercises } from '../utils/db/consumableexercises';
import { supabase } from '../utils/supabaseClient';
import ProfileActionsModal from './modals/ProfileActionsModal';
interface FriendsPostProps {
  post: ConsumableWorkout;
  currentUserData: ProfileType;
  onPress: () => void;
}
export const FriendsPost: React.FC<FriendsPostProps> = ({ post, currentUserData, onPress }) => {
  const { userData } = useProfile(post.created_by);
  const [exercises, setExercises] = useState<ConsumableExercise[]>([]);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const _exercises = await getConsumableExercises({
          userId: post.created_by,
          consumableWorkoutId: post.id,
        });
        setExercises(_exercises);
      } catch (error) {
        console.error(error);
      }
    };
    if (post) fetch();
  }, [post]);

  const elapsedTime = useMemo(() => {
    if (post.ended_at === null) return '';
    const { hours, minutes, seconds } = timeBetween(post.started_at, post.ended_at);
    const time = [];
    if (hours > 0) time.push(`${hours}h`);

    time.push(`${minutes}m`);
    if (hours === 0) time.push(`${seconds}s`);

    return time.join(' ');
  }, [post]);

  const [pictureUrl, setPictureUrl] = useState<string | undefined>(undefined);

  const removeFriend = async (friendId: string | undefined) => {
    if (!friendId || !currentUserData) return undefined;
    try {
      console.log(currentUserData);
      currentUserData.friends?.splice(currentUserData.friends?.indexOf(friendId), 1);
      console.log(currentUserData.friends);
      const { error } = await supabase
        .from('profiles')
        .update({ friends: currentUserData.friends })
        .eq('id', currentUserData.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    }
  };
  useEffect(() => {
    if (post && userData && userData.avatar_url) {
      const url = generateProfilePictureUrl(post.created_by, userData.avatar_url);
      setPictureUrl(url);
    }
  }, [post, userData]);

  return (
    <View className="min-h-48 flex w-11/12 flex-grow flex-col items-center justify-center self-center rounded bg-white shadow-sm shadow-gray-100">
      <View className="flex w-full flex-row rounded-t border-t border-l border-r border-gray-200 p-2">
        <Image
          source={{ uri: pictureUrl }}
          accessibilityIgnoresInvertColors
          className="h-12 w-12 rounded-full"
        />

        <View className="ml-2 flex flex-grow flex-col justify-center">
          <Text className="text-base font-bold">{userData.full_name}</Text>
          <Text className="text-sm font-light">@{userData.username}</Text>
        </View>
        <View className="flex flex-shrink items-center justify-center">
          <TouchableOpacity accessibilityRole="button" onPress={() => setProfileModalVisible(true)}>
            <Ionicon name="ellipsis-vertical" size={24} />
            {profileModalVisible && currentUserData.friends && (
              <ProfileActionsModal
                unfollowUser={() => {
                  removeFriend(userData.id);
                  console.log(userData.id);
                }}
                setModalVisible={setProfileModalVisible}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex w-full flex-col border-t border-l border-r border-gray-200 p-2">
        <View className="flex w-full flex-row items-center justify-between">
          <Text className="text-sm font-normal">{formatDate(post.started_at, true)}</Text>
          <Text>{elapsedTime}</Text>
        </View>
        <Text className="text-lg font-medium">{post.name}</Text>
        {exercises
          .filter((exercise) => exercise.exerciseItems.length > 0)
          .map((exercise) => {
            const { done, total } = countSetsInConsumableExercise(exercise);
            return (
              <View key={exercise.exerciseName} className="flex flex-row items-center">
                <Text className="text-sm font-medium">{exercise.exerciseName}</Text>
                <Text className="ml-2 text-sm font-light">
                  {`${done}/${total}`} {total > 1 ? 'sets' : 'set'}
                </Text>
              </View>
            );
          })}
      </View>
      <View
        accessibilityRole="button"
        className="flex w-full flex-1 flex-row items-center justify-center rounded-b border border-gray-200"
      >
        <TouchableOpacity
          accessibilityRole="button"
          className="flex flex-row items-center justify-center"
          onPress={onPress}
        >
          <Text className="text-sm font-normal">View Summary</Text>
          <Ionicon name="chevron-forward" size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
