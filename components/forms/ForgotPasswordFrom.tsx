"use client";

import type { TForgotPasswordFormSchema } from "@/lib/forms";

import { Button, Input, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash-es";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { forgotPasswordAction } from "@/actions/supabase";
import { CLIENT_ROUTES, EServerResponseCode } from "@/lib/constants";
import { ForgotPasswordFormSchema } from "@/lib/forms";
import { EAlertType } from "@/lib/types";
import useAlertStore from "@/stores/AlertStore";

export default function ForgotPasswordFrom() {
    const alertStore = useAlertStore();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TForgotPasswordFormSchema>({
        mode: "onChange",
        resolver: zodResolver(ForgotPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: TForgotPasswordFormSchema) => {
        try {
            setLoading(true);
            const response = await forgotPasswordAction(data);

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
            }
        } catch (error) {
            console.error("Forgot password failed:", error);
            alertStore.notify({
                message: "Failed to send verification link. Please try again",
                type: EAlertType.ERROR,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container self-center flex flex-col gap-4 max-w-xl">
            <div>
                <h1 className="text-2xl font-medium">Forgot Password</h1>
                <p className="text-sm text-foreground">
                    {`Remember your password? `}
                    <Link
                        className="text-primary font-medium underline text-md"
                        href={CLIENT_ROUTES.LOGIN}
                    >
                        Login
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

                <Button
                    color="primary"
                    disabled={loading}
                    isLoading={loading}
                    type="submit"
                >
                    Send Verification Link
                </Button>
            </form>
        </div>
    );
}
