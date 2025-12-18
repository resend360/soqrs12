-- Fix RLS Policies for Vehicles and Users tables
-- Run this to enable proper INSERT/UPDATE permissions

-- ============================================================================
-- VEHICLES TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own vehicles" ON vehicles;
DROP POLICY IF EXISTS "Users can insert their own vehicles" ON vehicles;
DROP POLICY IF EXISTS "Users can update their own vehicles" ON vehicles;
DROP POLICY IF EXISTS "Users can delete their own vehicles" ON vehicles;

-- Create proper policies
CREATE POLICY "Users can view their own vehicles"
  ON vehicles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own vehicles"
  ON vehicles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vehicles"
  ON vehicles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vehicles"
  ON vehicles FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- USERS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view all profiles" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;

-- Create proper policies
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================================
-- QR_CODES TABLE RLS POLICIES (for vehicle QR generation)
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own QR codes" ON qr_codes;
DROP POLICY IF EXISTS "Users can insert their own QR codes" ON qr_codes;
DROP POLICY IF EXISTS "Users can update their own QR codes" ON qr_codes;
DROP POLICY IF EXISTS "Anyone can view active QR codes" ON qr_codes;

-- Create proper policies
CREATE POLICY "Users can view their own QR codes"
  ON qr_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view active QR codes"
  ON qr_codes FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can insert their own QR codes"
  ON qr_codes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own QR codes"
  ON qr_codes FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================================
-- POSTS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view posts" ON posts;
DROP POLICY IF EXISTS "Users can insert their own posts" ON posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;

-- Create proper policies
CREATE POLICY "Anyone can view posts"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts"
  ON posts FOR DELETE
  USING (auth.uid() = author_id);

-- ============================================================================
-- PARK_SPOTS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view active park spots" ON park_spots;
DROP POLICY IF EXISTS "Users can insert their own park spots" ON park_spots;
DROP POLICY IF EXISTS "Users can update their own park spots" ON park_spots;
DROP POLICY IF EXISTS "Users can delete their own park spots" ON park_spots;

-- Create proper policies
CREATE POLICY "Anyone can view active park spots"
  ON park_spots FOR SELECT
  USING (is_available = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own park spots"
  ON park_spots FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own park spots"
  ON park_spots FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own park spots"
  ON park_spots FOR DELETE
  USING (auth.uid() = user_id);
