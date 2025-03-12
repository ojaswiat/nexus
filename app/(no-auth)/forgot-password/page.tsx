import type { Metadata } from "next";

import ForgotPasswordFrom from "@/components/forms/ForgotPasswordFrom";
import SmtpMessage from "@/components/sections/SMTPMessage";

export const metadata: Metadata = {
    title: "Forgot Password",
};

export default async function ForgotPassword() {
    return (
        <>
            <ForgotPasswordFrom />
            <SmtpMessage />
        </>
    );
}
