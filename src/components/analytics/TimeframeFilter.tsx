import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Timeframe } from '../../utils/analytics';

interface TimeframeFilterProps {
  timeframe: Timeframe;
  onChange: (t: Timeframe) => void;
}

interface FilterOptionProps {
  selected: boolean;
  title?: string;
  rounded?: 'left' | 'right' | 'none' | undefined;
  onPress: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({ selected, title, onPress, rounded }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      className={
        'flex flex-1 items-center justify-center' +
        (selected ? ' bg-slate-800' : ' bg-slate-200') +
        (rounded === 'left' ? ' rounded-l-lg' : '') +
        (rounded === 'right' ? ' rounded-r-lg' : '')
      }
      onPress={onPress}
    >
      <Text className={selected ? 'text-white font-bold' : 'font-medium'}>{title}</Text>
    </TouchableOpacity>
  );
};

export const TimeframeFilter: React.FC<TimeframeFilterProps> = ({ timeframe, onChange }) => {
  return (
    <View className="bg-slate-200 flex h-8 w-11/12 flex-row self-center rounded-lg">
      <FilterOption
        title="1 W"
        selected={timeframe === Timeframe.WEEK}
        rounded={'left'}
        onPress={() => {
          onChange(Timeframe.WEEK);
        }}
      />
      <FilterOption
        title="1 M"
        selected={timeframe === Timeframe.MONTH}
        onPress={() => {
          onChange(Timeframe.MONTH);
        }}
      />
      <FilterOption
        title="3 M"
        selected={timeframe === Timeframe.THREE_MONTHS}
        onPress={() => {
          onChange(Timeframe.THREE_MONTHS);
        }}
      />
      <FilterOption
        title="6 M"
        selected={timeframe === Timeframe.SIX_MONTHS}
        onPress={() => {
          onChange(Timeframe.SIX_MONTHS);
        }}
      />
      <FilterOption
        title="1 Y"
        selected={timeframe === Timeframe.YEAR}
        rounded={'right'}
        onPress={() => {
          onChange(Timeframe.YEAR);
        }}
      />
    </View>
  );
};
