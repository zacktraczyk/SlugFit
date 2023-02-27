import React from 'react';
import { View, Text } from 'react-native';
import { ChartDataPoint, XYValue, Shape, Label } from 'react-native-responsive-linechart';

interface GraphTooltipProps {
  theme?: {
    label?: Label;
    shape?: Shape;
    formatter?: (value: ChartDataPoint) => string;
  };
  value?: ChartDataPoint;
  position?: XYValue;
}

export const GraphTooltip: React.FC<GraphTooltipProps> = ({ value, position }) => {
  return (
    <View
      className="min-w-12 flex h-8 items-center justify-center rounded-lg bg-slate-900 pl-1 pr-1"
      style={{ position: 'absolute', top: (position?.y || 0) - 20, left: position?.x || 0 }}
    >
      <Text className="text-white">{value?.y.toFixed(2)}</Text>
    </View>
  );
};
