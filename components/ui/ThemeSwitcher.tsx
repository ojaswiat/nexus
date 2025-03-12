"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/react";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const ICON_SIZE = 16;

    return (
        <Dropdown className="bg-background border border-primary">
            <DropdownTrigger asChild>
                <Button variant="bordered" color="primary" isIconOnly>
                    {theme === "light" ? (
                        <Sun
                            key="light"
                            className={"text-muted-foreground"}
                            size={ICON_SIZE}
                        />
                    ) : theme === "dark" ? (
                        <Moon
                            key="dark"
                            className={"text-muted-foreground"}
                            size={ICON_SIZE}
                        />
                    ) : (
                        <Laptop
                            key="system"
                            className={"text-muted-foreground"}
                            size={ICON_SIZE}
                        />
                    )}
                </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(e) => setTheme(e as string)}>
                <DropdownItem
                    className={`flex gap-2 ${theme === "light" ? "border border-primary" : ""}`}
                    key="light"
                >
                    <Sun className="text-muted-foreground" size={ICON_SIZE} />
                    <span>Light</span>
                </DropdownItem>
                <DropdownItem
                    className={`flex gap-2 ${theme === "dark" ? "border border-primary" : ""}`}
                    key="dark"
                >
                    <Moon className="text-muted-foreground" size={ICON_SIZE} />
                    <span>Dark</span>
                </DropdownItem>
                <DropdownItem
                    className={`flex gap-2 ${theme === "system" ? "border border-primary" : ""}`}
                    key="system"
                >
                    <Laptop
                        className="text-muted-foreground"
                        size={ICON_SIZE}
                    />
                    <span>System</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
