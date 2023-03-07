import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { useActiveWorkout } from '../../hooks/useActiveWorkout';

interface DiscardButtonProps {
  goHome: () => void;
}

const DiscardButton: React.FC<DiscardButtonProps> = ({ goHome }) => {
  const [discard] = useActiveWorkout((state) => [state.discard]);
  const onPress = () => {
    Alert.alert('Discard this workout?', "You can't recover it later.", [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          discard();
          goHome();
        },
      },
    ]);
  };
  return (
    <TouchableOpacity onPress={onPress} accessibilityRole="button" className="p-1">
      <Text className="text-red-500 text-center font-normal">Discard</Text>
    </TouchableOpacity>
  );
};

export default DiscardButton;
