import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

interface AddButtonProps {
  onPress: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      className="absolute right-8 bottom-8 h-16 w-16 items-center justify-center rounded-lg border-2"
    >
      <MaterialIcon name="add" size={36} />
    </TouchableOpacity>
  );
};

export default AddButton;
