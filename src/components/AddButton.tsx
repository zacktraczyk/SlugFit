import React from 'react';
import { Pressable, Text } from 'react-native';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onClick()}
      className="absolute bottom-5 right-5 flex h-20 w-20 items-center justify-center rounded-xl border-2 bg-white shadow"
    >
      <Text className="text-4xl">+</Text>
    </Pressable>
  );
};

export default AddButton;
