import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export type ChipProps = {
  value?: string;
  color?: string;
  index?: number;
  onClose?: (value?: string, index?: number, color?: string) => void;
};
const Chip: React.FC<ChipProps> = ({ value, index, onClose, color }) => {
  const [show, setShow] = useState(true);

  const styling = StyleSheet.create({
    colorProp: {
      backgroundColor: color,
    },
  });

  if (!show) {
    return <View />;
  }

  return (
    <View className="flex border-width m-1 mt-3 inline flex-row rounded-lg border border-solid border-slate-200 p-1 shadow-sm ">
      {color ? (
        <View style={styling.colorProp} className="mx-1 my-auto h-2 w-2 rounded-full" />
      ) : (
        <View />
      )}
      <Text className="my-auto text-xs"> {value}</Text>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => {
          onClose(value, index, color);
          setShow(false);
        }}
      >
        <Text className="mx-1 my-auto ml-2 text-xs font-light text-slate-600">x</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chip;
