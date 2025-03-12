"use client";

import { Button } from "@heroui/react";
import { useState } from "react";

import { signOutAction } from "@/actions/supabase";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);

    async function onLogout() {
        setLoading(true);
        await signOutAction();
        setLoading(false);
    }

    return (
        <form action={onLogout}>
            <Button isLoading={loading} type="submit" variant="bordered">
                Logout
            </Button>
        </form>
    );
}
