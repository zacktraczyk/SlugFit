import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../DrawerNavigator';
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView, Alert } from 'react-native';
import { useConsumableWorkout } from '../../hooks/useConsumableWorkout';
import { ConsumableExercise } from '../../types';
import AnimatedExerciseCardContainer from '../../components/AnimatedExerciseCardContainer';
import UseWorkoutHeader from '../../components/UseWorkoutHeader';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import Block from '../../components/blocks/Block';
import ConsumableExerciseCard from '../../components/ConsumableExerciseCard';
import { updateConsumableWorkout, updateExerciseInConsumableWorkout } from '../../utils/workouts';

type UseWorkoutPageProps = NativeStackScreenProps<NavigatorParamList, 'UseWorkout'>;

const UseWorkoutPage: React.FC<UseWorkoutPageProps> = ({ navigation, route }) => {
  const { workout } = useConsumableWorkout(route.params.workoutId, true);
  const [visibleItem, setVisibleItem] = useState<ConsumableExercise | undefined>(undefined);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 90 });
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setVisibleItem(viewableItems[0].item);
      setVisibleIndex(viewableItems[0].index);
    } else {
      // setVisibleItem(undefined);
    }
  });
  const [cardView, setCardView] = useState(true);
  const flatlistRef = useRef<FlatList>(null);

  const renderCardItem = ({ item: exercise, index }) => {
    return (
      <AnimatedExerciseCardContainer visible={index === visibleIndex} className="bg-white">
        <ConsumableExerciseCard
          exercise={exercise}
          onChange={async (payload: ConsumableExercise) => {
            await updateExerciseInConsumableWorkout(payload, route.params.workoutId);
          }}
        />
      </AnimatedExerciseCardContainer>
    );
  };

  const renderListItem = ({ item: exercise, index }) => {
    const goToCard = () => {
      setCardView(true);
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({ index, animated: true });
      }, 500);
    };

    const numSets = exercise.items.reduce((acc, item) => {
      return item.ref.reps !== undefined && item.ref.reps !== null ? acc + 1 : acc;
    }, 0);

    return (
      <Animated.View entering={FadeInLeft.duration(200).delay(100 * index)} className="self-center">
        <Block
          title={exercise.name}
          subtitle={`${numSets} set${numSets > 1 ? 's' : ''}`}
          icon="expand"
          onPress={goToCard}
          onOptionsPress={goToCard}
        />
      </Animated.View>
    );
  };

  const endWorkout = async () => {
    if (workout) {
      await updateConsumableWorkout(workout.id, { ended_at: new Date() });
      navigation.navigate('Home');
    }
  };

  const onStopPress = () => {
    Alert.alert('End workout session?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: endWorkout,
      },
    ]);
  };

  return (
    <>
      {workout && (
        <UseWorkoutHeader
          workout={workout}
          index={visibleIndex}
          isCardView={cardView}
          toggleView={() => {
            setCardView(!cardView);
          }}
          onStopPress={onStopPress}
        />
      )}
      <View className="h-full w-full flex-1 bg-slate-50">
        <FlatList
          ref={flatlistRef}
          data={workout?.exercises}
          keyExtractor={(item) => item.name}
          renderItem={cardView ? renderCardItem : renderListItem}
          horizontal={cardView}
          snapToAlignment="end"
          viewabilityConfig={viewabilityConfig.current}
          onViewableItemsChanged={onViewableItemsChanged.current}
          pagingEnabled={true}
          decelerationRate={'fast'}
          className="w-full"
          style={styles.flatlist}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flatlist: {},
  card: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  smallCard: {
    width: Dimensions.get('window').width,
    height: '50%',
  },
});

export default UseWorkoutPage;
