import { isEmpty } from "lodash-es";
import { NextResponse } from "next/server";

import { CLIENT_ROUTES } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    // The `/auth/callback` route is required for the server-side auth flow implemented
    // by the SSR package. It exchanges an auth code for the user's session.
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const origin = requestUrl.origin;
    const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

    if (code) {
        const supabase = await createClient();

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!isEmpty(error)) {
            return NextResponse.redirect(
                `${origin}${CLIENT_ROUTES.LOGIN}?failed=true`,
            );
        }
    }

    if (redirectTo) {
        return NextResponse.redirect(`${origin}${redirectTo}`);
    }

    // URL to redirect to after sign up process completes
    return NextResponse.redirect(`${origin}${CLIENT_ROUTES.DASHBOARD}`);
}
