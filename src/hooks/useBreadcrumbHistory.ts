import { create, UseBoundStore, StoreApi } from 'zustand';
import { EditableWorkout, Exercise } from '../types';

interface BreadcrumbHistoryState {
  workout: EditableWorkout | undefined;
  setWorkout: (w: EditableWorkout | undefined) => void;
  exercise: Exercise | undefined;
  setExercise: (e: Exercise | undefined) => void;
}

const useBreadcrumbHistory: UseBoundStore<StoreApi<BreadcrumbHistoryState>> =
  create<BreadcrumbHistoryState>()((set) => ({
    workout: undefined,
    setWorkout: (w) => set({ workout: w }),
    exercise: undefined,
    setExercise: (e) => set({ exercise: e }),
  }));

export default useBreadcrumbHistory;
