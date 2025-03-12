import type { TAlert } from "@/lib/types";

import { filter } from "lodash-es";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

type TAlertStore = {
    alerts: TAlert[];
    notify: (alert: Omit<TAlert, "id">) => void;
    removeAlert: (id: string) => void;
};

const DEFAULT_ALERT_DURATION = 5000;

const useAlertStore = create<TAlertStore>((set) => ({
    alerts: [],

    notify: (alert) => {
        const id = uuidv4();
        const newAlert = { ...alert, id };

        set((state) => ({
            alerts: [...state.alerts, newAlert],
        }));

        // Auto-dismiss after duration
        setTimeout(() => {
            set((state) => ({
                alerts: filter(state.alerts, (a) => a.id !== id),
            }));
        }, alert.duration ?? DEFAULT_ALERT_DURATION);
    },

    removeAlert: (id) => {
        set((state) => ({
            alerts: filter(state.alerts, (alert) => alert.id !== id),
        }));
    },
}));

export default useAlertStore;
