"use client";

import type { TResetPasswordFormSchema } from "@/lib/forms";

import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash-es";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { resetPasswordAction } from "@/actions/supabase";
import PasswordEye from "@/components/ui/PasswordEye";
import { CLIENT_ROUTES, EServerResponseCode } from "@/lib/constants";
import { ResetPasswordFormSchema } from "@/lib/forms";
import { EAlertType } from "@/lib/types";
import useAlertStore from "@/stores/AlertStore";

export default function ResetPasswordForm() {
    const alertStore = useAlertStore();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TResetPasswordFormSchema>({
        mode: "onChange",
        resolver: zodResolver(ResetPasswordFormSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TResetPasswordFormSchema) => {
        try {
            setLoading(true);
            const response = await resetPasswordAction(data);

            if (
                isEmpty(response) ||
                response.code !== EServerResponseCode.SUCCESS
            ) {
                alertStore.notify({
                    message: response.message,
                    type: EAlertType.ERROR,
                });
            } else {
                reset();
                alertStore.notify({
                    message: response.message,
                    type: EAlertType.SUCCESS,
                });
                router.push(CLIENT_ROUTES.HOME);
            }
        } catch (error) {
            console.error("Password reset error:", error);
            alertStore.notify({
                message: "Password reset failed! Please try again",
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
        <div className="container self-center flex flex-col gap-4 max-w-xl mx-auto">
            <div>
                <h1 className="text-2xl font-medium">Reset Password</h1>
                <p className="text-sm text-foreground">Reset your password</p>
            </div>

            <form
                className="flex flex-col gap-y-4 mt-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
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
                    Save
                </Button>
            </form>
        </div>
    );
}
