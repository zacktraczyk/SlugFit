import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ExerciseSearchBar from './ExerciseSearchBar';
import { Exercise } from '../types/Exercise';
import { BlockContainer } from './BlockContainer';
import Ionicon from '@expo/vector-icons/Ionicons';

interface ExerciseBlockProps {
  editing: string | undefined;
  exercise: Exercise;
  update: (id: string, e: Exercise) => void;
  onPress: (w: Exercise) => void;
}

const ExerciseBlock: React.FC<ExerciseBlockProps> = ({ editing, exercise, update, onPress }) => {
  if (editing === exercise.name) {
    return (
      <ExerciseSearchBar
        onSelectExercise={(newName) => {
          update(exercise.name, {
            ...exercise,
            name: newName,
          });
        }}
      />
    );
  }
  return (
    <BlockContainer>
      <TouchableOpacity
        accessibilityRole="button"
        className="h-full flex-1 p-2 pt-3 pb-3"
        onPress={() => {
          onPress(exercise);
        }}
      >
        <Text className="font-medium">{exercise.name}</Text>
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

export default ExerciseBlock;
