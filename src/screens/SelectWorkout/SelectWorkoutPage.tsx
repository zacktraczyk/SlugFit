import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../DrawerNavigator';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { useMyWorkouts } from '../../hooks/useMyWorkouts';
import { useAuth } from '../../contexts/AuthProvider';
import Block from '../../components/Block';
import { EditableWorkout } from '../../types';
import { createConsumableWorkout } from '../../utils/workouts';

type SelectWorkoutPageProps = NativeStackScreenProps<NavigatorParamList, 'SelectWorkout'>;

const SelectWorkoutPage: React.FC<SelectWorkoutPageProps> = ({ navigation }) => {
  const { session } = useAuth();
  const { workouts } = useMyWorkouts(session);

  const startWorkout = async (workout: EditableWorkout) => {
    const { id } = await createConsumableWorkout(session, workout.id);
    navigation.navigate('UseWorkout', { workoutId: id });
  };

  const alertConfirmStart = (workout: EditableWorkout) => {
    Alert.alert('Start the workout?', workout.name, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          await startWorkout(workout);
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const start = () => alertConfirmStart(item);
    return (
      <Block title={item.name} icon="chevron-forward" onPress={start} onOptionsPress={start} />
    );
  };

  return (
    <View className="flex w-full flex-1 flex-col items-center justify-center bg-white">
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        className="w-full"
        contentContainerStyle={styles.flatList}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default SelectWorkoutPage;
