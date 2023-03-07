import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useMyEditableWorkouts } from '../hooks/useMyEditableWorkouts';
import { useAuth } from '../contexts/AuthProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DrawerWorkoutBlock from './blocks/DrawerWorkoutBlocks';
import { Ionicons } from '@expo/vector-icons';
import { getUserProfile } from '../utils/db/profiles';
import { ProfileType } from '../types';

const CustomDrawer = () => {
  const navigation = useNavigation();
  const { session } = useAuth();
  const { editableWorkouts, fetch } = useMyEditableWorkouts(session);
  const [userData, setUserData] = React.useState<ProfileType>({});

  React.useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile(session);
      setUserData(data);
    };

    fetchProfile().catch(console.error);
  }, []);

  const refresh = () => {
    if (fetch != undefined) {
      fetch();
    }
    getUserProfile(session)
      .then((data) => {
        setUserData(data);
      })
      .catch(console.error);
  };

  return (
    <View className="h-full w-full">
      <LinearGradient className="mb-3 h-32" colors={['#888787', '#9A9A9A', '#FFFFFF']}>
        <View className="flex h-full w-full flex-row border-b-2 border-neutral-300">
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
                className="mt-4 ml-4 h-[70] w-[70] rounded-full"
              ></Image>
            </TouchableOpacity>
          </View>
          <View className="my-auto ml-2 flex flex-col">
            <Text className="mt-4 font-bebas text-lg text-neutral-700">{'John Doe'}</Text>
            <View className="flex flex-row justify-center gap-1">
              <Text className="font-bebas text-[10px]">{'150 lbs'}</Text>
              <MaterialCommunityIcons name="weight-lifter" size={14} color="black" />
            </View>
          </View>
          <View className="flex h-full flex-grow flex-row justify-end ">
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => {
                refresh();
              }}
              className="m-1 flex flex-col justify-end"
            >
              <Ionicons name="refresh" size={25} color="#888787" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View className="flex w-full flex-col px-4">
        <View className="w-[100] border-b-2 border-neutral-300">
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => {
              navigation.navigate('MyWorkoutsStack', {
                screen: 'MyWorkouts',
              });
            }}
          >
            <Text className=" font-bebas text-lg text-neutral-500">My Workouts</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {editableWorkouts.map((workout) => {
            return (
              <DrawerWorkoutBlock
                key={workout.id}
                editableWorkout={workout}
                editableWorkoutNavigate={(id, workoutName) => {
                  navigation.navigate('MyWorkoutsStack', {
                    screen: 'EditWorkoutPage',
                    params: {
                      editableWorkoutId: id,
                      editableWorkoutName: workoutName,
                      exerciseName: '',
                    },
                  });
                }}
                editableExerciseNavigate={(id, workoutName, exerciseName) => {
                  navigation.navigate('Tabs', {
                    screen: 'MyWorkoutsStack',
                    params: {
                      screen: 'EditExercisePage',
                      params: {
                        editableWorkoutId: id,
                        editableWorkoutName: workoutName,
                        exerciseName: exerciseName,
                      },
                    },
                  });
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default CustomDrawer;
