import React, { useState } from 'react';
import { TextInput } from 'react-native';
import DoneButton from './DoneButton';
import { EditableWorkout } from '../types';
import Block from './Block';
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
      </BlockContainer>
    );
  }

  return (
    <Block
      title={name}
      onPress={() => {
        onPress(workout);
      }}
    />
  );
};

export default WorkoutBlock;
