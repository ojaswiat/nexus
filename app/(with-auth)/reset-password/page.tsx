import type { Metadata } from "next";

import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export const metadata: Metadata = {
    title: "Reset Password",
};

export default async function ResetPassword() {
    return <ResetPasswordForm />;
}
