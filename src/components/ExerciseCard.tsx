/* eslint-disable prettier/prettier */
import React from 'react';
import { EditableWorkout } from '../types/EditableWorkout';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { TextInput } from 'react-native-gesture-handler';
import Checkbox from './CustomCheckBox'

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



const ExerciseCard = () => {
    const [workoutDone, setWorkoutDone] = React.useState<boolean>(false);
    const [checked, setChecked] = React.useState<boolean>(false);
    const IS_WORKINGSET = true;
  
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

            {/**Warmup SET BLOCK*/}
            <View className="mx-2 mt-3 ">
                <Text className="text-stone-700 font-extralight font-bebas ml-1 mt-2">{IS_WORKINGSET?"":"WARMUP"} SET {1}</Text>
                <View style={IS_WORKINGSET?styling.workingBackground1:styling.warmUpBackground1} className="flex flex-row -2 h-8 rounded-md">
                    <View style={IS_WORKINGSET?styling.workingBackground2:styling.warmUpBackground2}  className="h-8 w-6 rounded-l-lg">
                        <Text className="ml-1 font-bebas font-bold text-xl my-auto">DO</Text>
                    </View>
                    <Text className="ml-3 font-bebas font-bold text-xl my-auto">{4}-{6}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> REPS</Text>
                    <Text className="ml-6 font-bebas font-bold text-xl my-auto">{9}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> RPE</Text>
                    <Text className="ml-6 font-bebas font-bold text-xl my-auto">{95}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> %1RM</Text>
                    <View className="flex flex-grow flex-row border-solid justify-end">      
                        <Text style={IS_WORKINGSET?styling.workingFontColor:styling.warmUpFontColor} className="ml-1 font-bebas font-bold text-xl my-auto mx-4">{IS_WORKINGSET?"WORKING":"WARMUP"}</Text>
                    </View>
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
                    <View className="ml-1"><Checkbox checked={checked} onPress={()=>{setChecked(!checked)}}/></View>
                    
                </View>
                 {/**End of Warmup Set Block */}

                 {/**REST BLOCK*/}
                 <View className="flex flex-row -2 h-8 mt-3 rounded-md bg-gray-200">
                    <View className="h-8 w-10 rounded-l-lg bor bg-gray-300">
                        <Text className="ml-1 font-bebas font-bold text-xl my-auto">REST</Text>
                    </View>
                    <Text className="ml-3 font-bebas font-bold text-xl my-auto">{3}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> MINUTES</Text>
                    <Text className="ml-3 font-bebas font-bold text-xl my-auto">{30}</Text>
                    <Text className="font-bebas font-bold text-xs mt-3"> SECONDS</Text>
                </View>
                {/**END OF REST BLOCK */}
            </View>

               


        </ScrollView>
      </View>
        </View>)
}



export default ExerciseCard;