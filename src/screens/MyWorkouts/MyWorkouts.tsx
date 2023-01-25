import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';

type MyWorkoutsProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkouts'>;

const MyWorkouts: React.FC<MyWorkoutsProps> = ({ navigation }) => {
  const navigateToEditWorkoutPage = () => {
    navigation.navigate('EditWorkoutPage');
  };
  return (
    <View className="flex h-full flex-col items-center justify-center">
      <Text>MyWorkouts</Text>
      <TouchableOpacity accessibilityRole="button" onPress={navigateToEditWorkoutPage}>
        <Text>Go To Edit Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyWorkouts;
