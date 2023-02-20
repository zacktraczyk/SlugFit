import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} accessibilityRole="button" className="p-1">
      <Ionicon name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;
