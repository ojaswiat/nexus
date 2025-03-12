"use client";

import { Button, Link } from "@heroui/react";

import { CLIENT_ROUTES } from "@/lib/constants";

type TAuthActionButtonProps = {
    disabled?: boolean;
};

function AuthActionButtons({ disabled }: TAuthActionButtonProps) {
    return (
        <div className="flex gap-2">
            <Button
                color="primary"
                disabled={disabled}
                size="sm"
                variant="bordered"
            >
                <Link
                    className="text-foreground"
                    color="primary"
                    href={CLIENT_ROUTES.LOGIN}
                >
                    Login
                </Link>
            </Button>
            <Button color="primary" disabled={disabled} size="sm">
                <Link className="text-white" href={CLIENT_ROUTES.SIGNUP}>
                    Sign up
                </Link>
            </Button>
        </div>
    );
}

export default AuthActionButtons;
