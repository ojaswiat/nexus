"use client";

import useUserStore from "@/stores/UserStore";

// This component is just here to demonstrate the use of User Store that you can use to save and retrieve user information

export default function UserEmail() {
    const user = useUserStore((state) => state.user);

    return <p>Hey {user?.email ? `${user?.email}` : ""}!</p>;
}
