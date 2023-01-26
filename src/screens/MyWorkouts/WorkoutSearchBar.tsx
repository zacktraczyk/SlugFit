import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Touchable, TouchableOpacity} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { supabase } from '../../utils/supabaseClient';



export const SearchBarWorkout: React.FC = () => {
    const [recentlyUsed, setRecentlyUsed] = useState(["Lat Pulldowns", "Barbell Row"]);
    const [allExercises, setAllExercises] = useState(["Deadlift", "Squat", "Bench press", "Barbell Row", "Shoulder Press", "Pull-ups", "Dips", "Bicep Curls", "Tricep Extensions", "Lateral Raises", "Lat Pulldowns"]);
    const [isSearching, setIsSearching] = useState(0);
    const searchArray = useRef(new Array());

    const searchResult = (inputText: string) => {
        if(inputText.length) {
            searchArray.current = new Array();
            let tempArr = allExercises.filter(exercise => exercise.toLowerCase().includes(inputText.toLowerCase()));
            tempArr.map(exercise => {searchArray.current.push(exercise)});
            setIsSearching(isSearching+1);
        } else {
            setIsSearching(0);
        }
    };

    
    let { data: exercises, error } = await supabase
    .from('exercises')
    .select('*')

hi i made this edit on feature temp
    const onClickHandler = (event, index) => {
        
    }

    return (
    <View className="h-screen bg-slate-50  w-full items-center shadow-sm">
        <View className="mt-7 h-12  w-11/12 bg-slate-50  rounded-t border-x border-t border-slate-200">
        <TextInput
                    
                    accessibilityLabel="Text input field"
                    accessibilityHint="Input email for login"
                    className=" border-black text-l my-auto mx-5"
                    autoCapitalize="none"
                    placeholder="Search for an exercise"
                    returnKeyType="next"
                    onChangeText={searchResult}
        />          
        </View> 
        <View className="h-60 w-11/12  bg-slate-50 divide-y-10 border border-slate-200 overflow-scroll invisible">
            <ScrollView>
                {(!isSearching)? 
                <View className='mx-5 '>
                <Text className="mx-1 my-3 text-l font-light">Recently Used</Text>
                { recentlyUsed.map( (item) => {return (
                <TouchableOpacity key={'recently-used-' + item} className="p-3 border border-slate-200 rounded mb-1">
                    <Text className="font-bold text-l ">
                        {item}
                    </Text>
                </TouchableOpacity>)})}
                <Text className="mx-1 my-3 text-l font-light">All Exercises</Text>
                {allExercises.map( (item) => {return (
                <TouchableOpacity key={item} className="p-3 border border-slate-200 rounded mb-1">
                    <Text className="font-bold text-l">
                        {item}
                    </Text>
                </TouchableOpacity>)})}
                </View> : 
                    <View className='mx-5 '>
                        <Text className="my-1 text-xs font-light"> Search Result:</Text>
                        {searchArray.current.map( (item) => {return (
                        <TouchableOpacity key={item} className="p-3 border border-slate-200 rounded mb-1">
                            <Text className="font-bold text-l ">
                                {item}
                            </Text>
                        </TouchableOpacity>)})}
                    </View>
                }       
            </ScrollView>
        </View>     
    </View>);
}
