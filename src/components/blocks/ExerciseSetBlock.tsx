import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { TextInput } from 'react-native-gesture-handler';
import Checkbox from '../CustomCheckBox';
import { ConsumableExerciseData, ExerciseSet } from '../../types';

interface SetBlockProps {
  currentWorkoutKey: string;
  workoutKey: string;
  setNumber: number;
  reps: number;
  weight: number;
  bodyweight: boolean;
  setRef: ExerciseSet;
  index: number;
  onChange: (index: number, updates: Partial<ConsumableExerciseData>) => void;
}
/**
 *
 * @param setNumber //number label of set block to display (i.e Warmup set 1)
 * @param reps //reps string to display
 * @param rpe //rpe string to display
 * @param orm //one rep max string to display
 * @param warmup //warmup boolean if setblock is a warmup set or not
 * @param recordIndex //index number for arr Record[] of parent
 * @param getUserRecordedValue //function from exercise card to call to set user input vals
 * @param setDone //funciton from parents to set if block is done (user values are filled and valid)
 * @param setUndone  //function to set undone of block (if user values are not all filled and invalid)
 * @returns // working/warmup set block
 */
const SetBlock: React.FC<SetBlockProps> = ({
  currentWorkoutKey,
  workoutKey,
  setNumber,
  index,
  reps,
  weight,
  bodyweight,
  setRef,
  onChange,
}) => {
  // const regexReps = React.useRef(/^\d+(?:-\d+)?$/);
  // const regexWeight = React.useRef(/^\d+(\.\d+)?|BODYWEIGHT$/);

  // Load font
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="mx-2 mt-2 ">
      <Text className="ml-1 font-bebas font-extralight text-stone-700">
        {setRef.warmup ? 'WARMUP' : ''} SET {setNumber}
      </Text>
      <View
        style={setRef.warmup ? styling.warmUpBackground1 : styling.workingBackground1}
        className="flex flex-row h-8 rounded-md -2"
      >
        <View
          style={setRef.warmup ? styling.warmUpBackground2 : styling.workingBackground2}
          className="w-6 h-8 rounded-l-lg"
        >
          <Text className="my-auto ml-1 text-xl font-bold font-bebas">DO</Text>
        </View>
        <Text className="my-auto ml-3 text-xl font-bold font-bebas">{setRef.reps}</Text>
        <Text className="mt-3 text-xs font-bold font-bebas"> REPS</Text>
        <Text className="my-auto ml-6 text-xl font-bold font-bebas">{setRef.rpe}</Text>
        <Text className="mt-3 text-xs font-bold font-bebas"> RPE</Text>
        <Text className="my-auto ml-6 text-xl font-bold font-bebas">{setRef.orm}</Text>
        <Text className="mt-3 text-xs font-bold font-bebas"> %1RM</Text>
        <View className="flex flex-row justify-end flex-grow border-solid">
          <Text
            style={setRef.warmup ? styling.warmUpFontColor : styling.workingFontColor}
            className="mx-4 my-auto ml-1 text-xl font-bold font-bebas"
          >
            {setRef.warmup ? 'WARMUP' : 'WORKING'}
          </Text>
        </View>
      </View>
      <View className="-2 mt-0.5 flex h-8 flex-row rounded-md bg-gray-200">
        <View className="h-8 bg-gray-300 rounded-l-lg bor w-14">
          <Text className="my-auto ml-1 text-xl font-bold font-bebas">RECORD</Text>
        </View>
        <TextInput
          accessibilityLabel="Record Reps"
          accessibilityHint="Input reps you did"
          className="w-16 mx-auto my-auto ml-1 text-xs text-center bg-white rounded-md h-5/6 font-bebas"
          autoCapitalize="none"
          placeholder="REPS YOU DID"
          returnKeyType="next"
          value={reps?.toString()}
          clearTextOnFocus={true}
          onChangeText={(value) => onChange(index, { reps: value })}
          editable={workoutKey == currentWorkoutKey}
          backgroundColor={workoutKey == currentWorkoutKey ? 'white' : 'transparent'}
        />
        <Text className="my-auto mr-1 text-xs font-bold font-bebas"> REPS</Text>

        {bodyweight ? (
          <View />
        ) : (
          <TextInput
            accessibilityLabel="User Recorded Weight"
            accessibilityHint="Input weight you did"
            className="w-16 mx-auto my-auto ml-1 text-xs text-center bg-white rounded-md h-5/6 font-bebas"
            clearTextOnFocus={true}
            autoCapitalize="none"
            placeholder="Weight"
            returnKeyType="next"
            value={weight?.toString()}
            onChangeText={(value) => onChange(index, { weight: value })}
            editable={workoutKey == currentWorkoutKey}
            backgroundColor={workoutKey == currentWorkoutKey ? 'white' : 'transparent'}
          />
        )}
        {bodyweight ? <View /> : <Text className="my-auto text-xs font-bold font-bebas"> LB</Text>}
        <View className="flex flex-row justify-center flex-grow border-solid">
          <View>
            <Checkbox
              checked={bodyweight}
              onPress={() => onChange(index, { bodyweight: !bodyweight })}
              disable={workoutKey != currentWorkoutKey}
            />
          </View>
          <Text className="my-auto text-xs font-bold font-bebas"> BODYWEIGHT</Text>
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
