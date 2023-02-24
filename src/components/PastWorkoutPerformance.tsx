import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal/dist/modal';

interface PastWorkoutPerformanceProps {
  id: string;
  setModalVisible: (bool: boolean) => void;
}
const PastWorkoutPerformance: React.FC<PastWorkoutPerformanceProps> = ({ id, setModalVisible }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={true}
      onBackdropPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
    >
      <View className="absolute w-full h-full bg-white top-2/4 rounded-t-3xl">
        <View className="self-center w-16 h-1 my-3 bg-gray-400 rounded-lg"></View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
          display="spinner"
          textColor="black"
        />
      </View>
    </Modal>
  );
};
export default PastWorkoutPerformance;
