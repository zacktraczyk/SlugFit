import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import CardActionsModal from '../modals/CardActionsModal';

interface DraggableCardProps {
  title: string;
  children: React.ReactNode;
  id: number;
  deleteCard: (id: number) => void;
  duplicateCard: (id: number) => void;
}

const Card: React.FC<DraggableCardProps> = ({ title, children, id, deleteCard, duplicateCard }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="bg-lightgray flex flex-row items-center justify-evenly space-x-10 rounded border p-10 py-3">
        <Text className="mr-2">{title}</Text>
        <View className="flex flex-row items-center space-x-2">{children}</View>
        <Entypo
          name="dots-three-vertical"
          size={18}
          color="black"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <CardActionsModal
        visible={modalVisible}
        setVisible={setModalVisible}
        deleteExerciseItem={() => deleteCard(id)}
        duplicateExerciseItem={() => duplicateCard(id)}
      />
    </>
  );
};

export default Card;
