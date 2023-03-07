import { RouteProp } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigatorParamList } from '../../screens/DrawerNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface BreadcrumbsHeaderProps {
  navigation: NativeStackNavigationProp<
    Pick<NavigatorParamList, 'MyWorkouts' | 'EditWorkoutPage' | 'EditExercisePage'>,
    'MyWorkouts' | 'EditWorkoutPage' | 'EditExercisePage',
    undefined
  >;
  route: RouteProp<
    Pick<NavigatorParamList, 'MyWorkouts' | 'EditWorkoutPage' | 'EditExercisePage'>,
    'MyWorkouts' | 'EditWorkoutPage' | 'EditExercisePage'
  >;
}

const BreadcrumbsHeader: React.FC<BreadcrumbsHeaderProps> = ({ route, navigation }) => {
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
          onPress={() =>
            navigation.navigate('EditWorkoutPage', {
              editableWorkoutId: route.params?.editableWorkoutId || '',
              editableWorkoutName: route.params?.editableWorkoutName || '',
              exerciseName: '',
            })
          }
          hitSlop={{ top: 20, bottom: 20 }}
        >
          <Text className="text-sm underline">{route.params?.editableWorkoutName}</Text>
        </TouchableOpacity>
      </>
    );
  }, [route]);

  const shouldRenderEditExercisePageLink = route.name === 'EditExercisePage';

  const EditExercisePageLink = useMemo(() => {
    return (
      <>
        <Text>
          {` `}/{` `}
        </Text>
        <Text className="text-sm">{route.params?.exerciseName}</Text>
      </>
    );
  }, [route]);

  return (
    <View className="flex flex-1 flex-row">
      {MyWorkoutsLink}
      {shouldRenderEditWorkoutPageLink && EditWorkoutPageLink}
      {shouldRenderEditExercisePageLink && EditExercisePageLink}
    </View>
  );
};

export default BreadcrumbsHeader;
