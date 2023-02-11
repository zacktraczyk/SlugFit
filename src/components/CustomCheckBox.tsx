import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomCheckBoxProps {
  checked: boolean;
  onPress: (c: boolean) => void;
}

const Checkbox: React.FC<CustomCheckBoxProps> = ({ checked, onPress }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      className="border-cyan-30 my-auto border bg-transparent p-0.5 rounded"
    >
      {checked ? (
        <View style={styles.checkedContainer} />
      ) : (
        <View style={styles.uncheckedContainer} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkedContainer: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    borderRadius:2,
  },
  uncheckedContainer: {
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
  },
});

export default Checkbox;
