/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import NoteBlock from './ExerciseNoteBlock';
import RestBlock from './ExerciseRestBlock';
import SetBlock from './ExerciseSetBlock';

{/**WILL CHANGE PROPS*/}
interface ExerciseCardProps {
    exerciseProp: Array<any>;
}


{/**WILL CHANGE PROPS*/}
const ExerciseCard:React.FC<ExerciseCardProps> = ({exerciseProp}) => {
    const [currentSetsDone, setCurrentSetDone] = React.useState<number>();
    const [maxSets, setMaxSets] = React.useState<number>();
    const [userInputReps, setUserInputReps] = React.useState<string>('');
    const [userInputWeight, setUserInputWeight] = React.useState<string>('');
    
    React.useState(() => {setCurrentSetDone},[userInputReps, userInputWeight])
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
                <Text className="m-1 mt-3 ml-3 font-bold text-center"> Deadlift</Text>
                <Text style={currentSetsDone==maxSets?styling.greenText:styling.redText} className="m-1 mt-3 mr-3 font-bold"> {currentSetsDone} / {maxSets} Sets Done</Text>
            </View>
            {/** TEST CODE, WILL REMOVE LATER */}
            <NoteBlock note="asd"/>
            <RestBlock minutes="1" seconds='30'/>
            <SetBlock setNumber={1} reps={'5-9'} rpe="10" orm="100%" warmup={false} getUserRecordedValue={(reps,weight) => {
                setUserInputReps(reps);
                setUserInputWeight(weight);
            }}/>
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

export default ExerciseCard;