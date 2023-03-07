import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useMyEditableWorkouts } from '../hooks/useMyEditableWorkouts';
import { useAuth } from '../contexts/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomDrawer = () => {
  const navigation = useNavigation();
  const { session } = useAuth();
  const {
    editableWorkouts,
    loading,
    fetch: fetchEditableWorkouts,
  } = useMyEditableWorkouts(session);

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
                source={require('../assets/genericProfilePic.jpg')}
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
        {/**Starts here */}
        <View className="flex flex-col my-2">

          <TouchableOpacity className="flex h-[50] w-full flex-row rounded-lg bg-neutral-300 px-2">
            <View className="my-auto">
              <Ionicons name="caret-down" size={16} color="#323232" className="my-auto" />
            </View>
            <Text className="my-auto font-bebas text-[16px] text-neutral-700 ml-1">{'Back and Bis'}</Text>
          </TouchableOpacity>

          <View className="flex w-full flex-col border-x border-b rounded-b-lg border-neutral-300 px-8">
            <TouchableOpacity className="flex flex-row h-[50]">
              <View className="my-auto">
                <MaterialCommunityIcons name="circle" size={6} color="black" />
              </View>
              <Text className="my-auto font-bebas text-[14px] text-neutral-700 ml-1">{'Back and Bis'}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row h-[50]">
              <View className="my-auto">
                <MaterialCommunityIcons name="circle" size={6} color="black" />
              </View>
              <Text className="my-auto font-bebas text-[14px] text-neutral-700 ml-1">{'Back and Bis'}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row h-[50]">
              <View className="my-auto">
                <MaterialCommunityIcons name="circle" size={6} color="black" />
              </View>
              <Text className="my-auto font-bebas text-[14px] text-neutral-700 ml-1">{'Back and Bis'}</Text>
            </TouchableOpacity>
            
            
            
            
          </View>
        </View>
        {/**ends here */}
        {/**Starts here */}
        <View className="flex h-[50] w-full flex-row rounded-lg bg-neutral-300 px-2 my-2">
          <View className="my-auto">
            <Ionicons name="caret-down" size={16} color="#323232" className="my-auto" />
          </View>
          <Text className="my-auto font-bebas text-[16px] text-neutral-700 ml-1">{'Legs'}</Text>
        </View>
        {/**ends here */}
      </View>
    </View>
  );
};
/**
 * For navigating to a workout
 * onPress={() => {
              navigation.navigate('MyWorkoutsStack', {
                screen: 'EditWorkoutPage',
                params: {
                  editableWorkoutId: editableWorkouts[0].id,
                  editableWorkoutName: editableWorkouts[0].name,
                  exerciseName: '',
                },
              });
            }}


  onPress={() => {
              navigation.navigate('MyWorkoutsStack', {
                screen: 'EditWorkoutPage',
                params: {
                  editableWorkoutId: editableWorkouts[0].id,
                  editableWorkoutName: editableWorkouts[0].name,
                  exerciseName: 'editableWorkouts[0].exercises[0]',
                },
              });
            }}
 */

export default CustomDrawer;
