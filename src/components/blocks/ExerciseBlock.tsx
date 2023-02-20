import React from 'react';
import ExerciseSearchBar from '../ExerciseSearchBar';
import Block from './Block';

interface ExerciseCardProps {
  exerciseName: string;
  update: (toExerciseName: string) => void;
  onPress: (exerciseName: string) => void;
}

const ExerciseBlock: React.FC<ExerciseCardProps> = ({ exerciseName, update, onPress }) => {
  if (exerciseName === '') {
    return (
      <ExerciseSearchBar
        onSelectExercise={(newName) => {
          update(newName);
        }}
      />
    );
  }

  return (
    <Block
      title={exerciseName}
      onPress={() => {
        onPress(exerciseName);
      }}
    />
  );
};

export default ExerciseBlock;
