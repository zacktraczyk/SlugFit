import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Touchable, TouchableOpacity} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SearchBarProps } from 'react-native-screens';
import { supabase } from '../../utils/supabaseClient';

/**
 * @param selectedExercise.exercise //value set to exercise pressed
 * @param selectedExercise.isOk //if true, then value of exercise is valid, otherwise disregard
 */
export type SearchBarWorkoutProps = {
    selectedExercise: {exercise: string | undefined, isOk:boolean | undefined}
};

const SearchBarWorkout: React.FC<SearchBarWorkoutProps> = (prop: SearchBarWorkoutProps) => {
    const [allExercises, setAllExercises] = useState<string[]>([]);
    const [searchInput, setSearchInput] = useState("");
    const recentlyUsedExercise = useRef("");
    const searchArray = useRef(new Array());
    
    
    if(searchInput.length > 0) {
        searchArray.current = new Array();
        let tempArr = allExercises.filter(exercise => exercise.toLowerCase().includes(searchInput.toLowerCase()));
        tempArr.map(exercise => {searchArray.current.push(exercise)}); 
    }
    
    async function fetchExercises () {
        let { data, error } = await supabase
            .from('exercises')
            .select('*');
            if(error) {
                alert(error);
            }
            if(data != null) {
                let temp:string[] = [];
                data.map((exercise) => {temp.push(exercise.name)});
                setAllExercises(temp);
            }
    }

    useEffect(() => {
       fetchExercises();
    },[]);

    const onPressHandler = (item: string) => {
        recentlyUsedExercise.current = item;
        prop.selectedExercise.exercise = item;
        prop.selectedExercise.isOk = true;
        // <<----- Code to navigate back to parents page goes back here ----->>
        //
        //
    }

    return (
    <View className="bg-slate-50 h-full w-full items-center ">
        <View className="mt-7 h-12  w-11/12 bg-slate-50  rounded-t border-x border-t border-slate-200">
        <TextInput
                    
                    accessibilityLabel="Text input field"
                    accessibilityHint="Input email for login"
                    className=" border-black text-l my-auto mx-5"
                    autoCapitalize="none"
                    placeholder="Search for an exercise"
                    returnKeyType="next"
                    value={searchInput}
                    onChangeText={(value) => {setSearchInput(value)}}
        />          
        </View> 
        <View className="h-60 w-11/12  bg-slate-50 divide-y-10 border border-slate-200 overflow-scroll invisible">
            <ScrollView>
                {(searchInput.length <= 0)? 
                <View className='mx-5 '>
                    {(recentlyUsedExercise.current.length >0)?
                        <View>
                            <Text className="mx-1 my-3 text-l font-light">Recently Used</Text>
                            <TouchableOpacity key={'recently-used-' + recentlyUsedExercise.current} onPress={() => onPressHandler(recentlyUsedExercise.current)} className="p-3 border border-slate-200 rounded mb-1">
                                <Text className="font-bold text-l ">
                                    {recentlyUsedExercise.current}
                                </Text>
                            </TouchableOpacity>
                        </View>  
                    : <View /> 
                    } 
                <Text className="mx-1 my-3 text-l font-light ">All Exercises</Text>
                {allExercises.map( (item) => {return (
                <TouchableOpacity key={item} onPress={() => onPressHandler(item)} className="p-3 border border-slate-200 rounded mb-1">
                    <Text className="font-bold text-l">
                        {item}
                    </Text>
                </TouchableOpacity>)})}
                </View> : 
                    <View className='mx-5 '>
                        <Text className="my-1 text-xs font-light "> Search Result:</Text>
                        {searchArray.current.map( (item) => {return (
                        <TouchableOpacity key={item} onPress={() => onPressHandler(item)} className="p-3 border border-slate-200 rounded mb-1">
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

export default SearchBarWorkout;