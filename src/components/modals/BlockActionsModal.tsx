import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Ionicon from '@expo/vector-icons/Ionicons';

interface BlockActionsModalProps {
  deleteBlock: () => void;
  setModalVisible: (bool: boolean) => void;
  renameBlock?: () => void;
  duplicateBlock?: () => void;
}
const BlockActionsModal: React.FC<BlockActionsModalProps> = ({
  deleteBlock,
  setModalVisible,
  renameBlock,
  duplicateBlock,
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
        {renameBlock && (
          <TouchableOpacity
            accessibilityRole="button"
            className="flex flex-row items-center space-x-4 border-gray-200 p-2"
            onPress={() => {
              setModalVisible(false);
              renameBlock();
            }}
          >
            <Ionicon name="pencil" size={16} />
            <Text className="text-center text-lg font-bold">Rename</Text>
          </TouchableOpacity>
        )}
        {duplicateBlock && (
          <TouchableOpacity
            accessibilityRole="button"
            className="flex flex-row items-center space-x-4 border-gray-200 p-2"
            onPress={() => {
              setModalVisible(false);
              duplicateBlock();
            }}
          >
            <Ionicon name="duplicate" size={16} />
            <Text className="text-center text-lg font-bold">Duplicate</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          accessibilityRole="button"
          className="mb-12 flex flex-row items-center space-x-4 border-gray-200 p-2"
          onPress={deleteBlock}
        >
          <Ionicon name="trash" size={16} />
          <Text className="text-center text-lg font-bold">Delete</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default BlockActionsModal;
