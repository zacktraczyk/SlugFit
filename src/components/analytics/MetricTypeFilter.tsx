import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MetricType } from '../../utils/exerciseStats';

interface MetricTypeFilterProps {
  metricType: MetricType;
  onChange: (m: MetricType) => void;
}

interface FilterOptionProps {
  selected: boolean;
  title: string;
  rounded?: 'top' | 'bottom' | 'none' | undefined;
  onPress: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({ selected, title, rounded, onPress }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      className={
        'flex w-full flex-1 items-center justify-center' +
        (selected ? ' bg-slate-800' : ' bg-slate-200') +
        (rounded === 'top' ? ' rounded-t-lg' : '') +
        (rounded === 'bottom' ? ' rounded-b-lg' : '')
      }
    >
      <Text className={selected ? 'font-bold text-white' : 'font-medium'}>{title}</Text>
    </TouchableOpacity>
  );
};

export const MetricTypeFilter: React.FC<MetricTypeFilterProps> = ({ metricType, onChange }) => {
  return (
    <View className="relative left-4 top-1 z-40 flex h-28 w-10 flex-col rounded-lg bg-slate-200">
      <FilterOption
        title="LB"
        selected={metricType === MetricType.WEIGHT}
        rounded={'top'}
        onPress={() => {
          onChange(MetricType.WEIGHT);
        }}
      />
      <FilterOption
        title="%"
        selected={metricType === MetricType.INTENSITY}
        onPress={() => {
          onChange(MetricType.INTENSITY);
        }}
      />
      <FilterOption
        title="VOL"
        selected={metricType === MetricType.VOLUME}
        rounded={'bottom'}
        onPress={() => {
          onChange(MetricType.VOLUME);
        }}
      />
    </View>
  );
};
