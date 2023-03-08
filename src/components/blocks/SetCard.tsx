import React from 'react';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import { Pressable, Text, TextInput, View } from 'react-native';
import Card from './Card';

interface SetCardProps {
  reps: string;
  setReps: (val: string) => void;
  rpe: string;
  setRpe: (val: string) => void;
  orm: string;
  setOrm: (val: string) => void;
  id: number;
  warmupSet: boolean;
  setWarmupSet: (val: boolean) => void;
  deleteCard: (id: number) => void;
  duplicateCard: (id: number) => void;
}

const SetCard: React.FC<SetCardProps> = ({
  reps,
  setReps,
  rpe,
  setRpe,
  orm,
  setOrm,
  warmupSet,
  setWarmupSet,
  ...cardProps
}) => {
  const handleCheckboxPress = () => {
    setWarmupSet(!warmupSet);
  };

  return (
    <Card title="Set" {...cardProps}>
      <View>
        <View className="flex flex-row gap-2 pb-2">
          <TextInput
            accessibilityLabel="Text input Input"
            accessibilityHint="Input to change reps in set"
            className="w-[60px] rounded border p-1"
            placeholder="Reps"
            returnKeyType="next"
            value={reps}
            onChangeText={setReps}
          />
          <TextInput
            accessibilityLabel="Text input Input"
            accessibilityHint="Input to change rpe in set"
            className="w-[60px] rounded border p-1"
            returnKeyType="next"
            placeholder="RPE"
            value={rpe}
            onChangeText={setRpe}
          />
          <TextInput
            accessibilityLabel="Text input Input"
            accessibilityHint="Input to change orm in set"
            className="w-[60px] rounded border p-1"
            returnKeyType="next"
            placeholder="%1RM"
            value={orm}
            onChangeText={setOrm}
          />
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={handleCheckboxPress}
          className="flex w-auto flex-row items-center justify-center gap-1"
        >
          <Text>Warmup Set</Text>
          <View className="h-5 w-5">
            <AnimatedCheckbox
              checked={warmupSet}
              highlightColor="#000000"
              checkmarkColor="#ffffff"
              boxOutlineColor="#000000"
            />
          </View>
        </Pressable>
      </View>
    </Card>
  );
};

export default SetCard;
