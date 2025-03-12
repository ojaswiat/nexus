import type { Metadata } from "next";

import UserEmail from "@/components/sections/UserEmail";

export const metadata: Metadata = {
    title: "Profile",
};

export default function ProfilePage() {
    return (
        <>
            <UserEmail />
        </>
    );
}
