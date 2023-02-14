import React, { useState } from 'react';
import ExerciseSearchBar from './ExerciseSearchBar';
import { Exercise } from '../types';
import Block from './Block';
import BlockActionsModal from './BlockActionsModal';

interface ExerciseCardProps {
  editing: string | undefined;
  exercise: Exercise;
  updateExercise: (id: string, e: Exercise) => void;
  deleteExercise: (exerciseName: string) => Promise<void>;
  onPress: (w: Exercise) => void;
}

const ExerciseBlock: React.FC<ExerciseCardProps> = ({
  editing,
  exercise,
  updateExercise,
  deleteExercise,
  onPress,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  if (editing === exercise.name) {
    return (
      <ExerciseSearchBar
        onSelectExercise={(newName) => {
          updateExercise(exercise.name, {
            ...exercise,
            name: newName,
          });
        }}
      />
    );
  }
  return (
    <>
      <Block
        title={exercise.name}
        onPress={() => {
          onPress(exercise);
        }}
        onOptionsPress={() => {
          setModalVisible(true);
        }}
      />
      {modalVisible && (
        <BlockActionsModal
          deleteBlock={() => deleteExercise(exercise.name)}
          setModalVisible={(bool: boolean) => setModalVisible(bool)}
        />
      )}
    </>
  );
};

export default ExerciseBlock;
