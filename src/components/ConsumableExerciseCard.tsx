/* eslint-disable prettier/prettier */
import React, {useMemo, useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import NoteBlock from './blocks/ExerciseNoteBlock';
import RestBlock from './blocks/ExerciseRestBlock';
import SetBlock from './blocks/ExerciseSetBlock';
import { Exercise, ExerciseItem, ConsumableExerciseItem, ConsumableExercise } from '../types';
import {isSet, isNote, isRest} from '../utils/typeCheck';

/**
 * @param exercise inputs value to a card
 * @param getUserRecordedSets returns array of user input RecordedValue or undefined if user fails to fil out all values
 */
export interface ConsumableExerciseCardProps {
    exercise: ConsumableExercise;
    onChange: (payload: ConsumableExercise) => void;
}

const ConsumableExerciseCard: React.FC<ConsumableExerciseCardProps> = ({exercise, onChange}) => {
    const [_exercise, setExercise] = useState<ConsumableExercise>(exercise);
    // Load font
    const [fontsLoaded] = useFonts({
        BebasNeue_400Regular,
    });

    const updateCard = (index, updates) => {
        setExercise((_oldExercise) => {
            const copy = _oldExercise;
            copy.items[index] = {
                ...copy.items[index],
                ...updates
            };

            onChange(copy);
            return copy;
        });
    };

    const exerciseItems = useMemo(() => {
        let numWarmups = 0;
        let numWorking = 0;
        let numSets = 0;
        return _exercise.items.map((item: ConsumableExerciseItem, index: number) => { 
            if(isSet(item.ref)) {
                numSets++;
                return(<SetBlock 
                    key={index} 
                    index={index}
                    setNumber={(item.ref.warmup?numWarmups++:numWorking++)} 
                    setRef={item.ref}
                    reps={item.reps}
                    weight={item.weight}
                    recordIndex={numSets} 
                    onChange={updateCard}
            />)}
            else if(isRest(item.ref)) {
                return(<RestBlock key={index} minutes={item.ref.minutes} seconds={item.ref.seconds}/>);
            }
            else if(isNote(item.ref)) {
                return(<NoteBlock key={index} note={item.ref.text}/>);
            }
        })
    }, [exercise]);
    
    return (
        <ScrollView className='flex-1 w-full h-full bg-white p-4'>
            <View className='h-10 w-full mb-2 content-evenly border-b border-slate-200 flex-row justify-between'>
                <Text className="m-1 mt-3 ml-3 font-bold text-center">{exercise.name}</Text>
                {/* <Text style={currentSetsDone==maxSets.current?styling.greenText:styling.redText} className="m-1 mt-3 mr-3 font-bold"> {currentSetsDone} / {maxSets.current} Sets Done</Text> */}
            </View>
            {exerciseItems}
        </ScrollView>)
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


export default ConsumableExerciseCard;