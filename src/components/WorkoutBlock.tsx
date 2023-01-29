import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DoneButton from './DoneButton';
import Ionicon from '@expo/vector-icons/Ionicons';
import { EditableWorkout } from '../types/EditableWorkout';
import { BlockContainer } from './BlockContainer';

interface WorkoutBlockProps {
  editing?: string;
  workout: EditableWorkout;
  updateName: (payload: EditableWorkout) => Promise<void>;
  onPress: (w: EditableWorkout) => void;
}

const WorkoutBlock: React.FC<WorkoutBlockProps> = ({ editing, workout, updateName, onPress }) => {
  const [name, setName] = useState<string>(workout.name || '');
  if (editing === workout.id) {
    return (
      <BlockContainer>
        <View className="flex h-full w-full flex-row p-2">
          <TextInput
            accessibilityLabel="Text input field"
            accessibilityHint="rename workout"
            autoFocus={true}
            placeholder="Enter workout name"
            className="flex-1"
            value={name}
            onChangeText={setName}
          />
          <DoneButton onPress={() => updateName({ ...workout, name })} />
        </View>
      </BlockContainer>
    );
  }

  return (
    <BlockContainer>
      <TouchableOpacity
        accessibilityRole="button"
        className="h-full flex-1 p-2 pt-3 pb-3"
        onPress={() => onPress(workout)}
      >
        <Text className="font-medium">{name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        className="flex h-full flex-row items-center justify-center p-2 pl-4"
      >
        <Ionicon name="ellipsis-horizontal" size={16} />
      </TouchableOpacity>
    </BlockContainer>
  );
};

export default WorkoutBlock;
