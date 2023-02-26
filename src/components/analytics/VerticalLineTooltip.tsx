import React from 'react';
import { View, Text } from 'react-native';
import { ChartDataPoint, XYValue, Shape, Label } from 'react-native-responsive-linechart';
import MaterialCommunityIcon from '@expo/vector-icons/MaterialCommunityIcons';

interface VerticalLineTooltipProps {
  theme?: {
    label?: Label;
    shape?: Shape;
    formatter?: (value: ChartDataPoint) => string;
  };
  value?: ChartDataPoint;
  position?: XYValue;
}

export const VerticalLineTooltip: React.FC<VerticalLineTooltipProps> = ({
  theme,
  value,
  position,
}) => {
  return (
    <View style={{ position: 'absolute', top: position?.y, left: position.x }}>
      <MaterialCommunityIcon name="dumbbell" size={12} />
    </View>
  );
};
