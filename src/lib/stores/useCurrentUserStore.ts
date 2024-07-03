import type { User } from "lucia";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CurrentUserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useCurrentUserStore = create<
  CurrentUserStore,
  [["zustand/devtools", never]]
>(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "CurrentUserStore",
    },
  ),
);
