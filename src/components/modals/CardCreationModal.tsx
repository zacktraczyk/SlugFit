import { Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Ionicon from '@expo/vector-icons/Ionicons';

interface BlockActionsModalProps {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  newRest: () => void;
  newNote: () => void;
  newSet: () => void;
}
const CardCreationModal: React.FC<BlockActionsModalProps> = ({
  visible,
  setVisible,
  newRest,
  newNote,
  newSet,
}) => {
  return (
    <Modal
      className="m-0"
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection="down"
    >
      <View className="bg-white absolute top-3/4 h-full w-full divide-y rounded-t-3xl">
        <View className="bg-gray-400 my-3 h-1 w-16 self-center rounded-lg"></View>
        <TouchableOpacity
          accessibilityRole="button"
          className="border-gray-200 flex flex-row items-center space-x-4 p-2"
          onPress={() => {
            newRest();
            setVisible(false);
          }}
        >
          <Ionicon name="timer" size={16} />
          <Text className="text-center text-lg font-bold">Rest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          className="border-gray-200 flex flex-row items-center space-x-4 p-2"
          onPress={() => {
            setVisible(false);
            newNote();
          }}
        >
          <Ionicon name="pencil" size={16} />
          <Text className="text-center text-lg font-bold">Note</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          className="border-gray-200 flex flex-row items-center space-x-4 p-2"
          onPress={() => {
            setVisible(false);
            newSet();
          }}
        >
          <Ionicon name="barbell" size={16} />
          <Text className="text-center text-lg font-bold">Set</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CardCreationModal;
