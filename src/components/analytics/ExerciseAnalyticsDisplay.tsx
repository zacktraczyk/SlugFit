import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { ChartDataPoint } from 'react-native-responsive-linechart';
import { MetricType, Timeframe } from '../../utils/exerciseStats';
import { AnalyticsGraph } from './AnalyticsGraph';
import { MetricTypeFilter } from './MetricTypeFilter';
import { SelectedDataDisplay } from './SelectedDataDisplay';
import { TimeframeFilter } from './TimeframeFilter';
import Ionicon from '@expo/vector-icons/Ionicons';
import ExerciseSearchBar from '../ExerciseSearchBar';

interface ExerciseAnalyticsDisplayProps {
  numCanSelect?: number;
}

const width = Dimensions.get('window').width;

export const AnalyticsColors = ['#F96E46', '#519E8A', '#4E598C'];

export const ExerciseAnalyticsDisplay: React.FC<ExerciseAnalyticsDisplayProps> = ({
  numCanSelect = 3,
}) => {
  const [exerciseNames, setExerciseNames] = useState<string[]>([]);
  const [metricType, setMetricType] = useState<MetricType>(MetricType.INTENSITY);
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.WEEK);
  const [selectedDataPoint, setSelectedDataPoint] = useState<ChartDataPoint | undefined>(undefined);
  const onSelectExercise = (exerciseName: string) => {
    setExerciseNames((_exerciseNames) => {
      if (_exerciseNames.includes(exerciseName)) return _exerciseNames;
      if (_exerciseNames.length == numCanSelect) return _exerciseNames;
      return [..._exerciseNames, exerciseName];
    });
  };

  const removeExerciseName = (exerciseName: string) => {
    setExerciseNames((_exerciseNames) => _exerciseNames.filter((name) => name !== exerciseName));
  };

  const renderExerciseNameChip = ({ item: exerciseName, index }) => {
    return (
      <View
        key={exerciseName}
        className="ml-1 mr-1 flex flex-row items-center justify-center rounded-lg p-2 shadow-md shadow-slate-200"
        style={{ backgroundColor: AnalyticsColors[index] }}
      >
        <Text className="font-medium text-white">{exerciseName}</Text>
        <Ionicon
          name="close-circle"
          color="rgba(0, 0, 0, 0.8)"
          style={{ paddingLeft: 4 }}
          size={16}
          onPress={() => removeExerciseName(exerciseName)}
        />
      </View>
    );
  };

  return (
    <View className="w-full">
      <ExerciseSearchBar onSelectExercise={onSelectExercise} />
      <FlatList
        data={exerciseNames}
        renderItem={renderExerciseNameChip}
        keyExtractor={(item) => item}
        horizontal={true}
        style={{
          alignSelf: 'center',
          width,
          paddingLeft: 12,
          marginTop: 5,
          maxHeight: 32,
        }}
        contentContainerStyle={{
          height: 32,
        }}
      />
      <MetricTypeFilter onChange={setMetricType} metricType={metricType} />
      <AnalyticsGraph
        exerciseNames={exerciseNames}
        colors={AnalyticsColors}
        metricType={metricType}
        timeframe={timeframe}
        onDataPointSelected={setSelectedDataPoint}
      />
      <SelectedDataDisplay dataPoint={selectedDataPoint} metricType={metricType} />

      <TimeframeFilter onChange={setTimeframe} timeframe={timeframe} />
    </View>
  );
};
