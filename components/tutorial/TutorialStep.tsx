"use client";

import type { ReactNode } from "react";

import { Checkbox } from "@heroui/react";

export default function TutorialStep({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <li className="relative">
            <Checkbox
                className={`absolute top-[3px] mr-2 peer`}
                id={title}
                name={title}
            />
            <label
                className={`relative text-base text-foreground peer-checked:line-through font-medium`}
                htmlFor={title}
            >
                <span className="ml-8">{title}</span>
                <div
                    className={`ml-8 text-sm peer-checked:line-through font-normal text-muted-foreground`}
                >
                    {children}
                </div>
            </label>
        </li>
    );
}
