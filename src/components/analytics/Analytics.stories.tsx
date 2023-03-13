import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ExerciseAnalyticsDisplay } from './ExerciseAnalyticsDisplay';
import { ScrollView } from 'react-native-gesture-handler';

storiesOf('Analytics', module)
  .addDecorator((getStory) => <ScrollView className="flex h-full w-fit">{getStory()}</ScrollView>)
  .add('ExerciseAnalyticsDisplay', () => <ExerciseAnalyticsDisplay />);
