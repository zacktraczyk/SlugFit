import { create, UseBoundStore, StoreApi } from 'zustand';

interface EditWorkoutState {
  name: string;
  setName: (n: string) => void;
}

const useEditWorkout: UseBoundStore<StoreApi<EditWorkoutState>> = create<EditWorkoutState>()(
  (set) => ({
    name: '',
    setName: (n) => set({ name: n }),
  })
);

export default useEditWorkout;
