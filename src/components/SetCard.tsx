import React from 'react';
import { TextInput } from 'react-native';
import Card from './Card';

interface SetCardProps {
  reps: string;
  setReps: (val: string) => void;
  pre: string;
  setPre: (val: string) => void;
  orm: string;
  setOrm: (val: string) => void;
}

const SetCard: React.FC<SetCardProps> = ({ reps, setReps, pre, setPre, orm, setOrm }) => {
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
        accessibilityHint="Input to change pre in set"
        className="w-[60px] rounded border p-1"
        returnKeyType="next"
        placeholder="PRE"
        value={pre}
        onChangeText={setPre}
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
