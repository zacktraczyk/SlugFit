import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface BlockContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const BlockContainer: React.FC<BlockContainerProps> = ({
  children,
  className = 'mt-2 flex flex-row items-center border border-slate-200 p-2 bg-white rounded-md shadow-sm',
}) => {
  return (
    <View className={className} style={styles.container}>
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
