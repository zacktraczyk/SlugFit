import React from 'react';
import { TextInput } from 'react-native';
import Card from './Card';

interface SetCardProps {
  reps: string;
  setReps: (val: string) => void;
  rpe: string;
  setRpe: (val: string) => void;
  orm: string;
  setOrm: (val: string) => void;
  id: number;
  deleteCard: (id) => void;
  duplicateCard: (id) => void;
}

const SetCard: React.FC<SetCardProps> = ({
  reps,
  setReps,
  rpe,
  setRpe,
  orm,
  setOrm,
  ...cardProps
}) => {
  return (
    <Card title="Set" {...cardProps}>
      <TextInput
        accessibilityLabel="Text input Input"
        accessibilityHint="Input to change reps in set"
        className="w-[60px] rounded border p-1"
        placeholder="Reps"
        returnKeyType="next"
        value={reps}
        onChangeText={setReps}
      />
      <TextInput
        accessibilityLabel="Text input Input"
        accessibilityHint="Input to change rpe in set"
        className="w-[60px] rounded border p-1"
        returnKeyType="next"
        placeholder="RPE"
        value={rpe}
        onChangeText={setRpe}
      />
      <TextInput
        accessibilityLabel="Text input Input"
        accessibilityHint="Input to change orm in set"
        className="w-[60px] rounded border p-1"
        returnKeyType="next"
        placeholder="%1RM"
        value={orm}
        onChangeText={setOrm}
      />
      {/* <Text className="text-red-500">
        {errors.email &&
          (errors.email.type === 'required' ? 'This field is required.' : 'Not a valid email.')}
      </Text> */}
    </Card>
  );
};

export default SetCard;
