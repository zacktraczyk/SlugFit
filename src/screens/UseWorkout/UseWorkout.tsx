import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../DrawerNavigator';
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView, Alert } from 'react-native';
import { useConsumableWorkout } from '../../hooks/useConsumableWorkout';
import { ConsumableExercise } from '../../types';
import AnimatedExerciseCardContainer from '../../components/AnimatedExerciseCardContainer';
import UseWorkoutHeader from '../../components/UseWorkoutHeader';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import Block from '../../components/Block';
import { updateConsumableWorkout } from '../../utils/workouts';

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
      setVisibleItem(undefined);
    }
  });
  const [cardView, setCardView] = useState(true);
  const flatlistRef = useRef<FlatList>(null);

  const renderCardItem = ({ item }) => {
    return (
      <AnimatedExerciseCardContainer visible={item === visibleItem} className="bg-white">
        {/**
         * TODO: Put Paul's card component here instead and pass in the props from item
         */}
        <ScrollView>
          <Text>{item.name}</Text>
        </ScrollView>
      </AnimatedExerciseCardContainer>
    );
  };

  const renderListItem = ({ item, index }) => {
    const goToCard = () => {
      setCardView(true);
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({ index, animated: false });
      }, 100);
    };

    return (
      <Animated.View entering={FadeInLeft.duration(200).delay(100 * index)} className="self-center">
        <Block
          title={item.name}
          subtitle={`${item.sets.length} set${item.sets.length > 1 ? 's' : ''}`}
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
          snapToAlignment="center"
          viewabilityConfig={viewabilityConfig.current}
          onViewableItemsChanged={onViewableItemsChanged.current}
          pagingEnabled={true}
          decelerationRate={'fast'}
          className="w-full"
          style={styles.flatlist}
          showsHorizontalScrollIndicator={false}
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
