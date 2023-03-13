import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import AddButton from './AddButton';
import BackButton from './BackButton';
import DiscardButton from './DiscardButton';
import DoneButton from './DoneButton';
import SaveButton from './SaveButton';
import ToggleDrawerButton from './ToggleDrawerButton';

storiesOf('Buttons', module)
  .addDecorator((getStory) => (
    <View className="m-3 flex h-full w-fit items-center justify-center">{getStory()}</View>
  ))
  .add('AddButton', () => <AddButton onPress={() => alert('Button Clicked')} />)
  .add('BackButton', () => <BackButton onPress={() => alert('Button Clicked')} />)
  .add('DiscardButton', () => <DiscardButton goHome={() => alert('Button Clicked')} />)
  .add('DoneButton', () => <DoneButton onPress={() => alert('Button Clicked')} />)
  .add('SaveButton', () => <SaveButton goHome={() => alert('Button Clicked')} />)
  .add('ToggleDrawerButton', () => (
    <ToggleDrawerButton navigation={{ toggleDrawer: () => alert('Button Clicked') }} />
  ));
