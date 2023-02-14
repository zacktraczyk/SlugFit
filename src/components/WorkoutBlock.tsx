import React, { SetStateAction, useState } from 'react';
import { TextInput } from 'react-native';
import DoneButton from './DoneButton';
import { EditableWorkout } from '../types';
import Block from './Block';
import { BlockContainer } from './BlockContainer';
import BlockActionsModal from './BlockActionsModal';

interface WorkoutBlockProps {
  editing?: string;
  setEditing: React.Dispatch<SetStateAction<string | undefined>>;
  workout: EditableWorkout;
  updateName: (payload: EditableWorkout) => Promise<void>;
  onPress: (w: EditableWorkout) => void;
  deleteWorkout: (id: string) => Promise<void>;
  duplicateWorkout: (id: string) => Promise<void>;
}

const WorkoutBlock: React.FC<WorkoutBlockProps> = ({
  editing,
  setEditing,
  workout,
  updateName,
  onPress,
  deleteWorkout,
  duplicateWorkout,
}) => {
  const [name, setName] = useState<string>(workout.name || '');
  const [modalVisible, setModalVisible] = useState(false);
  if (editing === workout.id) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <Block
        title={name}
        onPress={() => {
          onPress(workout);
        }}
        onOptionsPress={() => {
          setModalVisible(true);
        }}
      />

      {modalVisible && (
        <BlockActionsModal
          deleteWorkout={() => deleteWorkout(workout.id)}
          setModalVisible={(bool: boolean) => setModalVisible(bool)}
          renameWorkout={() => setEditing(workout.id)}
          duplicateWorkout={() => {
            duplicateWorkout(workout.id);
          }}
        />
      )}
    </>
  );
};

export default WorkoutBlock;
