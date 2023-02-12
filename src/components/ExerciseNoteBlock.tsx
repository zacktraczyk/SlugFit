import React from 'react';
import { Text, View } from 'react-native';

interface NoteBlockProps {
  note: string;
}
const NoteBlock: React.FC<NoteBlockProps> = ({ note }) => {
  return (
    <View>
      <Text className="ml-4 mt-1 text-xs font-bold">Notes:</Text>
      <Text className="ml-4 mt-1  text-xs">{note}</Text>
    </View>
  );
};

export default NoteBlock;