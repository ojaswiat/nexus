"use client";

import { Badge } from "@heroui/react";

function EnvWarningBadge() {
    return (
        <Badge className="font-normal pointer-events-none">
            Please update .env.local file with anon key and url
        </Badge>
    );
}

export default EnvWarningBadge;
