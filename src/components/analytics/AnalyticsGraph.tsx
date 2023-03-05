import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Chart, Line, ChartDataPoint } from 'react-native-responsive-linechart';
import {
  ExerciseAnalytics,
  getAnalyticsForExercise,
  MetricType,
  Timeframe,
} from '../../utils/analytics';
import { useAuth } from '../../contexts/AuthProvider';
import { AnalyticsSelector } from '../../utils/analytics';
import { LineHandle } from 'react-native-responsive-linechart/lib/Line';
import { GraphTooltip } from './GraphTooltip';

const width = Dimensions.get('window').width;

type LineProps = React.ComponentProps<typeof Line>;

interface ExerciseLineProps {
  exerciseName: string;
  metricType: MetricType;
  timeframe: Timeframe;
  onChartDataFetched: (c: ChartDataPoint[]) => void;
}

const ExerciseLine: React.ForwardRefExoticComponent<ExerciseLineProps & LineProps> =
  React.forwardRef<LineHandle, ExerciseLineProps & LineProps>(
    ({ exerciseName, metricType, timeframe, onChartDataFetched, ...rest }, ref) => {
      const { session } = useAuth();
      const analyticsSelector = useRef<AnalyticsSelector | undefined>(undefined);
      const [selectorIsSet, setSelectorIsSet] = useState<boolean>(false);
      const [analytics, setAnalytics] = useState<ExerciseAnalytics | undefined>(undefined);

      useEffect(() => {
        const fetch = async () => {
          const selector = await getAnalyticsForExercise({
            exerciseName,
            userId: session?.user.id,
          });
          analyticsSelector.current = selector;
          setSelectorIsSet(true);
        };
        if (session?.user && exerciseName) fetch();
      }, [session, exerciseName]);

      useEffect(() => {
        if (metricType && selectorIsSet && analyticsSelector.current) {
          const analytics = analyticsSelector.current({ metricType, timeframe });
          onChartDataFetched(analytics.graphData);
          setAnalytics(analytics);
        }
      }, [metricType, timeframe, analyticsSelector, selectorIsSet]);

      if (
        analytics?.graphData === null ||
        analytics?.graphData === undefined ||
        analytics.graphData.length == 0
      )
        return null;

      return <Line data={analytics?.graphData || [{ x: 0, y: 0 }]} {...rest} ref={ref} />;
    }
  );

ExerciseLine.displayName = 'ExerciseLine';

interface AnalyticsGraphProps {
  exerciseNames: string[];
  metricType: MetricType;
  timeframe: Timeframe;
  colors: string[];
  onDataPointSelected: (d: ChartDataPoint) => void;
}

export const AnalyticsGraph: React.FC<AnalyticsGraphProps> = ({
  exerciseNames,
  metricType,
  timeframe,
  colors,
  onDataPointSelected,
}) => {
  const [yMax, setYMax] = useState(50);
  const hoistYMax = (graphData: ChartDataPoint[]) => {
    if (graphData && Array.isArray(graphData)) {
      const y = graphData.reduce((acc, { y }) => Math.max(acc, y), 0);
      setYMax((_yMax) => Math.max(y, _yMax));
    }
  };

  const ExerciseLines = useMemo(() => {
    setYMax(50);
    return exerciseNames.map((exerciseName, index) => (
      <ExerciseLine
        key={exerciseName}
        exerciseName={exerciseName}
        metricType={metricType}
        timeframe={timeframe}
        onChartDataFetched={hoistYMax}
        theme={{
          stroke: { color: colors[index], width: 2, opacity: 0.5 },
          scatter: {
            default: { width: 10, height: 10, rx: 5, color: colors[index], opacity: 0.5 },
            selected: {
              width: 10,
              height: 10,
              color: colors[index],
              opacity: 1,
            },
          },
        }}
        onTooltipSelect={(value) => {
          onDataPointSelected(value);
        }}
        tooltipComponent={<GraphTooltip />}
      />
    ));
  }, [exerciseNames, metricType, timeframe, colors]);

  return exerciseNames.length > 0 ? (
    <Chart
      style={{
        height: (width / 12) * 10,
        width: (width / 12) * 10,
        alignSelf: 'center',
      }}
      padding={{ bottom: 20, top: 20, left: 20, right: 20 }}
      data={[]}
      xDomain={{ min: 0, max: timeframe }}
      yDomain={{ min: 0, max: yMax }}
    >
      {ExerciseLines}
    </Chart>
  ) : (
    <View
      style={{
        height: (width / 12) * 10,
        width: (width / 12) * 10,
        alignSelf: 'center',
      }}
      className="flex items-center justify-center"
    >
      <Text className="font-light">Select an exercise to analyze</Text>
    </View>
  );
};
