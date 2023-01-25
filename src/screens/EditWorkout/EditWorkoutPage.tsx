import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';

type EditWorkoutPageProps = NativeStackScreenProps<NavigatorParamList, 'EditWorkoutPage'>;

const EditWorkoutPage: React.FC<EditWorkoutPageProps> = ({ navigation }) => {
  const navigateToEditExercisePage = () => {
    navigation.navigate('EditExercisePage');
  };
  return (
    <View className="flex h-full flex-col items-center justify-center">
      <TouchableOpacity accessibilityRole="button" onPress={navigateToEditExercisePage}>
        <Text>Go to Edit Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditWorkoutPage;
