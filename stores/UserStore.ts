import type { TUser } from "@/lib/types";

import { create } from "zustand";

import { createClient } from "@/utils/supabase/client";

type TUserStore = {
    user: TUser | null;

    fetchUserDetails: () => void;
};

const useUserStore = create<TUserStore>((set) => ({
    user: {
        email: "",
    },

    fetchUserDetails: async () => {
        const supabase = createClient();
        const {
            data: { user: userInfo },
        } = await supabase.auth.getUser();

        set(() => ({
            user: userInfo as TUser,
        }));
    },
}));

export default useUserStore;
