import type { Metadata } from "next";

import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

export const metadata: Metadata = {
    title: "Settings",
};

export default function SettingsPage() {
    return (
        <>
            <p className="text-xl">Change theme</p>
            <div className="flex gap-4 items-center mt-4">
                <p>Select Theme</p>
                <ThemeSwitcher />
            </div>
        </>
    );
}
