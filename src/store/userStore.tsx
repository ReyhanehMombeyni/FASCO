import { create } from 'zustand';

interface User {
  username: string;
  email: string;
};

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ 
    user,
    isLoggedIn: !!user
   }),
  clearUser: () => set({ 
    user: null,
    isLoggedIn: false
   }),
}));

