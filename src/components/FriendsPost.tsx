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
    if (!friendId || !currentUserData) throw new Error('No friendId');
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
    <View className="flex flex-col items-center self-center justify-center w-11/12 h-48 bg-white rounded shadow-sm shadow-gray-100">
      <View className="flex flex-row w-full p-2 border-t border-l border-r border-gray-200 rounded-t">
        <Image
          source={{ uri: pictureUrl }}
          accessibilityIgnoresInvertColors
          className="w-12 h-12 rounded-full"
        />

        <View className="flex flex-col justify-center flex-grow ml-2">
          <Text className="text-base font-bold">{userData.full_name}</Text>
          <Text className="text-sm font-light">@{userData.username}</Text>
        </View>
        <View className="flex items-center justify-center flex-shrink">
          <TouchableOpacity accessibilityRole="button" onPress={() => setProfileModalVisible(true)}>
            <Ionicon name="ellipsis-vertical" size={24} />
            {profileModalVisible && (
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
      <View className="flex flex-col w-full p-2 border-t border-l border-r border-gray-200">
        <View className="flex flex-row items-center justify-between w-full">
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
        className="flex flex-row items-center justify-center flex-1 w-full border border-gray-200 rounded-b"
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
