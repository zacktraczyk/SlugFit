import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, FlatList, Platform, StyleSheet, View,Text, Dimensions} from 'react-native';
import { NavigatorParamList } from '../DrawerNavigator';
import AddButton from '../../components/AddButton';
import WorkoutBlock from '../../components/WorkoutBlock';
import { useAuth } from '../../contexts/AuthProvider';
import {
  createEditableWorkout,
  deleteEditableWorkout,
  updateEditableWorkout,
  useMyWorkouts,
} from '../../hooks/useMyWorkouts';
import  ModalPopup from '../../components/BlockActionsModal';
import Animated from 'react-native-reanimated';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Modal } from 'react-native';

export type MyWorkoutsProps = NativeStackScreenProps<NavigatorParamList, 'MyWorkouts'>;

const MyWorkouts: React.FC<MyWorkoutsProps> = () => {
  const { session } = useAuth();
  const { workouts, refresh: refreshWorkouts } = useMyWorkouts(session);
  const [editingWorkout, setEditingWorkout] = useState<string | undefined>(undefined);

  const addWorkoutBlock = async () => {
    const workout = await createEditableWorkout(session);
    if (workout) setEditingWorkout(workout.id);
    if (refreshWorkouts) await refreshWorkouts();
  };
  const deleteWorkoutBlock =async (id) =>{
    await deleteEditableWorkout(id);
    setEditingWorkout(undefined);
    if (refreshWorkouts) await refreshWorkouts();
  }
  const updateWorkout = async (payload) => {
    await updateEditableWorkout(payload);
    setEditingWorkout(undefined);
    if (refreshWorkouts) await refreshWorkouts();
  };


  const renderWorkoutBlock = ({ item }) => {
    return (
      <WorkoutBlock
        editing={editingWorkout}
        name={item.name}
        id={item.id}
        updateName={updateWorkout}
        deleteName={deleteWorkoutBlock}
      />
    );
  };

  return (
    
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex w-full flex-1 flex-col items-center justify-center bg-white"
    >
      
      <FlatList
        data={workouts}
        renderItem={renderWorkoutBlock}
        keyExtractor={(item) => item.id}
        className="w-full"
        contentContainerStyle={styles.flatList}
        keyboardShouldPersistTaps="always"
      />
      <AddButton onPress={addWorkoutBlock} />
      
      
      

     
    </KeyboardAvoidingView>
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

export default MyWorkouts;
