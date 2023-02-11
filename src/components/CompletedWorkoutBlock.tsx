import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';
import { ConsumableWorkout } from '../types';
import { CompletedBlockContainer } from './CompletedBlockContainer';

interface CompletedWorkoutBlockProps {
  workout: ConsumableWorkout;
}

const CompletedWorkoutBlock: React.FC<CompletedWorkoutBlockProps> = ({ workout }) => {
  const [name, setName] = useState<string>(workout.name || '');

  // count the # of completed/total sets in a workout
  // iterates through a workout's exercises, keeping a running count

  function countSets() {
    let done = 0;
    let total = 0;

    workout.exercises.map((currExercise) => {
      total += currExercise.sets.length;

      currExercise.sets.map((currSet) => {
        if (Number(currSet.reps) > 0) {
          done++;
        }
      });
    });

    return { done, total };
  }

  // format workout's completion date into: MMM DD, YYYY
  // breaks down "ended_at" attribute into month, date, & year
  // month is converted from numeric to string abreviation, ie. 01 -> JAN

  function formatDate() {
    const currDate = new Date(workout.ended_at ?? '2023-01-01T20:55:25.625Z');

    let month = '';

    switch (currDate.getMonth().toString()) {
      case '0':
        month = 'JAN';
        break;
      case '1':
        month = 'FEB';
        break;
      case '2':
        month = 'MAR';
        break;
      case '3':
        month = 'APR';
        break;
      case '4':
        month = 'MAY';
        break;
      case '5':
        month = 'JUNE';
        break;
      case '6':
        month = 'JULY';
        break;
      case '7':
        month = 'AUG';
        break;
      case '8':
        month = 'SEPT';
        break;
      case '9':
        month = 'OCT';
        break;
      case '10':
        month = 'NOV';
        break;
      default:
        month = 'DEC';
    }

    const day = currDate.getDate().toString();
    const year = currDate.getFullYear().toString();

    return month + ' ' + day + ', ' + year;
  }

  return (
    <CompletedBlockContainer>
      <TouchableOpacity
        accessibilityRole="button"
        className="flex-1 p-2"
        hitSlop={{ top: 3, right: 3 }}
      >
        <View className="flex-row justify-between">
          <Text className="font-bebas text-base">{formatDate()}</Text>

          <View className="bottom-0.5">
            <Ionicon name={'checkmark-sharp'} size={25} color={'#3cd15f'} />
          </View>
        </View>

        <Text className="bottom-1 font-bebas text-xl">{workout.name}</Text>

        <View className="flex-1"></View>

        <Text className="font-bebas text-xs">
          {countSets().done}/{countSets().total} sets completed
        </Text>
      </TouchableOpacity>
    </CompletedBlockContainer>
  );
};

export default CompletedWorkoutBlock;
