import { create } from "zustand";

interface LoginStates {
  sesh_id: string;
  isLoggedIn: boolean;
  bears: number;
}

interface LoginActions {
  setSessionId: (seshId: string) => void;

  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

const useLoginStore = create<LoginStates & LoginActions>((set) => ({
  isLoggedIn: false,
  request_token: "",
  sesh_id: "as",
  bears: 12,
  setSessionId: (seshId) => set({ sesh_id: seshId }),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

export default useLoginStore;
