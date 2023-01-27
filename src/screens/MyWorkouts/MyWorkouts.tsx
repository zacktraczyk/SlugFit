import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View , Text} from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useEditableWorkout from '../../hooks/useEditableWorkout';

type MyWorkoutsProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkouts'>;

const MyWorkouts: React.FC<MyWorkoutsProps> = ({ navigation }) => {
  const [setEditableWorkoutName] = useEditableWorkout((state) => [state.setName]);
  const navigateToEditWorkoutPage = () => {
    setEditableWorkoutName('Back and Bis');
    navigation.navigate('EditWorkoutPage');
  };
  return (
    <View className="flex h-full flex-col items-center justify-center">
      <TouchableOpacity accessibilityRole="button" onPress={navigateToEditWorkoutPage}>
        <Text>Go To Edit Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyWorkouts;
