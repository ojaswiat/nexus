import type { ReactNode } from "react";

import { isEmpty } from "lodash-es";
import { redirect } from "next/navigation";

import { CLIENT_ROUTES } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";

export default async function WithAuthLayout({
    children,
}: {
    children: ReactNode;
}) {
    /*
     * This layout ensures that the user is logged in.
     * This is also ensured in the supabase/middleware.ts
     * Be careful while placing your routes in app folder.
     */

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || isEmpty(data?.user)) {
        redirect(CLIENT_ROUTES.LOGIN);
    }

    return <div className="p-4">{children}</div>;
}
