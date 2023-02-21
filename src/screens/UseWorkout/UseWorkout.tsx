import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../DrawerNavigator';
import { View, StyleSheet, Dimensions, FlatList, Alert } from 'react-native';
import { useConsumableWorkout } from '../../hooks/useConsumableWorkout';
import AnimatedExerciseCardContainer from '../../components/AnimatedExerciseCardContainer';
import UseWorkoutHeader from '../../components/UseWorkoutHeader';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import Block from '../../components/blocks/Block';
import ConsumableExerciseCard from '../../components/ConsumableExerciseCard';
import { updateConsumableWorkout } from '../../utils/db/consumableworkouts';

type UseWorkoutPageProps = NativeStackScreenProps<NavigatorParamList, 'UseWorkout'>;

const UseWorkoutPage: React.FC<UseWorkoutPageProps> = ({ navigation, route }) => {
  const { consumableWorkout } = useConsumableWorkout(route.params.consumableWorkoutId, true);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 90 });
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setVisibleIndex(viewableItems[0].index);
    }
  });
  const [cardView, setCardView] = useState(true);
  const flatlistRef = useRef<FlatList>(null);

  const renderCardItem = ({ item: exerciseName, index }) => {
    return (
      <AnimatedExerciseCardContainer visible={index === visibleIndex} className="bg-white">
        <ConsumableExerciseCard
          exerciseName={exerciseName}
          consumableWorkoutId={route.params.consumableWorkoutId}
        />
      </AnimatedExerciseCardContainer>
    );
  };

  const renderListItem = ({ item: exerciseName, index }) => {
    const goToCard = () => {
      setCardView(true);
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({ index, animated: true });
      }, 500);
    };

    // const numSets = exercise.exerciseItems.reduce((acc, item) => {
    //   return item.ref.reps !== undefined && item.ref.reps !== null ? acc + 1 : acc;
    // }, 0);

    return (
      <Animated.View entering={FadeInLeft.duration(200).delay(100 * index)} className="self-center">
        <Block
          title={exerciseName}
          // subtitle={`${numSets} set${numSets > 1 ? 's' : ''}`}
          icon="expand"
          onPress={goToCard}
          onOptionsPress={goToCard}
        />
      </Animated.View>
    );
  };

  const endWorkout = async () => {
    await updateConsumableWorkout({
      consumableWorkoutId: route.params.consumableWorkoutId,
      payload: {
        ended_at: new Date(),
      },
    });
    navigation.navigate('WorkoutSummary', {
      consumableWorkoutId: route.params.consumableWorkoutId,
    });
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
      {consumableWorkout && (
        <UseWorkoutHeader
          consumableWorkout={consumableWorkout}
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
          data={consumableWorkout.exercises}
          keyExtractor={(item) => item}
          renderItem={cardView ? renderCardItem : renderListItem}
          horizontal={cardView}
          snapToAlignment="end"
          viewabilityConfig={viewabilityConfig.current}
          onViewableItemsChanged={onViewableItemsChanged.current}
          decelerationRate={'fast'}
          className="w-full"
          style={styles.flatlist}
          pagingEnabled={true}
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
