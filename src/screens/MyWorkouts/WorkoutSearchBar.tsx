import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { supabase } from '../../utils/supabaseClient';

/**
 * @param selectedExercise.exercise //value set to exercise pressed
 * @param selectedExercise.isOk //if true, then value of exercise is valid, otherwise disregard
 */
export type SearchBarWorkoutProps = {
  selectedExercise: { exercise: string | undefined; isOk: boolean | undefined };
};

const SearchBarWorkout: React.FC<SearchBarWorkoutProps> = (prop: SearchBarWorkoutProps) => {
  const [allExercises, setAllExercises] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const recentlyUsedExercise = useRef('');
  const searchArray = useRef<string[]>([]);

  if (searchInput.length > 0) {
    searchArray.current = [];
    const tempArr = allExercises.filter((exercise) =>
      exercise.toLowerCase().includes(searchInput.toLowerCase())
    );
    tempArr.map((exercise) => {
      searchArray.current.push(exercise);
    });
  }

  async function fetchExercises() {
    const { data, error } = await supabase.from('exercises').select('*');
    if (error) {
      alert(error);
    }
    if (data != null) {
      const temp: string[] = [];
      data.map((exercise) => {
        temp.push(exercise.name);
      });
      setAllExercises(temp);
    }
  }

  useEffect(() => {
    fetchExercises();
  }, []);

  const onPressHandler = (item: string) => {
    recentlyUsedExercise.current = item;
    prop.selectedExercise.exercise = item;
    prop.selectedExercise.isOk = true;
    // <<----- Code to navigate back to parents page goes back here ----->>
    //
    //
  };

  return (
    <View className="h-full w-full items-center bg-slate-50 ">
      <View className="mt-7 h-12  w-11/12 rounded-t  border-x border-t border-slate-200 bg-slate-50">
        <TextInput
          accessibilityLabel="Text input field"
          accessibilityHint="Input email for login"
          className=" text-l my-auto mx-5 border-black"
          autoCapitalize="none"
          placeholder="Search for an exercise"
          returnKeyType="next"
          value={searchInput}
          onChangeText={(value) => {
            setSearchInput(value);
          }}
        />
      </View>
      <View className="divide-y-10 invisible  h-60 w-11/12 overflow-scroll border border-slate-200 bg-slate-50">
        <ScrollView>
          {searchInput.length <= 0 ? (
            <View className="mx-5 ">
              {recentlyUsedExercise.current.length > 0 ? (
                <View>
                  <Text className="text-l mx-1 my-3 font-light">Recently Used</Text>
                  <TouchableOpacity
                    accessibilityRole="button"
                    key={'recently-used-' + recentlyUsedExercise.current}
                    onPress={() => onPressHandler(recentlyUsedExercise.current)}
                    className="mb-1 rounded border border-slate-200 p-3"
                  >
                    <Text className="text-l font-bold ">{recentlyUsedExercise.current}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
              <Text className="text-l mx-1 my-3 font-light ">All Exercises</Text>
              {allExercises.map((item) => {
                return (
                  <TouchableOpacity
                    accessibilityRole="button"
                    key={item}
                    onPress={() => onPressHandler(item)}
                    className="mb-1 rounded border border-slate-200 p-3"
                  >
                    <Text className="text-l font-bold">{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View className="mx-5 ">
              <Text className="my-1 text-xs font-light "> Search Result:</Text>
              {searchArray.current.map((item) => {
                return (
                  <TouchableOpacity
                    accessibilityRole="button"
                    key={item}
                    onPress={() => onPressHandler(item)}
                    className="mb-1 rounded border border-slate-200 p-3"
                  >
                    <Text className="text-l font-bold ">{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchBarWorkout;
