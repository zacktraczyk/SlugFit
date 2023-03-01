/* eslint-disable prettier/prettier */
import React, {useMemo, useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import NoteBlock from './blocks/ExerciseNoteBlock';
import RestBlock from './blocks/ExerciseRestBlock';
import SetBlock from './blocks/ExerciseSetBlock';
import { ConsumableExerciseData, EditableExerciseItem, ConsumableExerciseItem, ConsumableExercise } from '../types';
import {isSet, isNote, isRest} from '../utils/typeCheck';
import { useConsumableExercise } from '../hooks/useConsumableExercise';
import { getConsumableExercises, updateConsumableExercise } from '../utils/db/consumableexercises';
import PastWorkoutPerformance from './PastWorkoutPerformance';

/**
 * @param exercise inputs value to a card
 * @param getUserRecordedSets returns array of user input RecordedValue or undefined if user fails to fil out all values
 */
export interface ConsumableExerciseCardProps {
    exerciseName: string;
    consumableWorkoutId: string;
    userId: string;
}

const ConsumableExerciseCard: React.FC<ConsumableExerciseCardProps> = ({exerciseName, consumableWorkoutId, userId}) => {
    const { consumableExercise } = useConsumableExercise(exerciseName, consumableWorkoutId);
    const [exercise, setExercise] = useState<Partial<ConsumableExercise>>(consumableExercise);
    const [rerender, setRerender] = useState(false);
    const [exerciseItems, setExerciseItems] = useState<JSX.Element[]>([]);
    const [pastExerciseVisible, setpastExerciseVisible] = useState(false);
    const [pastExericises, setPastExericises] = useState<ConsumableExercise[]>()
    const [index, setIndex] = useState(0);
    const getPastConsumableExercises = async () =>{
        try{
            const data = await getConsumableExercises({userId,exerciseName})
            setPastExericises(data)
        }
        catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        setExercise(consumableExercise)
        getPastConsumableExercises()
    }, [consumableExercise])
    const renderConsumableExerciseItems=((currentExercise: Partial<ConsumableExercise>) => {
        let numWarmups = 0;
        let numWorking = 0;
        setExerciseItems(currentExercise.exerciseItems?.map((item: ConsumableExerciseItem, index: number) => { 
            const { ref, data } = item;
            if('warmup' in ref && 'reps' in ref && data && exercise.consumableWorkoutId && currentExercise.consumableWorkoutId) {
                console.log(data.reps,data.weight)
                return(<SetBlock 
                    currentWorkoutKey={currentExercise.consumableWorkoutId}
                    workoutKey={exercise.consumableWorkoutId}
                    key={index} 
                    index={index}
                    setNumber={'warmup' in ref && ref.warmup ? ++numWarmups : ++numWorking} 
                    setRef={ref}
                    reps={data?.reps}
                    weight={data?.weight}
                    bodyweight={data?.bodyweight}
                    onChange={updateExerciseCardItem}
            />)}
            else if('minutes' in ref && 'seconds' in ref) {
                return(<RestBlock key={index} minutes={ref.minutes} seconds={ref.seconds}/>);
            }
            else {
                return(<NoteBlock key={index} note={'text' in ref ? ref.text : ''}/>);
            }
        }) || [])
    });
    useEffect(() => {
        renderConsumableExerciseItems(exercise);
    }, [exercise, rerender]);

    const [fontsLoaded] = useFonts({
        BebasNeue_400Regular,
      });
    
      // Load font
      useFonts({
        BebasNeue_400Regular,
      });
    
    const updateExerciseCardItem = (index, payload: Partial<ConsumableExerciseData>) => {
        setExercise((oldExercise) => {
          if (oldExercise.exerciseItems) {
            const oldData = oldExercise.exerciseItems[index].data;
            oldExercise.exerciseItems[index].data = {
              reps: oldData?.reps || '0',
              weight: oldData?.weight || '0',
              bodyweight: oldData?.bodyweight || false,
              ...payload,
            };
          }
          updateConsumableExercise({ consumableWorkoutId, exerciseName, payload: oldExercise });
          return oldExercise;
        });
        
      };
    
    return (
        <><ScrollView className='flex-1 w-full h-full p-4 bg-white '>
                <View className='flex-row justify-between w-full h-10 mb-2 border-b content-evenly border-slate-200'>
                    <Text className="m-1 mt-3 ml-3 font-bold text-center ">{exercise.exerciseName}</Text>
                    {/* <Text style={currentSetsDone==maxSets.current?styling.greenText:styling.redText} className="m-1 mt-3 mr-3 font-bold"> {currentSetsDone} / {maxSets.current} Sets Done</Text> */}
                    <TouchableOpacity accessibilityRole="button"
                        onPress={() => setpastExerciseVisible(true)}
                        className="bg-white">
                                <Text className="m-1 mt-3 ml-3 text-sm font-bold text-center">View Past Performance</Text>
                                {pastExerciseVisible && pastExericises &&(
                <PastWorkoutPerformance
                    index={index}  
                    setIndex={setIndex}              
                    consumableExercise={pastExericises}
                    setModalVisible={(bool: boolean) => setpastExerciseVisible(bool)}
                    renderConsumableExercise={renderConsumableExerciseItems} />
            )}
                    </TouchableOpacity>
                </View>
                {exerciseItems}
            </ScrollView></>)
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
function calculateNumWorkingSets(arr: EditableExerciseItem[]): number { 
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
function calculateNumSets(arr: EditableExerciseItem[]): number {
    let numSets = 0;
    for(let i = 0; i<arr.length; i++) {
        if (isSet(arr[i])) {
            numSets++;
        }
    }    
    return numSets;
}


export default ConsumableExerciseCard;