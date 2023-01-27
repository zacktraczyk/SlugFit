import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicon from '@expo/vector-icons/Ionicons';

interface ToggleDrawerButtonProps {
  navigation;
}

const ToggleDrawerButton: React.FC<ToggleDrawerButtonProps> = ({ navigation }) => {
  const onPress = useCallback(() => {
    navigation.toggleDrawer();
  }, [navigation]);

  return (
    <TouchableOpacity accessibilityRole="button" onPress={onPress}>
      <Ionicon name="menu" size={24} />
    </TouchableOpacity>
  );
};

export default ToggleDrawerButton;
