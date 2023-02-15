/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import NoteBlock from './blocks/ExerciseNoteBlock';
import RestBlock from './blocks/ExerciseRestBlock';
import SetBlock from './blocks/ExerciseSetBlock';
import { Exercise, ExerciseItem, RecordedSet } from '../../types';
import {isSet, isNote, isRest} from '../utils/typeCheck';

/**
 * @param exercise inputs value to a card
 * @param getUserRecordedSets returns array of user input RecordedValue or undefined if user fails to fil out all values
 */
export interface ExerciseCardProps {
    exercise: Exercise;
    getUserRecordedSets: (exerciseName: (string | undefined), recordedSets : (RecordedSet[] | undefined)) => void;
}

const ExerciseCard:React.FC<ExerciseCardProps> = ({exercise, getUserRecordedSets}) => {
    const maxSets = React.useRef(calculateNumWorkingSets(exercise.items));
    const records = React.useRef<RecordedSet[]>(new Array(calculateNumSets(exercise.items)));
    const [currentSetsDone, setCurrentSetDone] = React.useState<number>(0);

    /**returns uservalue of exercisecard if valid
     otherwise, undefined*/
    if( currentSetsDone == maxSets.current) {
           getUserRecordedSets(exercise.name,records.current);
    }else {
        getUserRecordedSets(undefined);
    }
    
    //Set Indices
    let workingSetIndex = 1;
    let warmUpSetIndex = 1;
    let numSets = -1;

    // Load font
    const [fontsLoaded] = useFonts({
        BebasNeue_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }
    
    return (<View className="h-full w-full items-center bg-white ">
      <View style={styling.container} className='mt-5 h-5/6 w-11/12 bg-white shadow-sm rounded-xl'>
        <ScrollView>
            <View className='h-10 w-full mb-2 content-evenly border-b border-slate-200 flex-row justify-between'>
                <Text className="m-1 mt-3 ml-3 font-bold text-center">{exercise.name}</Text>
                <Text style={currentSetsDone==maxSets.current?styling.greenText:styling.redText} className="m-1 mt-3 mr-3 font-bold"> {currentSetsDone} / {maxSets.current} Sets Done</Text>
            </View>
            {exercise.items.map((item: ExerciseItem, index: number) => { 
                if(isSet(item)) {
                    numSets++;
                    return(<SetBlock 
                        key={index} 
                        setNumber={(item.warmup?warmUpSetIndex++:workingSetIndex++)} 
                        reps={item.reps} 
                        rpe={item.rpe} 
                        orm={item.orm} 
                        warmup={item.warmup} 
                        recordIndex={numSets} 
                        getUserRecordedValue={(value, i) => {records.current[i] = value;}}
                        setDone={() => {setCurrentSetDone(currentSetsDone + 1)}}
                        setUndone={() => {setCurrentSetDone(currentSetsDone - 1)}}
                />)}
                else if(isRest(item)) {
                    return(<RestBlock key={index} minutes={item.minutes} seconds={item.seconds}/>);
                }
                else if(isNote(item)) {
                    return(<NoteBlock key={index} note={item.text}/>);
                } else {
                    return(<View key={index} className='flex flex-grow border h-10'>
                            <Text className="font-bold text-red-700 text-center my-auto">**Item Failed to Load**</Text>
                        </View>);
                }
            })}
        </ScrollView>
      </View>
        </View>)
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
}); 

/**
 * helper function
 * @param arr array of exercise items
 * @returns number of working sets 
 */
function calculateNumWorkingSets(arr: ExerciseItem[]): number { 
    let numWorkingSets = 0;
    for(let i = 0; i<arr.length; i++) {
        if (isSet(arr[i])) {
            if(!arr[i].warmup)  {
                numWorkingSets++;
            }
        }
    }    
    return numWorkingSets;
}

/**
 * helper function
 * @param arr array of exercise items
 * @returns number of working sets + warmup sets
 */
function calculateNumSets(arr: ExerciseItem[]): number {
    let numSets = 0;
    for(let i = 0; i<arr.length; i++) {
        if (isSet(arr[i])) {
            numSets++;
        }
    }    
    return numSets;
}


export default ExerciseCard;