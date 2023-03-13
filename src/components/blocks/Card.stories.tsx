import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Text, View } from 'react-native';
import SetCard from './SetCard';
import Card from './Card';
import NoteCard from './NoteCard';
import RestCard from './RestCard';

const cardProps = {
  deleteCard: () => alert('delete card'),
  duplicateCard: () => alert('duplicate card'),
};

storiesOf('Blocks/Editable', module)
  .addDecorator((getStory) => (
    <View className="m-3 flex h-full w-fit items-center justify-center">{getStory()}</View>
  ))
  .add('Blank', () => (
    <>
      <Card id={0} title="Test" {...cardProps}>
        <Text className="grow bg-slate-200 text-center">CARD BODY</Text>
      </Card>
    </>
  ))
  .add('SetCard', () => (
    <SetCard
      id={0}
      reps=""
      rpe=""
      orm=""
      warmupSet={false}
      setWarmupSet={() => alert('update warmup set')}
      setOrm={() => alert('update orm')}
      setReps={() => alert('update reps')}
      setRpe={() => alert('update rpe')}
      {...cardProps}
    />
  ))
  .add('NoteCard', () => (
    <NoteCard id={1} text="" setText={() => alert('update text')} {...cardProps} />
  ))
  .add('RestCard', () => (
    <RestCard
      id={1}
      minutes=""
      seconds=""
      setMinutes={() => alert('update minutes')}
      setSeconds={() => alert('update seconds')}
      {...cardProps}
    />
  ));
