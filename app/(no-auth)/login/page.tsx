import type { Metadata } from "next";

import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
    title: "Login",
};

export default async function Login() {
    return (
        <>
            <LoginForm />
        </>
    );
}
