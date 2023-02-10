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
}

const SetCard: React.FC<SetCardProps> = ({ reps, setReps, rpe, setRpe, orm, setOrm }) => {
  return (
    <Card title="Set">
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
    </Card>
  );
};

export default SetCard;
