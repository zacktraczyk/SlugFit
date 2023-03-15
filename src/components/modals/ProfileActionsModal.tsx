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
      <View className="absolute bottom-0 w-full divide-y justify-self-center rounded-t-3xl bg-white">
        <View className="my-3 h-1 w-16 self-center rounded-lg bg-gray-400"></View>

        {unfollowUser && (
          <TouchableOpacity
            accessibilityRole="button"
            className="flex flex-row items-center space-x-4 border-gray-200 p-2"
            onPress={() => {
              setModalVisible(false);
              unfollowUser();
            }}
          >
            <Ionicon name="pencil" size={16} />
            <Text className="text-center text-lg font-bold">Unfollow</Text>
          </TouchableOpacity>
        )}
        {addWorkout && (
          <TouchableOpacity
            accessibilityRole="button"
            className="mb-12 flex flex-row items-center space-x-4 border-gray-200 p-2"
            onPress={() => {
              setModalVisible(false);
              addWorkout();
            }}
          >
            <Ionicon name="pencil" size={16} />
            <Text className="text-center text-lg font-bold">Add To My Workouts</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default ProfileActionsModal;
