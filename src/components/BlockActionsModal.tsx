import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';

interface BlockActionsModalProps {
  deleteWorkout: () => void;
  modalVisibility: () => void;
}
const BlockActionsModal: React.FC<BlockActionsModalProps> = ({
  deleteWorkout,
  modalVisibility,
}) => {
  return (
    <Modal
      onSwipeComplete={modalVisibility}
      swipeDirection="down"
      onBackdropPress={modalVisibility}
    >
      <View className="absolute w-full h-full bg-white border-2 top-3/4 rounded-t-3xl ">
        <View className="self-center w-16 h-1 my-3 bg-gray-400 rounded-lg"></View>
        <TouchableOpacity accessibilityRole="button" onPress={deleteWorkout}>
          <Text className="text-lg font-bold text-center">Delete</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default BlockActionsModal;
