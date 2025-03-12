"use client";

import { EAlertType } from "@/lib/types";
import useAlertStore from "@/stores/AlertStore";
import { Button } from "@heroui/react";

export default function CheckAlert() {
    const alertStore = useAlertStore();

    function showAlert() {
        alertStore.notify({
            type: EAlertType.SUCCESS,
            message: "I am a success alert!",
        });
    }

    return (
        <Button variant="solid" color="primary" onPress={showAlert}>
            Check Alert
        </Button>
    );
}
