import React from 'react';
import ExerciseSearchBar from '../ExerciseSearchBar';
import { Exercise } from '../../types';
import Block from './Block';

interface ExerciseCardProps {
  editing: string | undefined;
  exercise: Exercise;
  update: (id: string, e: Exercise) => void;
  onPress: (w: Exercise) => void;
}

const ExerciseBlock: React.FC<ExerciseCardProps> = ({ editing, exercise, update, onPress }) => {
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
    <Block
      title={exercise.name}
      onPress={() => {
        onPress(exercise);
      }}
    />
  );
};

export default ExerciseBlock;
