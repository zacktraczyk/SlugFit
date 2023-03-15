/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMyEditableWorkouts } from '../hooks/useMyEditableWorkouts';
import { useAuth } from '../contexts/AuthProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DrawerWorkoutBlock from './blocks/DrawerWorkoutBlocks';
import { Ionicons } from '@expo/vector-icons';
import { getUserProfile } from '../utils/db/profiles';
import { ProfileType } from '../types';
import { NavigatorParamList } from '../screens/DrawerNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const CustomDrawer = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigatorParamList, 'MyWorkouts', undefined>>();
  const { session } = useAuth();
  const { editableWorkouts, fetch } = useMyEditableWorkouts(session);
  const [userData, setUserData] = React.useState<ProfileType>({});

  //loads user profile data
  React.useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return;
      const data = await getUserProfile(session?.user.id);
      setUserData(data);
    };

    fetchProfile().catch(console.error);
  }, []);

  /**
   * on refresh, fetches profile data
   * + editable workouts and rerenders
   */
  const refresh = () => {
    if (fetch != undefined) {
      fetch();
    }
    if (!session) return;
    getUserProfile(session?.user.id)
      .then((data) => {
        setUserData(data);
      })
      .catch(console.error);
  };

  return (
    <View className="h-full w-full">
      {/**Banner + Profile Block */}
      <View className="mb-3 h-32 bg-neutral-300">
        <View className="flex h-full w-full flex-row border-b-4 border-neutral-100">
          <View className="my-auto">
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => {
                navigation.navigate('Profile');
              }}
            >
              <Image
                source={
                  userData.avatar_url
                    ? {
                        uri:
                          'https://veorawmuwkuyzbxadxgv.supabase.co/storage/v1/object/public/avatars/' +
                          session?.user.id +
                          '/' +
                          userData.avatar_url,
                      }
                    : require('../assets/genericProfilePic.jpg')
                }
                className="mt-4 ml-4 h-[60] w-[60] rounded-full"
              ></Image>
            </TouchableOpacity>
          </View>
          <View className="my-auto ml-2 flex flex-col">
            <Text className="mt-4 font-bebas text-lg text-neutral-700">
              {userData.full_name ? userData.full_name : 'NO NAME'}
            </Text>
            <View className="flex flex-row gap-1">
              <Text className="font-bebas ">{userData.bodyweight + ' lbs'}</Text>
              <MaterialCommunityIcons name="weight-lifter" size={16} color="black" />
            </View>
          </View>
          <View className="flex h-full flex-grow flex-row justify-end ">
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => {
                refresh();
              }}
              className="m-3 flex flex-col justify-end"
            >
              <Ionicons name="refresh" size={20} color="#888787" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/**END OF BANNER + PROF BLOCK */}
      {/** WORKOUT + EXERCISE BLOCKS */}
      <View className="flex w-full flex-col px-4">
        <View className="w-[100] border-b-2 border-neutral-300">
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => {
              navigation.navigate('MyWorkoutsStack');
            }}
          >
            <Text className=" font-bebas text-lg text-neutral-500">My Workouts</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {editableWorkouts?.map((workout) => {
            return (
              <DrawerWorkoutBlock
                key={workout.id}
                editableWorkout={workout}
                editableWorkoutNavigate={(id, workoutName) => {
                  navigation.navigate('EditWorkoutPage', {
                    editableWorkoutId: id,
                    editableWorkoutName: workoutName,
                    exerciseName: '',
                  });
                }}
                editableExerciseNavigate={(id, workoutName, exercise) => {
                  navigation.navigate('EditExercisePage', {
                    editableWorkoutId: id,
                    editableWorkoutName: workoutName,
                    exerciseName: exercise,
                  });
                }}
              />
            );
          })}
        </ScrollView>
      </View>
      {/**END OF BANNER + PROF BLOCKS */}
    </View>
  );
};

export default CustomDrawer;

{
  /**

*/
}
