import type { GetCurrentUserReturnType } from "@/actions/auth";
import type { Nullable } from "@/lib/types";
import type { PersonalSettingsFormData } from "@/validators/user/profile/settings/personalSettingsFormValidator";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CurrentUserStore {
  user: Nullable<GetCurrentUserReturnType>;
  setUser: (user: Nullable<GetCurrentUserReturnType>) => void;
  updateName: (firstName: string, lastName: string) => void;
  updateAvatarUrl: (avatarUrl: string | null) => void;
  updatePersonalSettings: (data: PersonalSettingsFormData) => void;
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
      updateAvatarUrl: (avatarUrl: string | null) => {
        const prevUser = get().user;
        if (!prevUser) return;
        set({
          user: {
            ...prevUser,
            avatarUrl,
          },
        });
      },
      updatePersonalSettings: (data: PersonalSettingsFormData) => {
        const prevUser = get().user;
        if (!prevUser) return;
        set({
          user: {
            ...prevUser,
            ...data,
          },
        });
      },
    }),
    {
      name: "CurrentUserStore",
    },
  ),
);
