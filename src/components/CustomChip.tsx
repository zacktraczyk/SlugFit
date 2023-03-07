import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/**
 * @param value string value to display
 * @param color rgb color
 * @param index apply index on chip
 * @param onRequestClose On press handler on on attemp to close
 */
export type ChipProps = {
  value?: string;
  color?: string;
  index?: number;
  closeable?: boolean;
  onRequestClose?: (value?: string, index?: number, color?: string) => void;
};
const Chip: React.FC<ChipProps> = ({ value, index, color, closeable = true, onRequestClose }) => {
  const styling = StyleSheet.create({
    colorProp: {
      backgroundColor: color,
    },
  });

  return (
    <View className="border-width m-1 mt-3 flex flex-row rounded-md border border-solid border-slate-200 p-1 shadow-sm ">
      {color ? (
        <View style={styling.colorProp} className="mx-1 my-auto h-2 w-2 rounded-full" />
      ) : (
        <View />
      )}
      <Text className="my-auto mr-1 text-xs font-bold"> {value}</Text>
      {closeable ? (
        <TouchableOpacity
          className="my-auto mx-1"
          accessibilityRole="button"
          onPress={() => {
            if (onRequestClose) onRequestClose(value, index, color);
          }}
        >
          <AntDesign name="close" size={12} color="grey" />
        </TouchableOpacity>
      ) : (
        <View className="ml-1" />
      )}
    </View>
  );
};

export default Chip;
