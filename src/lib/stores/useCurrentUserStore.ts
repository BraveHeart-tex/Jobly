import type { CtxUserAttributes } from "@/lib/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CurrentUserStore {
  user: CtxUserAttributes | null;
  setUser: (user: CtxUserAttributes | null) => void;
  updateName: (firstName: string, lastName: string) => void;
}

export const useCurrentUserStore = create<
  CurrentUserStore,
  [["zustand/devtools", never]]
>(
  devtools(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateName: (firstName: string, lastName: string) => {
        const prevUser = get().user;
        if (!prevUser) return;
        set({
          user: {
            ...prevUser,
            firstName,
            lastName,
          },
        });
      },
    }),
    {
      name: "CurrentUserStore",
    },
  ),
);
