"use client";

import { Button } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";

type TPasswordEyeProps = {
    showPassword: boolean;
    toggleShowPassword: () => void;
};

export default function PasswordEye({
    showPassword,
    toggleShowPassword,
}: TPasswordEyeProps) {
    return (
        <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => toggleShowPassword()}
        >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
        </Button>
    );
}
