import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CtxUserAttributes } from "../auth";

interface CurrentUserStore {
  user: CtxUserAttributes | null;
  setUser: (user: CtxUserAttributes | null) => void;
}

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
