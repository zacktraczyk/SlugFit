import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';

interface ToggleDrawerButtonProps {
  toggleDrawer: () => void;
}

const ToggleDrawerButton: React.FC<ToggleDrawerButtonProps> = ({ toggleDrawer }) => {
  return (
    <TouchableOpacity accessibilityRole="button" onPress={toggleDrawer}>
      <Ionicon name="menu" size={24} />
    </TouchableOpacity>
  );
};

export default ToggleDrawerButton;
