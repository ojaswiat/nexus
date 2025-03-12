import type { TUser } from "@/lib/types";
import type { ReactNode } from "react";

import { Geist } from "next/font/google";

import Providers from "./providers";

import AppFooter from "@/components/sections/AppFooter";
import TopNavbar from "@/components/sections/TopNavbar";
import AlertNotify from "@/components/ui/AlertNotify";
import NavigationProgress from "@/components/ui/NavigationProgress";
import "@/global/styles/global.scss";
import { createClient } from "@/utils/supabase/server";
import "./globals.css";

// Vercel sets it's own environment variables when deployed
const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: {
        template: "%s | Nexus",
        default: "Nexus",
    },
    description: "NextJS Supabase Starter",
};

const geistSans = Geist({
    display: "swap",
    subsets: ["latin"],
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <html
            suppressHydrationWarning
            className={`${geistSans.className} h-screen w-screen`}
            lang="en"
        >
            <body className="w-full h-full flex flex-col">
                <Providers>
                    <NavigationProgress />
                    <AlertNotify />
                    <TopNavbar user={user as TUser} />
                    <main className="w-full h-[85%] overflow-y-scroll bg-background text-foreground flex flex-col pt-4">
                        {children}
                    </main>
                    <AppFooter />
                </Providers>
            </body>
        </html>
    );
}
