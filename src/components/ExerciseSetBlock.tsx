import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { TextInput } from 'react-native-gesture-handler';
import Checkbox from './CustomCheckBox';

interface SetBlockProps {
  setNumber: number;
  reps: string;
  rpe: string;
  orm: string;
  warmup: boolean;
  getUserRecordedValue?: (reps: string, weight: string) => void;
}
const SetBlock: React.FC<SetBlockProps> = ({
  setNumber,
  reps,
  rpe,
  orm,
  warmup,
  getUserRecordedValue,
}) => {
  const [isBodyWeight, setIsBodyWeight] = React.useState<boolean>(false);
  const [userInputReps, setUserInputReps] = React.useState<string>('');
  const [userInputWeight, setUserInputWeight] = React.useState<string>('');

  React.useEffect(() => {
    getUserRecordedValue(userInputReps, userInputWeight);
  }, [userInputReps, userInputWeight]);

  // Load font
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="mx-2 mt-1 ">
      <Text className="ml-1 mt-2 font-bebas font-extralight text-stone-700">
        {warmup ? '' : 'WARMUP'} SET {setNumber}
      </Text>
      <View
        style={warmup ? styling.workingBackground1 : styling.warmUpBackground1}
        className="-2 flex h-8 flex-row rounded-md"
      >
        <View
          style={warmup ? styling.workingBackground2 : styling.warmUpBackground2}
          className="h-8 w-6 rounded-l-lg"
        >
          <Text className="my-auto ml-1 font-bebas text-xl font-bold">DO</Text>
        </View>
        <Text className="my-auto ml-3 font-bebas text-xl font-bold">{reps}</Text>
        <Text className="mt-3 font-bebas text-xs font-bold"> REPS</Text>
        <Text className="my-auto ml-6 font-bebas text-xl font-bold">{rpe}</Text>
        <Text className="mt-3 font-bebas text-xs font-bold"> RPE</Text>
        <Text className="my-auto ml-6 font-bebas text-xl font-bold">{orm}</Text>
        <Text className="mt-3 font-bebas text-xs font-bold"> %1RM</Text>
        <View className="flex flex-grow flex-row justify-end border-solid">
          <Text
            style={warmup ? styling.workingFontColor : styling.warmUpFontColor}
            className="my-auto mx-4 ml-1 font-bebas text-xl font-bold"
          >
            {warmup ? 'WORKING' : 'WARMUP'}
          </Text>
        </View>
      </View>
      <View className="-2 mt-0.5 flex h-8 flex-row rounded-md bg-gray-200">
        <View className="bor h-8 w-14 rounded-l-lg bg-gray-300">
          <Text className="my-auto ml-1 font-bebas text-xl font-bold">RECORD</Text>
        </View>
        <View className="my-auto ml-1 h-5/6 w-16 rounded-md bg-white">
          <TextInput
            accessibilityLabel="Record Reps"
            accessibilityHint="Input reps you did"
            className=" my-auto mx-auto w-auto font-bebas text-xs"
            autoCapitalize="none"
            placeholder="REPS YOU DID"
            returnKeyType="next"
            value={userInputReps}
            onChangeText={(value) => {
              setUserInputReps(value);
            }}
          />
        </View>
        <Text className="my-auto mr-1 font-bebas text-xs font-bold"> REPS</Text>

        {isBodyWeight ? (
          <View />
        ) : (
          <View className="my-auto ml-1 h-5/6 w-14 rounded-md bg-white">
            <TextInput
              accessibilityLabel="User Recorded Weight"
              accessibilityHint="Input weight you did"
              className=" my-auto mx-auto w-auto font-bebas text-xs"
              autoCapitalize="none"
              placeholder="Weight"
              returnKeyType="next"
              value={userInputWeight}
              onChangeText={(value) => {
                setUserInputWeight(value);
              }}
            />
          </View>
        )}
        {isBodyWeight ? (
          <View />
        ) : (
          <Text className="my-auto font-bebas text-xs font-bold"> LB</Text>
        )}
        <View className="flex flex-grow flex-row justify-center border-solid">
          <View>
            <Checkbox
              checked={isBodyWeight}
              onPress={() => {
                setIsBodyWeight(!isBodyWeight);
                {isBodyWeight?setUserInputWeight(""):setUserInputWeight("BODYWEIGHT")};
              }}
            />
          </View>
          <Text className="my-auto font-bebas text-xs font-bold"> BODYWEIGHT</Text>
        </View>
      </View>
    </View>
  );
};

const styling = StyleSheet.create({
  warmUpBackground1: {
    backgroundColor: '#BADEFB',
  },
  warmUpBackground2: {
    backgroundColor: '#19639E',
  },
  warmUpFontColor: {
    color: '#003560',
  },
  workingBackground1: {
    backgroundColor: '#FFC0B8',
  },
  workingBackground2: {
    backgroundColor: '#B92916',
  },
  workingFontColor: {
    color: '#B92916',
  },
});

export default SetBlock;
