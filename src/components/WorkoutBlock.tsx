import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface WorkoutBlockProps {
  editing?: string;
  name: string;
  id: string;
}
const WorkoutBlock: React.FC<WorkoutBlockProps> = ({ id, editing, name }) => {
  if (editing === id) {
    return (
      <View>
        <Text>Editing {name}</Text>
        <TextInput
          accessibilityLabel="Text input field"
          accessibilityHint="rename workout"
          autoFocus={true}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Not editing {name} </Text>
    </View>
  );
};

export default WorkoutBlock;
