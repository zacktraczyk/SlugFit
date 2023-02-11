import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthProvider';
import { supabase } from '../../utils/supabaseClient';
import { useUserData } from '../../hooks/useUserData';
import { NavigatorParamList } from '../DrawerNavigator';
import Ionicon from '@expo/vector-icons/Ionicons';
import CompletedWorkoutBlock from '../../components/CompletedWorkoutBlock';
import dummyData from '../../utils/DummyData.json';

type HomeProps = NativeStackScreenProps<NavigatorParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { session } = useAuth();
  const [name, setName] = useState('');
  const { userData, loading } = useUserData(session);

  // render each workout for CompletedWorkoutBlock

  const renderWorkoutBlock = ({ item }) => {
    return <CompletedWorkoutBlock workout={item} />;
  };

  useEffect(() => {
    if (userData?.username) setName(userData.username);
    else setName('');
  }, [userData]);

  // checks if there's any completed workouts
  // iterates through workouts, checking for at least one "ended_at" attribute

  function existCompletedWorkouts() {
    if (dummyData.length == 0) {
      return false;
    }

    dummyData.map((currWorkout) => {
      if (currWorkout.ended_at) {
        return true;
      }
    });

    return false;
  }

  return (
    <View className="flex h-full bg-white">
      <View>
        <View className="flex-row justify-between px-3 pt-3.5">
          <Text className="pt-1 font-bebas text-base">Completed Workouts</Text>

          <TouchableOpacity accessibilityRole="button">
            <Ionicon name={'calendar-sharp'} size={24} color={'#323232'} />
          </TouchableOpacity>
        </View>

        {existCompletedWorkouts() ? (
          <View className="items-center pt-3.5 pb-6">
            <Text className="font-bebas text-xl text-gray-400">No completed workouts.</Text>
          </View>
        ) : (
          <FlatList
            data={dummyData
              .filter((item) => item.ended_at != null)
              .sort((a, b) => b.ended_at.localeCompare(a.ended_at))}
            renderItem={renderWorkoutBlock}
            keyExtractor={(item) => item.id}
            horizontal={true}
            keyboardShouldPersistTaps="always"
            className="pt-3.5 pb-6"
          />
        )}
      </View>

      <View className="flex-col items-center justify-center pt-12">
        <TouchableOpacity
          accessibilityRole="button"
          className="my-2 mt-0 w-60 rounded-lg bg-red-500 p-2"
        >
          <Text className="text-center font-bebas text-2xl text-white">Start A Workout</Text>
        </TouchableOpacity>

        <View className="h-10"></View>

        <Text>Home Page yay</Text>
        {loading ? <ActivityIndicator /> : <Text>Welcome {name}!</Text>}
        <Text>Yipee</Text>
        <View className="h-10"></View>
        <View className="flex flex-row">
          <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
          <View className="w-5"></View>
          <Button title="Account" onPress={() => navigation.navigate('AccountSettings')} />
        </View>
      </View>
    </View>
  );
};

export default Home;
