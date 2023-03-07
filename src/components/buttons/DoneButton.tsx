import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface DoneButtonProps {
  onPress: () => void;
}

const DoneButton: React.FC<DoneButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      className="bg-slate-100 rounded p-1 pl-2 pr-2"
      hitSlop={{
        top: 30,
        bottom: 30,
        left: 30,
        right: 30,
      }}
    >
      <Text className="text-xs font-bold">DONE</Text>
    </TouchableOpacity>
  );
};

export default DoneButton;
