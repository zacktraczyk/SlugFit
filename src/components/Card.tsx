import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface DraggableCardProps {
  title: string;
  // collapsable: boolean;
  children: React.ReactNode;
}

const Card: React.FC<DraggableCardProps> = ({ title, children }) => {
  // <++> TODO: Add arrow collapse functionallity
  // const [collapsed, setCollapsed] = useState(true)

  // <++> TODO: Add vertical dots functionality
  // const options = [];

  return (
    <View className="bg-lightgray flex flex-row items-center justify-evenly space-x-10 rounded border p-10 py-3">
      <Text className="mr-2">{title}</Text>
      <View className="flex flex-row items-center space-x-2">{children}</View>
      <Entypo name="dots-three-vertical" size={18} color="black" />
    </View>
  );
};

export default Card;
