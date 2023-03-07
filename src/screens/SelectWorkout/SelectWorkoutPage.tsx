import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorParamList } from '../DrawerNavigator';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthProvider';
import Block from '../../components/blocks/Block';
import { EditableWorkout } from '../../types';
import { useMyEditableWorkouts } from '../../hooks/useMyEditableWorkouts';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';

type SelectWorkoutPageProps = NativeStackScreenProps<NavigatorParamList, 'SelectWorkout'>;

const SelectWorkoutPage: React.FC<SelectWorkoutPageProps> = ({ navigation }) => {
  const { session } = useAuth();
  const { editableWorkouts } = useMyEditableWorkouts(session);
  const [readyActiveWorkout, startActiveWorkout] = useActiveWorkout((state) => [
    state.ready,
    state.start,
  ]);
  const startWorkout = async (editableWorkout: EditableWorkout) => {
    if (!session) return;
    await readyActiveWorkout(editableWorkout.id, session?.user.id);
    startActiveWorkout();
    navigation.navigate('UseWorkout', { userId: session?.user.id });
  };

  const alertConfirmStart = (editableWorkout: EditableWorkout) => {
    Alert.alert('Start the workout?', editableWorkout.name, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          await startWorkout(editableWorkout);
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
        data={editableWorkouts}
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
