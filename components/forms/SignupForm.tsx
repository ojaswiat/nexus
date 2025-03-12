"use client";

import { Button, Input, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash-es";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signupAction } from "@/actions/supabase";
import GoogleSignin from "@/components/buttons/GoogleSigninButton";
import PasswordEye from "@/components/ui/PasswordEye";
import { CLIENT_ROUTES, EServerResponseCode } from "@/lib/constants";
import { SignupFormSchema, type TSignupFormSchema } from "@/lib/forms";
import { EAlertType } from "@/lib/types";
import useAlertStore from "@/stores/AlertStore";

export default function SignupForm() {
    const alertStore = useAlertStore();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TSignupFormSchema>({
        mode: "onChange",
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TSignupFormSchema) => {
        try {
            setLoading(true);
            const response = await signupAction(data);

            if (
                isEmpty(response) ||
                response.code !== EServerResponseCode.SUCCESS
            ) {
                alertStore.notify({
                    message: "Failed to signup",
                    type: EAlertType.ERROR,
                });
            } else {
                reset();
                alertStore.notify({
                    message: response.message,
                    type: EAlertType.SUCCESS,
                });
            }
        } catch (error) {
            console.error("Signup failed:", error);
            alertStore.notify({
                message: "Failed to signup",
                type: EAlertType.ERROR,
            });
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
                <h1 className="text-2xl font-medium">Signup</h1>
                <p className="text-sm text-foreground">
                    {`Already have an account? `}
                    <Link
                        className="text-primary font-medium underline text-md"
                        href={CLIENT_ROUTES.LOGIN}
                    >
                        Login
                    </Link>
                </p>
            </div>
            <form
                className="flex flex-col gap-y-4 mt-4 w-full"
                onSubmit={() => handleSubmit(onSubmit)}
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

                <Input
                    {...register("confirmPassword")}
                    fullWidth
                    isRequired
                    endContent={
                        <PasswordEye
                            showPassword={showPassword}
                            toggleShowPassword={toggleShowPassword}
                        />
                    }
                    errorMessage={errors.confirmPassword?.message}
                    isInvalid={!!errors?.confirmPassword}
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                />

                <Button
                    color="primary"
                    disabled={loading}
                    isLoading={loading}
                    type="submit"
                >
                    Sign Up
                </Button>
            </form>

            <p className="text-center">Or</p>

            <GoogleSignin />
        </div>
    );
}
