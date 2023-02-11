import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface CompletedBlockContainerProps {
  children?: React.ReactNode;
}

export const CompletedBlockContainer: React.FC<CompletedBlockContainerProps> = ({ children }) => {
  return (
    <View
      className="shadow-sm rounded-xl border border-slate-200 mx-3"
      style={styles.container}
    >
      {children}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width/30 * 11,
    height: width/30 * 11,
    backgroundColor: '#F5F5F5',
  },
});
