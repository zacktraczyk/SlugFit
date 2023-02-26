import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { supabase } from '../utils/supabaseClient';
import Chip from './CustomChip';
import ExerciseFilterModal from './ExerciseFilterModal';

export type ExerciseSearchBarProps = {
  onSelectExercise: (exercise: string) => void;
  hideBodyOnIdle?: boolean;
};

const ExerciseSearchBar: React.FC<ExerciseSearchBarProps> = ({
  onSelectExercise,
  hideBodyOnIdle,
}) => {
  const [allExercises, setAllExercises] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const searchArray = useRef<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
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
    onSelectExercise(item);
  };

  return (
    <View className="h-full w-screen items-center bg-white">
      <View className="mt-7 flex  h-12 w-11/12 flex-row justify-between  rounded-t border-x border-t border-slate-200 bg-white">
        <TextInput
          accessibilityLabel="Exercise Search Text Field "
          accessibilityHint="Input characters to search for an exercise"
          className=" text-l my-auto mx-5 border-black"
          autoCapitalize="none"
          placeholder="Search for an exercise"
          returnKeyType="next"
          value={searchInput}
          onChangeText={(value) => {
            setSearchInput(value);
          }}
          autoFocus
        />
        <View className="mr-2">
          <ExerciseFilterModal
            onClose={(filterArr) => {
              setFilters(new Array(...filterArr));
            }}
          />
        </View>
      </View>
      {hideBodyOnIdle && searchInput.length <= 0 ? (
        <View className="h-1 w-11/12 border-t rounded border-slate-200"/>
      ) : (
        <View className="divide-y-10 invisible  h-60 w-11/12 overflow-scroll border border-slate-200 bg-white">
          <ScrollView keyboardShouldPersistTaps="always">
            {searchInput.length <= 0 ? (
              <View className="mx-5 ">
                {filters.length > 0 ? (
                  <View className="border-b-0.5 flex flex-row border-slate-400 pb-2">
                    <ScrollView horizontal={true}>
                      {filters.map((item) => {
                        return <Chip key={item} value={item} closeable={false} />;
                      })}
                      {/**END OF CHIP*/}
                    </ScrollView>
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
      )}
    </View>
  );
};

export default ExerciseSearchBar;
