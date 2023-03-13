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
      className="absolute right-8 bottom-8 h-14 w-14 items-center justify-center rounded-lg border-2 border-slate-600 bg-white"
    >
      <MaterialIcon name="add" size={36} color="rgb(71, 85, 105)" />
    </TouchableOpacity>
  );
};

export default AddButton;
