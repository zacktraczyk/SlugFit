import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Ionicon from '@expo/vector-icons/Ionicons';

interface BlockActionsModalProps {
  deleteWorkout: () => void;
  setModalVisible: (bool: boolean) => void;
  renameWorkout: () => void;
  duplicateWorkout: () => void;
}
const BlockActionsModal: React.FC<BlockActionsModalProps> = ({
  deleteWorkout,
  setModalVisible,
  renameWorkout,
  duplicateWorkout,
}) => {
  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={true}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
    >
      <View className="absolute w-full h-full bg-white divide-y top-3/4 rounded-t-3xl">
        <View className="self-center w-16 h-1 my-3 bg-gray-400 rounded-lg"></View>
        <TouchableOpacity
          accessibilityRole="button"
          className="flex flex-row items-center p-2 space-x-4 border-gray-200"
          onPress={deleteWorkout}
        >
          <Ionicon name="trash" size={16} />
          <Text className="text-lg font-bold text-center">Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          className="flex flex-row items-center p-2 space-x-4 border-gray-200"
          onPress={() => {
            setModalVisible(false);
            renameWorkout();
          }}
        >
          <Ionicon name="pencil" size={16} />
          <Text className="text-lg font-bold text-center">Rename</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          className="flex flex-row items-center p-2 space-x-4 border-gray-200"
          onPress={() => {
            setModalVisible(false);
            duplicateWorkout();
          }}
        >
          <Ionicon name="duplicate" size={16} />
          <Text className="text-lg font-bold text-center">Duplicate</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default BlockActionsModal;
