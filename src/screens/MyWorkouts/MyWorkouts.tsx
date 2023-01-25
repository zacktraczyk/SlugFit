import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';

type MyWorkoutsProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkouts'>;

const MyWorkouts: React.FC<MyWorkoutsProps> = () => {
  return (
    <View className="flex h-full flex-col items-center justify-center">
      <Text>MyWorkouts</Text>
    </View>
  );
};

export default MyWorkouts;
