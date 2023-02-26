import React from 'react';
import { View, Text } from 'react-native';
import { ChartDataPoint } from 'react-native-responsive-linechart';
import { MetricType } from '../../utils/analytics';

interface SelectedDataDisplayProps {
  color?: string;
  metricType: MetricType;
  dataPoint: ChartDataPoint | undefined;
}

export const SelectedDataDisplay: React.FC<SelectedDataDisplayProps> = ({
  color,
  metricType,
  dataPoint,
}) => {
  return (
    <View className="flex h-8 w-11/12 flex-row self-center rounded-lg">
      <View className="flex w-36 items-center justify-center rounded-l-lg bg-slate-100">
        <Text>Feb 13, 2022</Text>
      </View>
      <View className="h-full w-2" style={{ backgroundColor: color || 'black' }}></View>
      <View className="flex-grow flex-row items-center justify-start rounded-r-lg border border-slate-100 pl-3">
        {dataPoint && (
          <Text>
            {metricType === MetricType.INTENSITY
              ? 'Max Intensity '
              : metricType === MetricType.WEIGHT
              ? 'Max Weight '
              : 'Total Volume '}
          </Text>
        )}
        <Text>{dataPoint ? `${dataPoint.y.toFixed(2)} lb` : 'Select a data point'}</Text>
      </View>
    </View>
  );
};
