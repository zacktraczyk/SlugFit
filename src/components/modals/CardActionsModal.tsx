import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Ionicon from '@expo/vector-icons/Ionicons';

interface BlockActionsModalProps {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  deleteExerciseItem: () => void;
  duplicateExerciseItem: () => void;
}
const CardActionsModal: React.FC<BlockActionsModalProps> = ({
  visible,
  setVisible,
  deleteExerciseItem,
  duplicateExerciseItem,
}) => {
  return (
    <Modal
      className="m-0"
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection="down"
    >
      <View className="absolute top-3/4 h-full w-full divide-y rounded-t-3xl bg-white">
        <View className="my-3 h-1 w-16 self-center rounded-lg bg-gray-400"></View>
        <TouchableOpacity
          accessibilityRole="button"
          className="flex flex-row items-center space-x-4 border-gray-200 p-2"
          onPress={() => {
            setVisible(false);
            duplicateExerciseItem();
          }}
        >
          <Ionicon name="duplicate" size={16} />
          <Text className="text-center text-lg font-bold">Duplicate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          className="flex flex-row items-center space-x-4 border-gray-200 p-2"
          onPress={() => {
            setVisible(false);
            deleteExerciseItem();
          }}
        >
          <Ionicon name="trash" size={16} />
          <Text className="text-center text-lg font-bold">Delete</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CardActionsModal;
