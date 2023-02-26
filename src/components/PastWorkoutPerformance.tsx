import React, { useState } from 'react';
import { View } from 'react-native';
import Picker from 'react-native-wheel-pick';
import Modal from 'react-native-modal/dist/modal';
import { ConsumableWorkout } from '../types';

interface PastWorkoutPerformanceProps {
  consumableWorkouts: ConsumableWorkout[];
  setModalVisible: (bool: boolean) => void;
}
const PastWorkoutPerformance: React.FC<PastWorkoutPerformanceProps> = ({
  consumableWorkouts,
  setModalVisible,
}) => {
  const [pastWorkout, setPastWorkout] = useState<ConsumableWorkout>();

  const onChange = (selectedWorkout) => {
    const currentWorkout = selectedWorkout;
    setPastWorkout(currentWorkout);
  };

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={true}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
    >
      <View className="absolute top-2/4 h-full w-full rounded-t-3xl bg-white">
        <View className="my-3 h-1 w-16 self-center rounded-lg bg-gray-400"></View>
        <Picker
          pickerData={consumableWorkouts.map((workout) => workout.ended_at)}
          selectedValue={pastWorkout}
          onValueChange={onChange(consumableWorkouts)}
          display="spinner"
          textColor="black"
        />
      </View>
    </Modal>
  );
};
export default PastWorkoutPerformance;
