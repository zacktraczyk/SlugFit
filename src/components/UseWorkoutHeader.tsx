import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ConsumableExercise, ConsumableWorkout } from '../types';
import Animated, { FadeIn, FadeInLeft, FadeInRight, FadeOut } from 'react-native-reanimated';
import Ionicon from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';

interface UseWorkoutHeaderProps {
  isCardView?: boolean;
  index: number;
  consumableWorkout: ConsumableWorkout;
  toggleView: () => void;
  onStopPress: () => void;
}

interface WorkoutProgressBarProps {
  exercises: ConsumableExercise[];
  currentIndex: number;
  direction: undefined | 'left' | 'right';
}

const WorkoutProgressBar: React.FC<WorkoutProgressBarProps> = ({
  exercises,
  currentIndex,
  direction,
}) => {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      className="flex-row items-center justify-center"
    >
      {exercises.map((item, index) => {
        return (
          <Fragment key={index}>
            {currentIndex === index && (
              <Animated.View
                entering={
                  direction === 'left' ? FadeInLeft.duration(100) : FadeInRight.duration(100)
                }
                className="h-1 flex-1 rounded"
                style={{
                  backgroundColor: '#323232',
                }}
              ></Animated.View>
            )}
            {currentIndex !== index && (
              <Animated.View
                className="h-1 flex-1"
                style={{
                  backgroundColor: 'transparent',
                }}
              ></Animated.View>
            )}
          </Fragment>
        );
      })}
    </Animated.View>
  );
};

const UseWorkoutHeader: React.FC<UseWorkoutHeaderProps> = ({
  consumableWorkout,
  isCardView = true,
  index,
  toggleView,
  onStopPress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(index);
  const [direction, setDirection] = useState<'left' | 'right' | undefined>('left');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    const interval = setInterval(() => {
      if (consumableWorkout.started_at !== undefined) {
        let totalSeconds = (Date.now() - new Date(consumableWorkout.started_at).getTime()) / 1000;
        const _hours = totalSeconds / 3600;
        totalSeconds %= 3600;
        const _minutes = totalSeconds / 60;
        totalSeconds %= 60;
        setHours(Math.floor(_hours).toString().padStart(1, '0'));
        setMinutes(Math.floor(_minutes).toString().padStart(2, '0'));
        setSeconds(Math.floor(totalSeconds).toString().padStart(2, '0'));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [consumableWorkout.started_at]);

  useEffect(() => {
    setCurrentIndex((lastIndex) => {
      if (index > lastIndex) {
        setDirection('left');
      } else {
        setDirection('right');
      }
      return index;
    });
  }, [index]);

  return (
    <View className="flex h-24 w-full flex-col border-b border-b-slate-100 bg-white pt-10 shadow">
      <View className="flex w-full flex-grow flex-row">
        <View className="flex flex-1 items-center justify-center">
          <TouchableOpacity accessibilityRole="button" className="p-0" onPress={toggleView}>
            <MaterialCommunityIcon
              name={!isCardView ? 'view-carousel-outline' : 'view-list'}
              size={28}
              color="#323232"
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-grow flex-row items-center justify-center pt-2 pb-2">
          <Text className="text-lg font-medium">{consumableWorkout.name}</Text>
        </View>
        <View className="flex flex-1 flex-col items-center justify-center pt-2 pb-2">
          <Text className="text-sm font-light">{`${
            hours !== '0' ? hours + ':' : ''
          }${minutes}:${seconds}`}</Text>
        </View>
        <View className="flex flex-1 items-center justify-center">
          <TouchableOpacity accessibilityRole="button" className="p-0" onPress={onStopPress}>
            <Ionicon name="stop-circle" size={36} color="#ED4E39" />
          </TouchableOpacity>
        </View>
      </View>
      {isCardView && (
        <WorkoutProgressBar
          exercises={consumableWorkout.exercises || []}
          currentIndex={currentIndex}
          direction={direction}
        />
      )}
      {!isCardView && <View className="h-1"></View>}
    </View>
  );
};

export default UseWorkoutHeader;
