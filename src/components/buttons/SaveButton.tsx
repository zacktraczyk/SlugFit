import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';

interface SaveButtonProps {
  goHome: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ goHome }) => {
  const [save] = useActiveWorkout((state) => [state.save]);
  const onPress = async () => {
    await save();
    goHome();
  };
  return (
    <TouchableOpacity onPress={onPress} accessibilityRole="button" className="p-1">
      <Text className="text-green-500 text-center font-normal">Save</Text>
    </TouchableOpacity>
  );
};

export default SaveButton;
