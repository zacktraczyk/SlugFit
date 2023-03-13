import React, { useState } from 'react';
import ExerciseSearchBar from '../ExerciseSearchBar';
import Block from './Block';
import BlockActionsModal from '../modals/BlockActionsModal';

interface ExerciseCardProps {
  exerciseName: string;
  update: (toExerciseName: string) => void;
  onPress: (exerciseName: string) => void;
  deleteExerciseBlock: (exerciseName: string) => Promise<void>;
}

const ExerciseBlock: React.FC<ExerciseCardProps> = ({
  exerciseName,
  update,
  onPress,
  deleteExerciseBlock,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
    <>
      <Block
        title={exerciseName}
        onPress={() => {
          onPress(exerciseName);
        }}
        onOptionsPress={() => {
          setModalVisible(true);
        }}
      />
      {modalVisible && (
        <BlockActionsModal
          deleteBlock={() => deleteExerciseBlock(exerciseName)}
          setModalVisible={(bool: boolean) => setModalVisible(bool)}
        />
      )}
    </>
  );
};

export default ExerciseBlock;
