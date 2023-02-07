/* eslint-disable prettier/prettier */
import React, { SetStateAction, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import DoneButton from './DoneButton';
import Ionicon from '@expo/vector-icons/Ionicons';
import { EditableWorkout } from '../types/EditableWorkout';
import BlockActionsModal from './BlockActionsModal';
import { BlockContainer } from './BlockContainer';

interface WorkoutBlockProps {
  editing?: string;
  setEditing: React.Dispatch<SetStateAction<string | undefined>>;
  workout: EditableWorkout;
  updateName: (payload: EditableWorkout) => Promise<void>;
  onPress: (w: EditableWorkout) => void;
  deleteWorkout: (id: string) => Promise<void>;
  
}

const WorkoutBlock: React.FC<WorkoutBlockProps> = ({
  editing,
  setEditing,
  workout,
  updateName,
  onPress,
  deleteWorkout,
}) => {
  const [name, setName] = useState<string>(workout.name || '');
  const [modalVisible, setModalVisible] = useState(false);
  
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
    <BlockContainer>
      <TouchableOpacity
        accessibilityRole="button"
        className="flex h-full flex-1 flex-row items-center p-1"
        onPress={() => onPress(workout)}
        hitSlop={{ top: 20, bottom: 20, left: 20 }}
      >
        <Text className="text-base font-medium">{name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        className="flex h-full flex-row items-center justify-center p-1"
        hitSlop={{ top: 20, bottom: 20, right: 20 }}
      >
        <Ionicon onPress={() => setModalVisible(true)} name="ellipsis-horizontal" size={16} />
        <View>
          {modalVisible && (
            <BlockActionsModal
              deleteWorkout={() => deleteWorkout(workout.id)}
              setModalVisible={(bool: boolean) => setModalVisible(bool)}
              renameWorkout={() => setEditing(workout.id)}
            />
          )}
        </View>
      </TouchableOpacity>
    </BlockContainer>
  );
};

export default WorkoutBlock;


