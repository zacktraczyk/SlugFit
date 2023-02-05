/* eslint-disable prettier/prettier */
import React from 'react';
import { EditableWorkout } from '../types/EditableWorkout';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { TextInput } from 'react-native-gesture-handler';

interface ExerciseCardProps {
    editableWorkout?: EditableWorkout | undefined,
}

const styling = StyleSheet.create({
    container: {
        height: '90%',
    },
    greenText: {
        color: '#3BD15E',
    },
    redText: {
        color: '#ED4E39',
    },
    warmUpSetBackground: {
        backgroundColor: '#19639E',
    },
    warmUpFont: {
        color: '#BADEFB',
    },
    workingSetBackground: {
        backgroundColor: '#B92916',
    
    },
    workingSetFont: {
        color: '#FFC0B8',
    },
   
}); 



const ExerciseCard = () => {
    const [workoutDone, setWorkoutDone] = React.useState<boolean>(false);
  
 // Load font
 const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

    return (<View className="h-full w-full items-center bg-slate-50 ">
      <View style={styling.container} className='mt-5 h-5/6 w-11/12 bg-slate-50 shadow-sm rounded-xl'>
        <ScrollView>
            <View className='h-10 w-full content-evenly border-b border-slate-200 flex-row justify-between'>
                <Text className="m-1 mt-3 ml-3 font-bold text-center"> Deadlift</Text>
                <Text style={workoutDone?styling.greenText:styling.redText} className="m-1 mt-3 mr-3 font-bold"> {1} / {2} Sets Done</Text>
            </View>
            <View >
                <Text className="ml-4 mt-2 font-bold text-xs">Notes:</Text>
                <Text className="ml-4 mt-1  text-xs">Cues: Approach bar shin 1 inch away, grab bar shoulder width apart, then press "ground away" while lowering butt</Text>
            </View>

            {/**WARMUP SET BLOCK*/}
            <View className="mx-2 mt-3 ">
                <View style={styling.warmUpSetBackground} className="h-8 rounded-lg">
                    <Text style={styling.warmUpFont} className="m-2 text-xs">
                        Warmup Sets
                    </Text>
                </View>
                <Text className="text-stone-700 font-extralight font-bebas ml-1 mt-2">WARMUP SET {1}</Text>

                <View className="flex flex-row -2 h-8 rounded-md bg-gray-200">
                    <View className="h-8 w-6 rounded-l-lg bor bg-gray-300">
                        <Text className="ml-1 font-bebas font-bold text-xl my-auto">DO</Text>
                    </View>
                    <Text className="ml-3 font-bebas font-bold text-xl my-auto">{4}-{6}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> REPS</Text>
                    <Text className="ml-6 font-bebas font-bold text-xl my-auto">{9}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> RPE</Text>
                    <Text className="ml-6 font-bebas font-bold text-xl my-auto">{95}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> %1RM</Text>
                </View>

                <View className="mt-0.5 flex flex-row -2 h-8 rounded-md bg-gray-200">
                    <View className="h-8 w-14 rounded-l-lg bor bg-gray-300">
                        <Text className="ml-1 font-bebas font-bold text-xl my-auto">RECORD</Text>
                    </View>
                    <View className="bg-slate-50 h-5/6 ml-1 my-auto rounded-md w-24">
                        <TextInput
                            accessibilityLabel="Exercise Search Text Field "
                            accessibilityHint="Input characters to search for an exercise"
                            className=" text-xs my-auto mx-auto w-auto"
                            autoCapitalize="none"
                            placeholder="Reps you did"
                            returnKeyType="next"
                            onChangeText={() => {}}
                            autoFocus
                        />
                    </View>
                    <Text className="mr-1 font-bebas font-bold text-xs my-auto"> REPS</Text>
                    <View className="bg-slate-50 h-5/6 ml-1 my-auto rounded-md w-16">
                        <TextInput
                            accessibilityLabel="Exercise Search Text Field "
                            accessibilityHint="Input characters to search for an exercise"
                            className=" text-xs my-auto mx-auto w-auto"
                            autoCapitalize="none"
                            placeholder="Weight"
                            returnKeyType="next"
                            onChangeText={() => {}}
                            autoFocus
                        />
                    </View>
                    <Text className="font-bebas font-bold text-xs my-auto"> LB</Text>
                </View>
            </View>
            {/** END OF WARMUP SET BLOCK*/}
            {/**Working SET BLOCK*/}
            <View className="mx-2 mt-3 ">
                <View style={styling.workingSetBackground} className="h-8 rounded-lg">
                    <Text style={styling.workingSetFont} className="m-2 text-xs">
                        Working Sets
                    </Text>
                </View>
                
                <Text className="text-stone-700 font-extralight font-bebas ml-1 mt-2">SET {1}</Text>
                <View className="flex flex-row -2 h-8 rounded-md bg-gray-200">
                    <View className="h-8 w-6 rounded-l-lg bor bg-gray-300">
                        <Text className="ml-1 font-bebas font-bold text-xl my-auto">DO</Text>
                    </View>
                    <Text className="ml-3 font-bebas font-bold text-xl my-auto">{4}-{6}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> REPS</Text>
                    <Text className="ml-6 font-bebas font-bold text-xl my-auto">{9}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> RPE</Text>
                    <Text className="ml-6 font-bebas font-bold text-xl my-auto">{95}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> %1RM</Text>
                </View>

                <View className="mt-0.5 flex flex-row -2 h-8 rounded-md bg-gray-200">
                    <View className="h-8 w-14 rounded-l-lg bor bg-gray-300">
                        <Text className="ml-1 font-bebas font-bold text-xl my-auto">RECORD</Text>
                    </View>
                    <View className="bg-slate-50 h-5/6 ml-1 my-auto rounded-md w-24">
                        <TextInput
                            accessibilityLabel="Exercise Search Text Field "
                            accessibilityHint="Input characters to search for an exercise"
                            className=" text-xs my-auto mx-auto w-auto"
                            autoCapitalize="none"
                            placeholder="Reps you did"
                            returnKeyType="next"
                            onChangeText={() => {}}
                            autoFocus
                        />
                    </View>
                    <Text className="mr-1 font-bebas font-bold text-xs my-auto"> REPS</Text>
                    <View className="bg-slate-50 h-5/6 ml-1 my-auto rounded-md w-16">
                        <TextInput
                            accessibilityLabel="Exercise Search Text Field "
                            accessibilityHint="Input characters to search for an exercise"
                            className=" text-xs my-auto mx-auto w-auto"
                            autoCapitalize="none"
                            placeholder="Weight"
                            returnKeyType="next"
                            onChangeText={() => {}}
                            autoFocus
                        />
                    </View>
                    <Text className="font-bebas font-bold text-xs my-auto"> LB</Text>
                </View>
                
                
            </View>

        </ScrollView>
      </View>
        </View>)
}



export default ExerciseCard;