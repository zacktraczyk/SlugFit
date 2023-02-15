import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
  SlideInRight,
} from 'react-native-reanimated';

interface AnimatedExerciseCardContainer {
  children?: React.ReactNode;
  visible: boolean;
  className?: string;
}

const AnimatedExerciseCardContainer: React.FC<AnimatedExerciseCardContainer> = ({
  children,
  visible,
  className = 'bg-white shadow rounded-md',
}) => {
  const scaleVal = useDerivedValue(() => {
    return visible ? 1 : 0.9;
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(scaleVal.value, {
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[styles.view, animatedStyle]}
      className={className}
      entering={SlideInRight.duration(500)}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get('window').width,
  },
});

export default AnimatedExerciseCardContainer;
