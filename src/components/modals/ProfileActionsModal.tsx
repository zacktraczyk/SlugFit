import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Ionicon from '@expo/vector-icons/Ionicons';

interface ProfileActionsModalProps {
  unfollowUser: () => void;
  addWorkout?: () => void;
  setModalVisible: (bool: boolean) => void;
}
const ProfileActionsModal: React.FC<ProfileActionsModalProps> = ({
  unfollowUser,
  addWorkout,
  setModalVisible,
}) => {
  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={true}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
    >
      <View className="absolute bottom-0 w-full bg-white divide-y justify-self-center rounded-t-3xl">
        <View className="self-center w-16 h-1 my-3 bg-gray-400 rounded-lg"></View>

        {unfollowUser && (
          <TouchableOpacity
            accessibilityRole="button"
            className="flex flex-row items-center p-2 space-x-4 border-gray-200"
            onPress={() => {
              setModalVisible(false);
              unfollowUser();
            }}
          >
            <Ionicon name="pencil" size={16} />
            <Text className="text-lg font-bold text-center">Unfollow</Text>
          </TouchableOpacity>
        )}
        {addWorkout && (
          <TouchableOpacity
            accessibilityRole="button"
            className="flex flex-row items-center p-2 space-x-4 border-gray-200"
            onPress={() => {
              setModalVisible(false);
              addWorkout();
            }}
          >
            <Ionicon name="pencil" size={16} />
            <Text className="text-lg font-bold text-center">Add To My Workouts</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default ProfileActionsModal;