import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';
import { BlockContainer } from './BlockContainer';

interface BlockProps {
  // Name of the block
  title: string;

  // Handler for when the main block body is pressed
  onPress?: () => void;

  // Handler for when the options ellipsis are pressed
  onOptionsPress?: () => void;
}

const Block: React.FC<BlockProps> = ({ title, onPress, onOptionsPress }) => {
  return (
    <BlockContainer>
      <TouchableOpacity
        accessibilityRole="button"
        className="flex h-full flex-1 flex-row items-center p-1"
        onPress={onPress}
        hitSlop={{ top: 20, bottom: 20, left: 20 }}
      >
        <Text className="text-base font-medium">{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        className="flex h-full flex-row items-center justify-center p-1"
        hitSlop={{ top: 20, bottom: 20, right: 20 }}
        onPress={onOptionsPress}
      >
        <Ionicon name="ellipsis-horizontal" size={16} />
      </TouchableOpacity>
    </BlockContainer>
  );
};

export default Block;
