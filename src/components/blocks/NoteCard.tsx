import React from 'react';
import { TextInput } from 'react-native';
import Card from './Card';

interface RestCardProps {
  text: string;
  setText: (val: string) => void;
  id: number;
  deleteCard: (id: number) => void;
  duplicateCard: (id: number) => void;
}

const NoteCard: React.FC<RestCardProps> = ({ text, setText, ...cardProps }) => {
  return (
    <>
      <Card title="Note" {...cardProps}>
        <TextInput
          accessibilityLabel="Text input Input"
          accessibilityHint="Input to change minutes in rest"
          multiline={true}
          // numberOfLines={2}
          className="h-fit w-[192px] rounded border p-1"
          placeholder="Notes"
          returnKeyType="next"
          value={text}
          onChangeText={setText}
        />
      </Card>
    </>
  );
};

export default NoteCard;
