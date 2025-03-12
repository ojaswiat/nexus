import type { Metadata } from "next";

import SignupForm from "@/components/forms/SignupForm";
import SMTPMessage from "@/components/sections/SMTPMessage";

export const metadata: Metadata = {
    title: "Signup",
};

export default async function Signup() {
    return (
        <>
            <SignupForm />
            <SMTPMessage />
        </>
    );
}
