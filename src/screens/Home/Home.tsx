import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import Ionicon from '@expo/vector-icons/Ionicons';
import CompletedWorkoutBlock from '../../components/blocks/CompletedWorkoutBlock';
import dummyData from '../../utils/DummyData.json';
import { Calendar } from 'react-native-calendars';

type HomeProps = NativeStackScreenProps<NavigatorParamList, 'Home'>;

const Home: React.FC<HomeProps> = () => {
  // render each workout for CompletedWorkoutBlock

  const renderWorkoutBlock = ({ item }) => {
    return <CompletedWorkoutBlock workout={item} />;
  };

  // checks if there's any completed workouts
  // iterates through workouts, checking for at least one "ended_at" attribute

  function existCompletedWorkouts() {
    if (dummyData.length == 0) {
      return false;
    }

    let existFlag = false;

    dummyData.map((currWorkout) => {
      if (currWorkout.ended_at) {
        existFlag = true;
      }
    });

    return existFlag;
  }

  // filters through workouts returning those that are completed
  // iterate through workouts and returning those with an "ended_at" attribute

  const completedWorkouts = useMemo(filterCompletedWorkouts, dummyData);

  function filterCompletedWorkouts() {
    return dummyData
      .filter((item) => item.ended_at != null)
      .sort((a, b) => b.ended_at.localeCompare(a.ended_at));
  }

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
      let date = completedWorkouts[i].ended_at;
      date = date.substring(0, 10);
      dates[date] = { marked: true };
    }

    // Add red circle to today's date
    const today = new Date();
    const todaysDate = today.toISOString().split('T')[0];
    dates[todaysDate] = { selected: true, selectedColor: '#EF4444' };

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

  return 
    <View className="h-full bg-white">
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
      ) : !existCompletedWorkouts() ? (
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

      <View className="flex-col items-center justify-center pt-10">
        <TouchableOpacity
          accessibilityRole="button"
          className="my-2 mt-0 w-60 items-center rounded-lg bg-red-500 p-2"
        >
          <Text className="text-center font-bebas text-2xl text-white">Start A Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
