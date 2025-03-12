"use client";

import useAlertStore from "@/stores/AlertStore";
import { Alert } from "@heroui/react";

export default function AlertNotify() {
    const alerts = useAlertStore((state) => state.alerts);
    const removeAlert = useAlertStore((state) => state.removeAlert);

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-lg px-4">
            {alerts.map((alert) => (
                <Alert
                    key={alert.id}
                    color={alert.type ?? "secondary"}
                    variant="solid"
                    title={alert.title ?? ""}
                    description={alert.message ?? ""}
                    className="w-full shadow-lg text-white slide-down"
                    isClosable={alert.closable}
                    onClose={
                        alert.closable
                            ? () => alert.id && removeAlert(alert.id)
                            : undefined
                    }
                />
            ))}
        </div>
    );
}
