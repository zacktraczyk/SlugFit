/* eslint-disable prettier/prettier */
import React from 'react';
import { EditableWorkout } from '../types/EditableWorkout';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import "@fontsource/bebas-neue";

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
    workingSetColors: {
        backgroundColor: '#B92916',
        color: '#BADEFB',
    },
    fontA: {
        fontFamily: 'Bebas Neue'
    },
}); 

const ExerciseCard = () => {
    const [workoutDone, setWorkoutDone] = React.useState<boolean>(true);
 

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
            <View className="mx-2 mt-3 ">
                <View style={styling.warmUpSetBackground} className="h-8 rounded-lg">
                    <Text style={styling.warmUpFont} className="m-2 text-xs">
                        Warmup Sets
                    </Text>
                </View>
                <Text style={styling.fontA} className="text-stone-700 font-extralight text-">WARMUP SET {1}</Text>
            </View>

        </ScrollView>
      </View>
        </View>)
}



export default ExerciseCard;