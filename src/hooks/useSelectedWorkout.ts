import { create, UseBoundStore, StoreApi } from 'zustand';
import { EditableWorkout } from '../types/EditableWorkout';
import { Exercise } from '../types/Exercise';

interface SelectedWorkoutState {
  workout: EditableWorkout | undefined;
  setWorkout: (w: EditableWorkout | undefined) => void;
  exercise: Exercise | undefined;
  setExercise: (e: Exercise | undefined) => void;
}

const useSelectedWorkout: UseBoundStore<StoreApi<SelectedWorkoutState>> =
  create<SelectedWorkoutState>()((set) => ({
    workout: undefined,
    setWorkout: (w) => set({ workout: w }),
    exercise: undefined,
    setExercise: (e) => set({ exercise: e }),
  }));

export default useSelectedWorkout;
