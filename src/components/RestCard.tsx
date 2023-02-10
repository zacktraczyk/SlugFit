import React from 'react';
import { TextInput } from 'react-native';
import Card from './Card';

interface RestCardProps {
  minutes: string;
  setMinutes: (val: string) => void;
  seconds: string;
  setSeconds: (val: string) => void;
}

const RestCard: React.FC<RestCardProps> = ({ minutes, setMinutes, seconds, setSeconds }) => {
  return (
    <Card title="Set">
      <TextInput
        accessibilityLabel="Text input Input"
        accessibilityHint="Input to change minutes in rest"
        className="w-[60px] rounded border p-1"
        placeholder="Minutes"
        returnKeyType="next"
        value={minutes}
        onChangeText={setMinutes}
      />
      <TextInput
        accessibilityLabel="Text input Input"
        accessibilityHint="Input to change seconds in rest"
        className="w-[60px] rounded border p-1"
        returnKeyType="next"
        placeholder=""
        value={seconds}
        onChangeText={setSeconds}
      />
    </Card>
  );
};

export default RestCard;
