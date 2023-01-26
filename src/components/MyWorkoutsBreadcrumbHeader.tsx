import { RouteProp } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigatorParamList } from '../screens/DrawerNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useEditWorkout from '../hooks/useEditWorkout';

interface BreadcrumbHeaderProps {
  navigation: NativeStackNavigationProp<NavigatorParamList, keyof NavigatorParamList, undefined>;
  route: RouteProp<NavigatorParamList, keyof NavigatorParamList>;
}

const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({ route, navigation }) => {
  const [editWorkoutName] = useEditWorkout((state) => [state.name]);

  const MyWorkoutsLink = useMemo(() => {
    const shouldAbbreviateName = route.name === 'EditExercisePage';
    const text = shouldAbbreviateName ? 'My...' : 'My Workouts';
    return (
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => navigation.navigate('MyWorkouts')}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  }, [navigation, route.name]);

  const shouldRenderEditWorkoutPageLink = route.name !== 'MyWorkouts';

  const EditWorkoutPageLink = useMemo(() => {
    return (
      <>
        <Text>
          {` `}/{` `}
        </Text>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => navigation.navigate('EditWorkoutPage')}
        >
          <Text>{editWorkoutName}</Text>
        </TouchableOpacity>
      </>
    );
  }, [route.name, editWorkoutName]);

  const shouldRenderEditExercisePageLink = route.name === 'EditExercisePage';

  const EditExercisePageLink = useMemo(() => {
    return (
      <>
        <Text>
          {` `}/{` `}
        </Text>
        <Text>Edit Exercise</Text>
      </>
    );
  }, [route.name]);

  return (
    <View className="flex flex-1 flex-row">
      {MyWorkoutsLink}
      {shouldRenderEditWorkoutPageLink && EditWorkoutPageLink}
      {shouldRenderEditExercisePageLink && EditExercisePageLink}
    </View>
  );
};

export default BreadcrumbHeader;
