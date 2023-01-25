import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';

type ProfileProps = NativeStackScreenProps<NavigatorParamList, 'Profile'>;

const Profile: React.FC<ProfileProps> = () => {
  return (
    <View className="flex h-full flex-col items-center justify-center">
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
