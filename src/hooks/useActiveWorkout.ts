import { create, StoreApi, UseBoundStore } from 'zustand';
import {
  ConsumableExercise,
  ConsumableExerciseData,
  ConsumableExerciseItem,
  ConsumableWorkout,
  EditableExerciseItem,
} from '../types';
import { getEditableWorkout } from '../utils/db/editableworkouts';
import { getEditableExercises } from '../utils/db/editableexercises';
import { isSet } from '../utils/typeCheck';
import { createConsumableWorkoutFromLocal } from '../utils/db/consumableworkouts';

export type LocalConsumableWorkout = Pick<ConsumableWorkout, 'name' | 'exercises' | 'created_by'>;

export type LocalConsumableExercise = Pick<
  ConsumableExercise,
  'exerciseName' | 'exerciseItems' | 'created_by'
>;

interface ActiveWorkoutState {
  isReady: boolean;
  isActive: boolean;
  workout: LocalConsumableWorkout;
  exercises: LocalConsumableExercise[];
  started_at: Date;
  ended_at: Date;

  /**
   * Readys up the API by
   * Converting an editable workout to a consumable one
   * and saving it to be used when started
   * @param editableWorkoutId
   * @param userId
   * @returns
   */
  ready: (editableWorkoutId: string, userId: string) => void;

  /**
   * Starts the workout by getting saving the start time
   * @returns
   */
  start: () => void;

  /**
   * Updates an exercise item in the appropriate index with the new data
   * @param exerciseName
   * @param itemIndex
   * @param item
   * @returns
   */
  updateExerciseItem: (
    exerciseName: string,
    itemIndex: number,
    data: ConsumableExerciseData
  ) => void;

  /**
   * Stops a workout by saving the end time
   * @returns
   */
  stop: () => void;

  /**
   * Saves a consumable workout to supabase and clears the store
   * @returns
   */
  save: () => void;

  /**
   * Discards the workout and clears the store
   * @returns
   */
  discard: () => void;

  /**
   * Clears all data in the story and sets ready and active flags to false
   * @returns
   */
  clear: () => void;
}

const initialState: Pick<
  ActiveWorkoutState,
  'isReady' | 'isActive' | 'workout' | 'started_at' | 'ended_at' | 'exercises'
> = {
  isReady: false,
  isActive: false,
  workout: {
    name: '',
    exercises: [],
    created_by: '',
  },
  started_at: new Date(),
  ended_at: new Date(),
  exercises: [],
};

export const useActiveWorkout: UseBoundStore<StoreApi<ActiveWorkoutState>> =
  create<ActiveWorkoutState>()((set, get) => ({
    ...initialState,
    ready: async (editableWorkoutId: string, userId: string) => {
      const _workout = await getEditableWorkout({ editableWorkoutId });

      const _exercises = await getEditableExercises({ userId, editableWorkoutId });

      set(() => {
        return {
          workout: {
            name: _workout.name,
            exercises: _workout.exercises,
            ended_at: null,
            created_by: userId,
          } as LocalConsumableWorkout,
          exercises: _exercises.map((exercise) => ({
            exerciseName: exercise.exerciseName,
            exerciseItems: exercise.exerciseItems.map(
              (item: EditableExerciseItem) =>
                ({
                  ref: item,
                  data: { reps: '', weight: '', bodyweight: false },
                } as ConsumableExerciseItem)
            ),
            created_by: userId,
          })) as LocalConsumableExercise[],
          isReady: true,
        };
      });
    },

    start: () => {
      const { isReady, isActive } = get();
      if (!isReady || isActive) return;
      set(() => ({
        isActive: true,
        stared_at: new Date(),
      }));
    },

    updateExerciseItem: (exerciseName: string, itemIndex: number, data: ConsumableExerciseData) => {
      const { isReady, isActive, exercises } = get();
      if (!isReady || !isActive) return;
      const idx = exercises.findIndex((e) => e.exerciseName === exerciseName);
      if (idx === -1) return;
      if (
        itemIndex in exercises[idx].exerciseItems &&
        isSet(exercises[idx].exerciseItems[itemIndex].ref)
      ) {
        set((state) => {
          const copy = state.exercises.slice();
          copy[idx].exerciseItems[itemIndex].data = data;
          return {
            exercises: copy,
          };
        });
      }
    },

    stop: () => {
      set(() => ({
        isActive: false,
        ended_at: new Date(),
      }));
    },

    save: async () => {
      await createConsumableWorkoutFromLocal({
        userId: get().workout.created_by,
        workout: get().workout,
        started_at: get().started_at,
        ended_at: get().ended_at,
        exercises: get().exercises,
      });
      get().clear();
    },

    discard: () => {
      get().clear();
    },

    clear: () => {
      set(() => initialState);
    },
  }));
