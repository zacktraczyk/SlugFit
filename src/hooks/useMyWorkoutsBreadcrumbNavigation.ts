import { create, UseBoundStore, StoreApi } from 'zustand';

interface MyWorkoutsBreadcrumbNavigationState {
  workoutName: string | undefined;
  setWorkoutName: (n: string | undefined) => void;
  exerciseName: string | undefined;
  setExerciseName: (n: string | undefined) => void;
}

const useMyWorkoutsBreadcrumbNavigation: UseBoundStore<
  StoreApi<MyWorkoutsBreadcrumbNavigationState>
> = create<MyWorkoutsBreadcrumbNavigationState>()((set) => ({
  workoutName: '',
  setWorkoutName: (n) => set({ workoutName: n }),
  exerciseName: '',
  setExerciseName: (n) => set({ exerciseName: n }),
}));

export default useMyWorkoutsBreadcrumbNavigation;
