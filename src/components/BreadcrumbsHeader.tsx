import { RouteProp } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigatorParamList } from '../screens/DrawerNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useSelectedWorkout from '../hooks/useSelectedWorkout';

interface BreadcrumbsHeaderProps {
  navigation: NativeStackNavigationProp<NavigatorParamList, keyof NavigatorParamList, undefined>;
  route: RouteProp<NavigatorParamList, keyof NavigatorParamList>;
}

const BreadcrumbsHeader: React.FC<BreadcrumbsHeaderProps> = ({ route, navigation }) => {
  const [workout, exercise] = useSelectedWorkout((state) => [state.workout, state.exercise]);

  const MyWorkoutsLink = useMemo(() => {
    const shouldAbbreviateName = route.name === 'EditExercisePage';
    const text = shouldAbbreviateName ? '...' : 'My Workouts';
    return (
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => navigation.navigate('MyWorkouts')}
        hitSlop={{ top: 20, bottom: 20 }}
      >
        <Text className={route.name === 'MyWorkouts' ? 'text-sm' : 'text-sm underline'}>
          {text}
        </Text>
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
          hitSlop={{ top: 20, bottom: 20 }}
        >
          <Text className="text-sm underline">{workout?.name}</Text>
        </TouchableOpacity>
      </>
    );
  }, [route.name, workout]);

  const shouldRenderEditExercisePageLink = route.name === 'EditExercisePage';

  const EditExercisePageLink = useMemo(() => {
    return (
      <>
        <Text>
          {` `}/{` `}
        </Text>
        <Text className="text-sm">{exercise?.name}</Text>
      </>
    );
  }, [route.name, exercise]);

  return (
    <View className="flex flex-1 flex-row">
      {MyWorkoutsLink}
      {shouldRenderEditWorkoutPageLink && EditWorkoutPageLink}
      {shouldRenderEditExercisePageLink && EditExercisePageLink}
    </View>
  );
};

export default BreadcrumbsHeader;
