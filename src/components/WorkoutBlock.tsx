import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import DoneButton from './DoneButton';
import Ionicon from '@expo/vector-icons/Ionicons';
import { EditableWorkout } from '../types/EditableWorkout';
import { deleteEditableWorkout } from '../hooks/useMyWorkouts';

interface WorkoutBlockProps {
  editing?: string;
  name: string;
  id: string;
  updateName: (payload: EditableWorkout) => Promise<void>;
  deleteName: (id:string)=>Promise<void>;
}

const WorkoutBlock: React.FC<WorkoutBlockProps> = ({ id, editing, name: propName, updateName,removeName }) => {
  const [name, setName] = useState<string>(propName);
  if (editing === id) {
    return (
      <View
        className="mt-1 flex flex-row rounded border border-slate-200 p-3"
        style={styles.container}
      >
        <TextInput
          accessibilityLabel="Text input field"
          accessibilityHint="rename workout"
          autoFocus={true}
          placeholder="Enter workout name"
          className="flex-1"
          value={name}
          onChangeText={setName}
        />
        <DoneButton onPress={() => updateName({ id, name })} />
      </View>
    );
  }

  return (
    <View
      className="mt-2 flex flex-row items-center rounded border border-slate-200"
      style={styles.container}
    >
      <TouchableOpacity accessibilityRole="button" className="h-full flex-1 p-2 pt-3 pb-3">
        <Text className="font-medium">{name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        className="flex h-full flex-row items-center justify-center p-2 pl-4"
      >
        
        <Ionicon onPress={()=> deleteName(id)} name="ellipsis-horizontal" size={16} />
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: (width / 12) * 11,
  },
});

export default WorkoutBlock;
