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
      <View className="bg-white absolute top-3/4 h-full w-full divide-y rounded-t-3xl">
        <View className="bg-gray-400 my-3 h-1 w-16 self-center rounded-lg"></View>
        <TouchableOpacity
          accessibilityRole="button"
          className="border-gray-200 flex flex-row items-center space-x-4 p-2"
          onPress={deleteWorkout}
        >
          <Ionicon name="trash" size={16} />
          <Text className="text-center text-lg font-bold">Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          className="border-gray-200 flex flex-row items-center space-x-4 p-2"
          onPress={() => {
            setModalVisible(false);
            renameWorkout();
          }}
        >
          <Ionicon name="pencil" size={16} />
          <Text className="text-center text-lg font-bold">Rename</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          className="border-gray-200 flex flex-row items-center space-x-4 p-2"
          onPress={() => {
            setModalVisible(false);
            duplicateWorkout();
          }}
        >
          <Ionicon name="duplicate" size={16} />
          <Text className="text-center text-lg font-bold">Duplicate</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default BlockActionsModal;
