import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import Modal from 'react-native-modal/dist/modal';
import { ConsumableExercise } from '../types';
import { formatDateTime } from '../utils/parsing';

interface PastExericisePerformanceProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  consumableExercise: ConsumableExercise[];
  setModalVisible: (bool: boolean) => void;
  renderConsumableExercise: (exercise: Partial<ConsumableExercise>) => void;
}
const PastExericisePerformance: React.FC<PastExericisePerformanceProps> = ({
  index,
  setIndex,
  consumableExercise,
  setModalVisible,
  renderConsumableExercise,
}) => {
  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={true}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
    >
      <View className="absolute top-2/4 h-full w-full rounded-t-3xl bg-white">
        <View className="my-3 h-1 w-16 self-center rounded-lg bg-gray-400"></View>

        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => {
            renderConsumableExercise(consumableExercise[index]);
            // console.log(consumableExercise[index].exerciseName);
            setModalVisible(false);
          }}
        >
          <Text className="text-center text-lg font-bold">Select Performance</Text>
        </TouchableOpacity>

        <Picker
          pickerData={consumableExercise
            .map((exercise) => formatDateTime(exercise.created_at))
            .reverse()}
          selectedValue={formatDateTime(consumableExercise[index].created_at)}
          onValueChange={(consumableExericises) => {
            setIndex(
              consumableExercise
                .map((exercise) => formatDateTime(exercise.created_at))
                .indexOf(consumableExericises)
            );
          }}
          textColor="black"
          className="bg-white"
        />
      </View>
    </Modal>
  );
};
export default PastExericisePerformance;
