import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';
import { BlockContainer } from './BlockContainer';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';

export interface BlockProps {
  title: string; // Name of the block
  subtitle?: string;
  onPress?: () => void; // Handler for when the main block body is pressed
  onOptionsPress?: () => void; // Handler for when the options ellipsis are pressed
  icon?: keyof typeof Ionicon.glyphMap; // name of Ionicon icon
}

const Block: React.FC<BlockProps> = ({
  title,
  subtitle,
  icon = 'ellipsis-horizontal',
  onPress,
  onOptionsPress,
}) => {
  return (
    <BlockContainer>
      <TouchableOpacity
        accessibilityRole="button"
        className="flex h-full flex-1 flex-row items-center p-1"
        onPress={onPress}
        hitSlop={{ top: 20, bottom: 20, left: 20 }}
      >
        <Text className="text-base font-medium">{title}</Text>
        {subtitle !== undefined && (
          <>
            <MaterialCommunityIcon
              name="circle"
              size={4}
              color="black"
              style={{ paddingHorizontal: 10 }}
            />
            <Text className="text-xs font-light">{subtitle}</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        className="flex h-full flex-row items-center justify-center p-1"
        hitSlop={{ top: 20, bottom: 20, right: 20 }}
        onPress={onOptionsPress}
      >
        <Ionicon name={icon} size={16} />
      </TouchableOpacity>
    </BlockContainer>
  );
};

export default Block;
