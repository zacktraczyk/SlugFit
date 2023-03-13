import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  ListRenderItem,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import Ionicon from '@expo/vector-icons/Ionicons';
import CompletedWorkoutBlock from '../../components/blocks/CompletedWorkoutBlock';
import { Calendar } from 'react-native-calendars';
import { useMyConsumableWorkouts } from '../../hooks/useMyConsumableWorkouts';
import { useAuth } from '../../contexts/AuthProvider';
import { ConsumableWorkout } from '../../types';
import { formatDateToISO } from '../../utils/parsing';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorScreen from '../../components/ErrorScreen';
import FriendSearchBar from '../../components/FriendSeachBar';
import { useFriendsFeed } from '../../hooks/useFriendsFeed';
import { FriendsPost } from '../../components/FriendsPost';

type HomeProps = NativeStackScreenProps<NavigatorParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { session } = useAuth();
  const { posts: friendsPosts, fetch: fetchFriendsPosts } = useFriendsFeed(session?.user.id);
  const { consumableWorkouts, loading, fetch: fetchMyWorkouts } = useMyConsumableWorkouts(session);
  const [completedWorkouts, setCompletedWorkouts] = useState<ConsumableWorkout[]>([]);

  useEffect(() => {
    setCompletedWorkouts(
      consumableWorkouts?.filter((workout) => workout.ended_at !== undefined) || []
    );
  }, [consumableWorkouts]);

  // render each workout for CompletedWorkoutBlock
  const renderWorkoutBlock: ListRenderItem<ConsumableWorkout> = ({ item }) => {
    return (
      <CompletedWorkoutBlock
        consumableWorkout={item}
        onPress={() => {
          navigation.navigate('WorkoutSummary', { consumableWorkoutId: item.id });
        }}
      />
    );
  };

  // toggle variable "showCalendar", switching between CompletedWorkouts and Calendar
  const [showCalendar, setToggle] = useState(false);
  const toggleFunction = () => {
    setToggle(!showCalendar);
  };

  // Render user's "completed workouts" calender
  const renderWorkoutCalender = () => {
    const dates = {};

    // mark all dates in data
    for (let i = 0; i < completedWorkouts.length; i += 1) {
      const workout = completedWorkouts[i];
      if (workout.ended_at) {
        const date = formatDateToISO(workout.ended_at);
        dates[date] = { marked: true };
      }
    }

    // Add red circle to today's date
    const today = new Date();
    const todaysDate = formatDateToISO(today);

    if (todaysDate in dates) {
      dates[todaysDate] = { selected: true, selectedColor: '#EF4444', marked: true };
    } else {
      dates[todaysDate] = { selected: true, selectedColor: '#EF4444' };
    }

    return (
      <Calendar
        style={{ width: 350, height: 350 }}
        theme={{
          dotColor: 'gray',
          dotStyle: { size: 30 },
          arrowColor: 'gray',
          todayTextColor: 'gray',
          selectedDayBackgroundColor: '#EF4444',
        }}
        markedDates={dates}
      ></Calendar>
    );
  };

  const refresh = () => {
    if (fetchMyWorkouts) fetchMyWorkouts();
    if (fetchFriendsPosts) fetchFriendsPosts();
  };

  const renderFriendsPost = useCallback(({ item }: { item: ConsumableWorkout }) => {
    return (
      <FriendsPost
        post={item}
        onPress={() => {
          navigation.navigate('WorkoutSummary', {
            consumableWorkoutId: item.id,
            userId: item.created_by,
          });
        }}
      />
    );
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <FlatList
        className="h-full bg-white"
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
        data={friendsPosts}
        keyExtractor={(post) => post.id}
        renderItem={renderFriendsPost}
        ItemSeparatorComponent={() => <View className="h-5"></View>}
        ListHeaderComponent={
          <>
            <View className="flex-row justify-between px-3 pt-3.5">
              <Text className="pt-1 font-bebas text-base">Completed Workouts</Text>
              <TouchableOpacity accessibilityRole="button" onPress={() => toggleFunction()}>
                <Ionicon name={'calendar-sharp'} size={24} color={'#323232'} />
              </TouchableOpacity>
            </View>
            {showCalendar ? (
              <View className="items-center">
                <Text>{renderWorkoutCalender()}</Text>
              </View>
            ) : completedWorkouts.length === 0 ? (
              <View className="items-center pt-3.5 pb-6">
                <Text className="font-bebas text-xl text-gray-400">No completed workouts.</Text>
              </View>
            ) : (
              <FlatList
                data={completedWorkouts}
                renderItem={renderWorkoutBlock}
                keyExtractor={(item) => item.id}
                horizontal={true}
                keyboardShouldPersistTaps="always"
                className="flex-none pt-3.5 pb-6"
              />
            )}
            <View className="py-10">
                <FriendSearchBar />
              </View>
          </>
        }
      />
    </ErrorBoundary>
  );
};

export default Home;
