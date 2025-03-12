"use client";

import { Link } from "@heroui/react";
import { ArrowUpRight, InfoIcon } from "lucide-react";

export default function SmtpMessage() {
    return (
        <div className="bg-muted/50 px-5 py-3 border rounded-md flex gap-4 mt-8 mx-auto">
            <InfoIcon className="mt-0.5" size={16} />
            <div className="flex flex-col gap-1">
                <small className="text-sm text-foreground">
                    <strong> Note:</strong> Emails are rate limited. Enable
                    Custom SMTP to increase the rate limit.
                </small>
                <div>
                    <Link
                        isExternal
                        className="text-primary hover:text-primary flex items-center text-sm gap-1"
                        href="https://supabase.com/docs/guides/auth/auth-smtp"
                    >
                        Learn more <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
