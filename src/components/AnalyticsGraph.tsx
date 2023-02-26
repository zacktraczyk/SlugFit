import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  ChartDataPoint,
  Tooltip,
} from 'react-native-responsive-linechart';
import {
  ExerciseAnalytics,
  getAnalyticsForExercise,
  MetricType,
  Timeframe,
} from '../utils/analytics';
import { useAuth } from '../contexts/AuthProvider';
import { AnalyticsSelector } from '../utils/analytics';
import { LineHandle } from 'react-native-responsive-linechart/lib/Line';

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

      return <Line data={analytics?.graphData || [{ x: 0, y: 0 }]} {...rest} ref={ref} />;
    }
  );

ExerciseLine.displayName = 'ExerciseLine';

interface AnalyticsGraphProps {
  exerciseNames: string[];
}

export const AnalyticsGraph: React.FC<AnalyticsGraphProps> = ({ exerciseNames }) => {
  const [yMax, setYMax] = useState(50);
  const hoistYMax = (graphData: ChartDataPoint[]) => {
    if (graphData && Array.isArray(graphData)) {
      const y = graphData.reduce((acc, { x, y }) => Math.max(acc, y), 0);
      setYMax((_yMax) => Math.max(_yMax, y));
    }
  };
  return (
    <Chart
      style={{ height: 200, width: 400 }}
      padding={{ bottom: 20, top: 20, left: 20, right: 20 }}
      data={[]}
      yDomain={{ min: 0, max: yMax }}
    >
      <ExerciseLine
        exerciseName="Reverse Crunch"
        metricType={MetricType.INTENSITY}
        timeframe={Timeframe.WEEK}
        onChartDataFetched={hoistYMax}
        theme={{
          stroke: { color: '#ffa502', width: 1 },
          scatter: {
            default: { width: 10, height: 10, rx: 2 },
            selected: { width: 10, height: 10, color: 'red' },
          },
        }}
      />
    </Chart>
  );
};
