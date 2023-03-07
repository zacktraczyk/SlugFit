import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import Modal from 'react-native-modal/dist/modal';
import { ConsumableExercise } from '../types';
import { formatDateTime } from '../utils/parsing';

interface PastExericisePerformanceProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  consumableExercises: ConsumableExercise[];
  setModalVisible: (bool: boolean) => void;
  renderConsumableExercise: (exercise: Partial<ConsumableExercise>) => void;
}
const PastExericisePerformance: React.FC<PastExericisePerformanceProps> = ({
  index,
  setIndex,
  consumableExercises,
  setModalVisible,
  renderConsumableExercise,
}) => {
  const [tempindex, setTempIndex] = useState(index);

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={true}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
    >
      <View className="absolute top-2/4 h-full w-full rounded-t-3xl bg-white">
        <View className="my-3 h-1 w-16 self-center rounded-lg bg-gray-400"></View>
        <View className="flex-row content-evenly justify-around">
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text className="text-center text-lg font-bold text-red-500">Close</Text>
          </TouchableOpacity>
          <Text className="text-center text-lg font-bold">Select Performance</Text>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => {
              setIndex(tempindex);
              renderConsumableExercise(consumableExercises[tempindex]);
              setModalVisible(false);
            }}
          >
            <Text className="text-center text-lg font-bold text-red-500">View</Text>
          </TouchableOpacity>
        </View>
        <Picker
          pickerData={consumableExercises.map((exercise) => formatDateTime(exercise.created_at))}
          selectedValue={formatDateTime(consumableExercises[index].created_at)}
          onValueChange={(currentExericise) => {
            setTempIndex(
              consumableExercises

                .map((exercise) => formatDateTime(exercise.created_at))
                .indexOf(currentExericise)
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
