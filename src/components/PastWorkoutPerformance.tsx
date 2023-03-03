import React, { useState } from 'react';
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
  const [tempindex, setTempIndex] = useState(index);

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={true}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
    >
      <View className="absolute w-full h-full bg-white top-2/4 rounded-t-3xl">
        <View className="self-center w-16 h-1 my-3 bg-gray-400 rounded-lg"></View>

        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => {
            setIndex(tempindex);
            renderConsumableExercise(consumableExercise[tempindex]);
            // console.log(consumableExercise[index].exerciseName);
            setModalVisible(false);
          }}
        >
          <Text className="text-lg font-bold text-center">Select Performance</Text>
        </TouchableOpacity>

        <Picker
          pickerData={consumableExercise.map((exercise) => formatDateTime(exercise.created_at))}
          selectedValue={formatDateTime(consumableExercise[index].created_at)}
          onValueChange={(currentExericise) => {
            setTempIndex(
              consumableExercise

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
