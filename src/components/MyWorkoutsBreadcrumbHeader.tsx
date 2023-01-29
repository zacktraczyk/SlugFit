import { RouteProp } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigatorParamList } from '../screens/DrawerNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useMyWorkoutsBreadcrumbNavigation from '../hooks/useMyWorkoutsBreadcrumbNavigation';

interface BreadcrumbHeaderProps {
  navigation: NativeStackNavigationProp<NavigatorParamList, keyof NavigatorParamList, undefined>;
  route: RouteProp<NavigatorParamList, keyof NavigatorParamList>;
}

const MyWorkoutsBreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({ route, navigation }) => {
  const [workoutName, exerciseName] = useMyWorkoutsBreadcrumbNavigation((state) => [
    state.workoutName,
    state.exerciseName,
  ]);

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
          <Text>{workoutName}</Text>
        </TouchableOpacity>
      </>
    );
  }, [route.name, workoutName]);

  const shouldRenderEditExercisePageLink = route.name === 'EditExercisePage';

  const EditExercisePageLink = useMemo(() => {
    return (
      <>
        <Text>
          {` `}/{` `}
        </Text>
        <Text>{exerciseName}</Text>
      </>
    );
  }, [route.name, exerciseName]);

  return (
    <View className="flex flex-1 flex-row">
      {MyWorkoutsLink}
      {shouldRenderEditWorkoutPageLink && EditWorkoutPageLink}
      {shouldRenderEditExercisePageLink && EditExercisePageLink}
    </View>
  );
};

export default MyWorkoutsBreadcrumbHeader;
