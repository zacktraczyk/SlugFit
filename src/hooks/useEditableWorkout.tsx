import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { EditableWorkout } from '../types/EditableWorkout';
import { Exercise } from '../types/Exercise';

export const useEditableWorkout = (id) => {
  if (id === null || id === undefined) return {};
  const [listening, setListening] = useState<boolean>(false);
  const [workout, setWorkout] = useState<EditableWorkout>({ id });

  const listen = () => {
    const workoutChannel = supabase.channel('workout-channel');

    workoutChannel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'workouts', filter: `id=eq.${id}` },
      (payload) => {
        setWorkout(payload.new as EditableWorkout);
      }
    );

    workoutChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        setListening(true);
      }
    });

    return () => {
      supabase.removeChannel(workoutChannel);
      setListening(false);
    };
  };

  const fetch = async () => {
    try {
      const { data, error } = await supabase.from('workouts').select('*').eq('id', id).single();
      if (error) throw error;

      setWorkout(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch();
    const unsubscribe = listen();
    return unsubscribe;
  }, [id]);

  return { workout, listening };
};

export const createEditableWorkout = async (
  session: Session | null
): Promise<EditableWorkout | undefined> => {
  if (session === undefined || session === null) return undefined;

  const user: User = session.user;

  try {
    const { data, error } = await supabase
      .from('workouts')
      .insert({ name: '', created_by: user.id })
      .select(`id`)
      .single();
    if (error) throw error;

    return data as EditableWorkout;
  } catch (error) {
    console.error(error);
  }
};

export const deleteEditableWorkout = async (id: string) => {
  try {
    const { error } = await supabase.from('workouts').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

export const updateEditableWorkout = async (payload: EditableWorkout) => {
  try {
    const { error } = await supabase.from('workouts').update(payload).eq('id', payload.id);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

export const getExercisesInWorkout = async (workout: EditableWorkout): Promise<Array<Exercise>> => {
  try {
    const { error, data } = await supabase
      .from('workouts')
      .select('exercises')
      .eq('id', workout.id)
      .single();

    if (error) throw error;

    const exercises: Array<Exercise> = data?.exercises;
    return exercises;
  } catch (error) {
    console.error(error);
  }
  return [];
};

const insertOrUpdateExercise: (id: string, e: Exercise, es: Array<Exercise>) => Array<Exercise> = (
  identifier,
  exercise,
  exercises
) => {
  const shouldCheckForDuplicates = identifier !== exercise.name;

  if (shouldCheckForDuplicates) {
    const elem = exercises.find((e) => e.name === exercise.name);
    if (elem) throw 'Cannot add duplicate exercise';
  }

  let found = false;
  for (let i = 0; i < exercises.length; i++) {
    if (exercises[i].name === identifier) {
      exercises[i] = exercise;
      found = true;
    }
  }

  if (!found) exercises.push(exercise);

  return exercises;
};

/**
 *
 * @param identifier name of exercise before change, used to find the current one in supabase
 * @param exercise
 * @param workout
 */
export const updateExerciseInWorkout = async (
  identifier: string,
  exercise: Exercise,
  workout: EditableWorkout
) => {
  let exercises: Array<Exercise> = await getExercisesInWorkout(workout);

  exercises = insertOrUpdateExercise(identifier, exercise, exercises);

  try {
    const { error } = await supabase.from('workouts').update({ exercises }).eq('id', workout.id);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};
