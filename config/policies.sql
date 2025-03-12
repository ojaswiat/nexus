-- ============================================================================
-- Row Level Security Setup for Profiles and Todos tables
-- ============================================================================

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Enable RLS on todos table
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Policies for profiles table
-- ============================================================================

-- Policy: Allow users to read their own profile
CREATE POLICY read_own_profile ON profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Policy: Allow users to update their own profile
CREATE POLICY update_own_profile ON profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- Policy: Allow users to delete their own profile
CREATE POLICY delete_own_profile ON profiles
    FOR DELETE
    USING (auth.uid() = id);

-- ============================================================================
-- Policies for todos table
-- ============================================================================

-- Policy: Allow users to create todos linked to their user_id
CREATE POLICY create_own_todos ON todos
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy: Allow users to read their own todos
CREATE POLICY read_own_todos ON todos
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Allow users to update their own todos
CREATE POLICY update_own_todos ON todos
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy: Allow users to delete their own todos
CREATE POLICY delete_own_todos ON todos
    FOR DELETE
    USING (auth.uid() = user_id);