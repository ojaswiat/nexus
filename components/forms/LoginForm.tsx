"use client";

import type { TLoginFormSchema } from "@/lib/forms";

import { Button, Input, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
import { isEmpty } from "lodash-es";
import { useState } from "react";
import { useForm } from "react-hook-form";

import GoogleSignin from "../buttons/GoogleSigninButton";

import { loginAction } from "@/actions/supabase";
import PasswordEye from "@/components/ui/PasswordEye";
import { CLIENT_ROUTES, EServerResponseCode } from "@/lib/constants";
import { LoginFormSchema } from "@/lib/forms";
import { EAlertType } from "@/lib/types";
import useAlertStore from "@/stores/AlertStore";
// import useUserStore from "@/stores/UserStore";

export default function LoginForm() {
    const alertStore = useAlertStore();
    // const userStore = useUserStore();
    // const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        // reset,
    } = useForm<TLoginFormSchema>({
        mode: "onChange",
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: TLoginFormSchema) => {
        try {
            setLoading(true);
            const response = await loginAction(data);

            if (
                !isEmpty(response) &&
                response.code === EServerResponseCode.FAILURE
            ) {
                alertStore.notify({
                    message: response.message,
                    type: EAlertType.ERROR,
                });
            }
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    function toggleShowPassword() {
        setShowPassword((prev) => !prev);
    }

    return (
        <div className="container self-center flex flex-col gap-4 max-w-xl">
            <div>
                <h1 className="text-2xl font-medium">Login</h1>
                <p className="text-sm text-foreground">
                    {`Don't have an account? `}
                    <Link
                        className="text-primary font-medium underline text-md"
                        href={CLIENT_ROUTES.SIGNUP}
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
            <form
                className="flex flex-col gap-y-4 mt-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    {...register("email")}
                    fullWidth
                    isRequired
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors?.email}
                    label="Email"
                    type="email"
                />
                <Input
                    {...register("password")}
                    fullWidth
                    isRequired
                    endContent={
                        <PasswordEye
                            showPassword={showPassword}
                            toggleShowPassword={toggleShowPassword}
                        />
                    }
                    errorMessage={errors.password?.message}
                    isInvalid={!!errors?.password}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                />
                <Button
                    color="primary"
                    disabled={loading}
                    isLoading={loading}
                    type="submit"
                >
                    Login
                </Button>
            </form>

            <p className="text-sm text-foreground">
                {`Can't remember your password? `}
                <Link
                    className="text-primary font-medium underline text-md"
                    href={CLIENT_ROUTES.FORGOT_PASSWORD}
                >
                    Reset
                </Link>
            </p>

            <p className="text-center">Or</p>

            <GoogleSignin />
        </div>
    );
}
