import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface BlockContainerProps {
  children?: React.ReactNode;
}

export const BlockContainer: React.FC<BlockContainerProps> = ({ children }) => {
  return (
    <View
      className="mt-2 flex flex-row items-center rounded border border-slate-200"
      style={styles.container}
    >
      {children}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: (width / 12) * 11,
  },
});
