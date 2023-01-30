import React from 'react';
import { TextInput } from 'react-native';
import Card from './Card';

const SetCard = ({ reps, setReps, pre, setPre, orm, setOrm }) => {
  return (
    <Card title="Set" collapsable={false}>
      <TextInput
        accessibilityLabel="Text input Input"
        accessibilityHint="Input to change account name"
        className="grow rounded border p-1"
        placeholder="Reps"
        returnKeyType="next"
        value={reps}
        onChangeText={setReps}
      />
      <TextInput
        accessibilityLabel="Text input Input"
        accessibilityHint="Input to change account name"
        className="grow rounded border p-1"
        returnKeyType="next"
        placeholder="PRE"
        value={pre}
        onChangeText={setPre}
      />
      <TextInput
        accessibilityLabel="Text input Input"
        accessibilityHint="Input to change account name"
        className="grow rounded border p-1"
        returnKeyType="next"
        placeholder="%1RM"
        value={orm}
        onChangeText={setOrm}
      />
    </Card>
  );
};

export default SetCard;
