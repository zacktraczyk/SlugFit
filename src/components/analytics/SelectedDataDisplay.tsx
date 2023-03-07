import React from 'react';
import { View, Text } from 'react-native';
import { ChartDataPoint } from 'react-native-responsive-linechart';
import { MetricType } from '../../utils/analytics';
import { formatDate } from '../../utils/parsing';

interface SelectedDataDisplayProps {
  color?: string;
  metricType: MetricType;
  dataPoint: ChartDataPoint | undefined;
}

export const SelectedDataDisplay: React.FC<SelectedDataDisplayProps> = ({ dataPoint }) => {
  return (
    <View className="bg-slate-200 mb-0 flex h-8 w-32 flex-row items-center justify-center self-center rounded-t-lg pl-4 pr-4">
      {dataPoint?.meta?.created_at ? (
        <Text className="font-medium">{formatDate(dataPoint?.meta?.created_at)}</Text>
      ) : null}
    </View>
  );
};
