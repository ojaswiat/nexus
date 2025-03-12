"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { EAlertType } from "@/lib/types";
import useAlertStore from "@/stores/AlertStore";
import { createClient } from "@/utils/supabase/client";

export default function GoogleSignin() {
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
    const supabase = createClient();

    const alertStore = useAlertStore();

    // Check if the fragment contains the error_code parameter
    const hash = typeof window !== "undefined" ? window?.location?.hash : null; // e.g., "#error_code=2"
    const params = new URLSearchParams(hash?.replace("#", "")); // Remove '#' and parse the query part
    const errorDescription = params?.get?.("error_description"); // Get the 'error_code' value

    const next = searchParams.get("next");
    const loginFailed = searchParams.get("failed") || !!errorDescription;

    useEffect(() => {
        // Shows an alert when google sign in fails and remove the search params
        // Check the callback.ts file

        if (loginFailed) {
            alertStore.notify({
                type: EAlertType.ERROR,
                message: "Something went wrong! Please try again",
            });

            // Clears the search param "failed" so that when user reloads the page, it doesn't show alert again unnecessarily
            const nextSearchParams = new URLSearchParams(
                searchParams.toString(),
            );

            nextSearchParams.delete("failed");
            router.replace(`${pathname}?${nextSearchParams}`);
        }
    }, [loginFailed]);

    async function signInWithGoogle() {
        setIsGoogleLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback${
                        next ? `?next=${encodeURIComponent(next)}` : ""
                    }`,
                },
            });

            if (error) {
                throw error;
            }
        } catch (error) {
            alertStore.notify({
                type: EAlertType.ERROR,
                title: "Please try again.",
                message: "There was an error logging in with Google.",
            });
            console.error(error);
        } finally {
            setIsGoogleLoading(false);
        }
    }

    return (
        <Button
            className="w-full"
            color="primary"
            disabled={isGoogleLoading}
            isLoading={isGoogleLoading}
            type="button"
            variant="bordered"
            onPress={signInWithGoogle}
        >
            <Image
                alt="Google logo"
                className="mr-2"
                height={20}
                src="https://authjs.dev/img/providers/google.svg"
                width={20}
            />
            Sign in with Google
        </Button>
    );
}
