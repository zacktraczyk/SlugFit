import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { ChartDataPoint } from 'react-native-responsive-linechart';
import { MetricType, Timeframe } from '../../utils/analytics';
import { AnalyticsGraph } from './AnalyticsGraph';
import { MetricTypeFilter } from './MetricTypeFilter';
import { SelectedDataDisplay } from './SelectedDataDisplay';
import { TimeframeFilter } from './TimeframeFilter';

interface ExerciseAnalyticsDisplayProps {
  numCanSelect?: number;
}

export const ExerciseAnalyticsDisplay: React.FC<ExerciseAnalyticsDisplayProps> = ({
  numCanSelect = 2,
}) => {
  const [exerciseNames, setExerciseNames] = useState<string[]>([
    'Reverse Crunch',
    'Alternating Heel Touch',
  ]);
  const [metricType, setMetricType] = useState<MetricType>(MetricType.INTENSITY);
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.WEEK);
  const [selectedDataPoint, setSelectedDataPoint] = useState<ChartDataPoint | undefined>(undefined);

  return (
    <View className="h-96 w-full">
      <MetricTypeFilter onChange={setMetricType} metricType={metricType} />
      <AnalyticsGraph
        exerciseNames={exerciseNames}
        metricType={metricType}
        timeframe={timeframe}
        onDataPointSelected={setSelectedDataPoint}
      />
      <SelectedDataDisplay dataPoint={selectedDataPoint} metricType={metricType} />

      <TimeframeFilter onChange={setTimeframe} timeframe={timeframe} />
    </View>
  );
};
