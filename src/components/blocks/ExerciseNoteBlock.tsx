import React from 'react';
import { Text, View } from 'react-native';

interface NoteBlockProps {
  note: string;
}
const NoteBlock: React.FC<NoteBlockProps> = ({ note }) => {
  return (
    <View className="mx-4 mt-2">
      <Text className="font-bebas text-xs font-bold">Notes:</Text>
      <Text className="mt-1  font-bebas text-xs">{note}</Text>
    </View>
  );
};

export default NoteBlock;
