import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';

type EditExercisePageProps = NativeStackScreenProps<NavigatorParamList, 'EditExercisePage'>;

const EditExercisePage: React.FC<EditExercisePageProps> = () => {
  return <View className="flex h-full flex-col items-center justify-center"></View>;
};

export default EditExercisePage;
