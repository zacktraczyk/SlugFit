import { create, UseBoundStore, StoreApi } from 'zustand';

interface EditableWorkoutState {
  name: string;
  setName: (n: string) => void;
}

const useEditableWorkout: UseBoundStore<StoreApi<EditableWorkoutState>> =
  create<EditableWorkoutState>()((set) => ({
    name: '',
    setName: (n) => set({ name: n }),
  }));

export default useEditableWorkout;
