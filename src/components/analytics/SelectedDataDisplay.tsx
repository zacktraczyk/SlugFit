import React from 'react';
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
  return null;
};
