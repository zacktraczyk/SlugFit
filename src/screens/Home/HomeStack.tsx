import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../DrawerNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Home from './Home';
import SelectWorkoutPage from '../SelectWorkout/SelectWorkoutPage';
import BackButton from '../../components/buttons/BackButton';
import WorkoutSummary from '../WorkoutSummary';
import DiscardButton from '../../components/buttons/DiscardButton';
import SaveButton from '../../components/buttons/SaveButton';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import ToggleDrawerButton from '../../components/buttons/ToggleDrawerButton';

type HomeStackProps = NativeStackScreenProps<NavigatorParamList, 'HomeStack'>;

const Stack = createNativeStackNavigator<NavigatorParamList>();

const HomeStack: React.FC<HomeStackProps> = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => (
            <ToggleDrawerButton
              toggleDrawer={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
          headerTitle: () => (
            <Image
              className="ml-2 h-16 w-16 self-center"
              source={require('../../assets/Slugfit.png')}
              accessibilityIgnoresInvertColors
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              accessibilityRole="button"
              className="flex flex-row items-center justify-center rounded bg-red-500 p-1"
              onPress={() => {
                navigation.navigate('SelectWorkout');
              }}
            >
              <MaterialIcon name="add" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SelectWorkout"
        component={SelectWorkoutPage}
        options={({ navigation }) => ({
          headerLeft: () => (
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerTitle: () => (
            <Text className="text-center text-sm font-medium">Start a Workout</Text>
          ),
        })}
      />
      <Stack.Screen
        name="WorkoutSummary"
        component={WorkoutSummary}
        options={({ navigation, route }) => ({
          headerLeft: () =>
            route.params.consumableWorkoutId ? (
              <BackButton onPress={navigation.goBack} />
            ) : (
              <DiscardButton
                goHome={() => {
                  navigation.navigate('Home');
                }}
              />
            ),
          headerRight: () =>
            route.params.consumableWorkoutId ? null : (
              <SaveButton
                goHome={() => {
                  navigation.navigate('Home');
                }}
              />
            ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
