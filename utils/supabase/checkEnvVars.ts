// This check can be removed
// it is just for tutorial purposes

const HAS_ENV_VARS =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default HAS_ENV_VARS;
