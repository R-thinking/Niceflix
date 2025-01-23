import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TModalID = "HOME_USAGE_NOTICE" | "LOGIN_INFO_NOTICE";

interface IUserState {
  isLogin: boolean;
  setLogin: () => void;
  setSignOut: () => void;
  dontOpenAgainModalIds: {
    [modalID in TModalID]?: string;
  };
  addDontOpenModal: (modalID: TModalID) => void;
  deleteDontOpenModal: (modalID: TModalID) => void;
}

export const userStore = create<IUserState>()(
  persist(
    (set, get) => ({
      isLogin: false,
      setLogin: () => {
        set({ isLogin: true });
      },
      setSignOut: () => {
        set({ isLogin: false });
      },
      dontOpenAgainModalIds: {},
      addDontOpenModal: (modalID: TModalID) => {
        return set({
          dontOpenAgainModalIds: {
            ...get().dontOpenAgainModalIds,
            [modalID]: new Date().toString(),
          },
        });
      },
      deleteDontOpenModal: (modalID: TModalID) => {
        const modalIDs = get().dontOpenAgainModalIds;
        delete modalIDs[modalID];
        return set({
          dontOpenAgainModalIds: {
            ...modalIDs,
          },
        });
      },
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
