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

type Exercise = {
  name: string;
  muscleGroup: string;
};

const ExerciseSearchBar: React.FC<ExerciseSearchBarProps> = ({
  onSelectExercise,
  hideBodyOnIdle,
}) => {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const searchArray = useRef<Exercise[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [searchOnFocus, setSearchOnFocus] = useState(false);
  if (searchInput.length > 0) {
    searchArray.current = [];
    const tempArr = allExercises.filter((exercise) => {
      let val = true;
      for (let i = 0; i < filters.length; i++) {
        val = val && exercise.muscleGroup.toLowerCase().includes(filters[i].toLowerCase());
      }
      return val && exercise.name.toLowerCase().includes(searchInput.toLowerCase());
    });
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
      const temp: Exercise[] = [];
      data.map((exercise) => {
        temp.push({ name: exercise.name, muscleGroup: exercise.muscle_group });
      });
      setAllExercises(temp);
    }
  }

  useEffect(() => {
    fetchExercises();
  }, []);

  const onPressHandler = (item: string) => {
    onSelectExercise(item);
    setSearchOnFocus(false);
  };

  return (
    <View className="z-50 w-screen items-center bg-white">
      <View className="mt-7 flex  h-12 w-11/12 flex-row justify-between rounded border border-slate-200 bg-white">
        <TextInput
          accessibilityLabel="Exercise Search Text Field "
          accessibilityHint="Input characters to search for an exercise"
          className=" text-l my-auto mx-5 border-black"
          autoCapitalize="none"
          placeholder="Search for an exercise"
          returnKeyType="next"
          value={searchInput}
          onFocus={() => {
            setSearchOnFocus(true);
          }}
          // onBlur={() => {
          //   setSearchOnFocus(false);
          // }}
          onChangeText={(value) => {
            setSearchInput(value);
          }}
        />
        <View className="mr-2">
          <ExerciseFilterModal
            onClose={(filterArr) => {
              setFilters(new Array(...filterArr));
            }}
          />
        </View>
      </View>
      {hideBodyOnIdle && !searchOnFocus ? null : (
        <View className="divide-y-10 absolute z-50 mt-20 h-60 w-11/12 overflow-scroll rounded border border-slate-200 bg-white">
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
                ) : null}
                <Text className="text-l mx-1 my-3 font-light ">All Exercises</Text>
                {allExercises
                  .filter((exercise) => {
                    let val = true;
                    for (let i = 0; i < filters.length; i++) {
                      val =
                        val &&
                        exercise.muscleGroup.toLowerCase().includes(filters[i].toLowerCase());
                    }
                    return val;
                  })
                  .map((item) => {
                    return (
                      <TouchableOpacity
                        accessibilityRole="button"
                        key={item.name}
                        onPress={() => onPressHandler(item.name)}
                        className="mb-1 rounded border border-slate-200 p-3"
                      >
                        <Text className="text-l font-bold">{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            ) : (
              <View className="mx-5 ">
                <Text className="my-1 text-xs font-light"> Search Result:</Text>
                {searchArray.current.map((item) => {
                  return (
                    <TouchableOpacity
                      accessibilityRole="button"
                      key={item.name}
                      onPress={() => onPressHandler(item.name)}
                      className="mb-1 rounded border border-slate-200 p-3"
                    >
                      <Text className="text-l font-bold ">{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>
          <View className="h-10 w-10"></View>
        </View>
      )}
    </View>
  );
};

export default ExerciseSearchBar;
