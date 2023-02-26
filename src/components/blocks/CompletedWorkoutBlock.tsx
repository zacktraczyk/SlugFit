import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';
import { ConsumableWorkout } from '../../types';
import { CompletedBlockContainer } from './CompletedBlockContainer';
import { countSetsInConsumableWorkout } from '../../utils/parsing';
import { formatDate } from '../../utils/parsing';

interface CompletedWorkoutBlockProps {
  consumableWorkout: ConsumableWorkout;
}

const CompletedWorkoutBlock: React.FC<CompletedWorkoutBlockProps> = ({ consumableWorkout }) => {
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const { done, total } = await countSetsInConsumableWorkout(consumableWorkout);
      setDone(done);
      setTotal(total);
    };
    fetch();
  }, [consumableWorkout]);

  return (
    <CompletedBlockContainer>
      <TouchableOpacity
        accessibilityRole="button"
        className="flex-1 p-2"
        hitSlop={{ top: 3, right: 3 }}
      >
        <View className="flex-row justify-between">
          <Text className="font-bebas text-base">{formatDate(consumableWorkout?.ended_at)}</Text>

          <View className="bottom-0.5">
            <Ionicon name={'checkmark-sharp'} size={25} color={'#3cd15f'} />
          </View>
        </View>

        <Text className="bottom-1 font-bebas text-xl">{consumableWorkout.name}</Text>

        <View className="flex-1"></View>

        <Text className="font-bebas text-xs">
          {done}/{total} sets completed
        </Text>
      </TouchableOpacity>
    </CompletedBlockContainer>
  );
};

export default CompletedWorkoutBlock;
