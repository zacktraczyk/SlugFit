/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import NoteBlock from './blocks/ExerciseNoteBlock';
import RestBlock from './blocks/ExerciseRestBlock';
import SetBlock from './blocks/ExerciseSetBlock';
import { Exercise, ExerciseItem, RecordedValue } from '../../types';
import {isSet, isNote, isRest} from '../utils/typeCheck';
{/**WILL CHANGE PROPS*/}
/**
 * @param exercise inputs value to a card
 * @param getUserRecordedValue returns array of user input RecordedValue or undefined if user fails to fil out all values
 */
export interface ExerciseCardProps {
    exercise: Exercise;
    getUserRecordedSets: () => (RecordedValue[] | undefined);
}


{/**WILL CHANGE PROPS*/}
const ExerciseCard:React.FC<ExerciseCardProps> = ({exercise}) => {
    const maxSets = React.useRef(calculateNumWorkingSets(exercise.items));
    const [currentSetsDone, setCurrentSetDone] = React.useState<number>(0);
    const [userInputReps, setUserInputReps] = React.useState<string>('');
    const [userInputWeight, setUserInputWeight] = React.useState<string>('');
    let workingSetIndex = 1;
    let warmUpSetIndex = 1;
    React.useEffect(() => {maxSets.current = calculateNumWorkingSets(exercise.items);},[exercise]);
    
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
            {/** TEST CODE, WILL REMOVE LATER */}
            {exercise.items.map((item, index) => { 
                if(isSet(item)) {
                    return(<SetBlock key={index} setNumber={(item.warmup?warmUpSetIndex++:workingSetIndex++)} reps={item.reps} rpe={item.rpe} orm={item.orm} warmup={item.warmup}/>);
                }
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
            {/** END OF TEST CODE, WILL REMOVE LATER */}
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

export default ExerciseCard;