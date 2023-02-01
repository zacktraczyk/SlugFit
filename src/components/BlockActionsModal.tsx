import { Modal, Dimensions, Text, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import React from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
interface BlockActionsModalProps {
  deleteWorkout: () => void;
}
const BlockActionsModal: React.FC<BlockActionsModalProps> = ({ deleteWorkout }) => {
  return (
    <Modal animationType="slide" transparent={true}>
      <View className="absolute w-full h-full bg-white border-2 top-3/4 rounded-t-3xl ">
        <View className="self-center w-16 h-1 my-3 bg-gray-400 rounded-lg"></View>
        <TouchableOpacity accessibilityRole="button" onPress={deleteWorkout}>
          <Text className="text-lg font-bold text-center">Delete</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.5,
    borderWidth: 1,
    borderRadius: 25,
  },
});
export default BlockActionsModal;
