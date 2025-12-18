-- Fix ALL RLS Policies - Complete Database Permissions
-- Run this ONCE to enable all INSERT/UPDATE/DELETE operations

-- ============================================================================
-- STEP 1: Check which tables exist and their columns
-- ============================================================================

-- First, let's see what we have
DO $$ 
BEGIN
  RAISE NOTICE 'Starting RLS policy fixes...';
END $$;

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
-- QR_CODES TABLE RLS POLICIES
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
-- POSTS TABLE RLS POLICIES (using user_id from 00001_initial_schema.sql)
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view posts" ON posts;
DROP POLICY IF EXISTS "Users can insert their own posts" ON posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;

-- Create proper policies (using user_id, not author_id)
CREATE POLICY "Anyone can view posts"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- PARK_SPOTS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view park spots" ON park_spots;
DROP POLICY IF EXISTS "Users can insert their own park spots" ON park_spots;
DROP POLICY IF EXISTS "Users can update their own park spots" ON park_spots;
DROP POLICY IF EXISTS "Users can delete their own park spots" ON park_spots;

-- Create proper policies
-- Note: park_spots uses 'status' not 'is_available'
CREATE POLICY "Anyone can view park spots"
  ON park_spots FOR SELECT
  USING (status = 'available' OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own park spots"
  ON park_spots FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own park spots"
  ON park_spots FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own park spots"
  ON park_spots FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- LIKES TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view likes" ON likes;
DROP POLICY IF EXISTS "Users can insert their own likes" ON likes;
DROP POLICY IF EXISTS "Users can delete their own likes" ON likes;

-- Create proper policies
CREATE POLICY "Anyone can view likes"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own likes"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- COMMENTS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
DROP POLICY IF EXISTS "Users can insert their own comments" ON comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;

-- Create proper policies
CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- PARK_NOTES TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view notes for their vehicles" ON park_notes;
DROP POLICY IF EXISTS "Users can view notes they created" ON park_notes;
DROP POLICY IF EXISTS "Users can insert park notes" ON park_notes;
DROP POLICY IF EXISTS "Users can update their own notes" ON park_notes;
DROP POLICY IF EXISTS "Users can delete their own notes" ON park_notes;

-- Create proper policies
CREATE POLICY "Users can view notes for their vehicles"
  ON park_notes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM vehicles 
      WHERE vehicles.id = park_notes.vehicle_id 
      AND vehicles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view notes they created"
  ON park_notes FOR SELECT
  USING (auth.uid() = sender_id);

CREATE POLICY "Users can insert park notes"
  ON park_notes FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own notes"
  ON park_notes FOR UPDATE
  USING (auth.uid() = sender_id);

CREATE POLICY "Users can delete their own notes"
  ON park_notes FOR DELETE
  USING (auth.uid() = sender_id);

-- ============================================================================
-- FRIENDSHIPS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their friendships" ON friendships;
DROP POLICY IF EXISTS "Users can create friendships" ON friendships;
DROP POLICY IF EXISTS "Users can update their friendships" ON friendships;
DROP POLICY IF EXISTS "Users can delete their friendships" ON friendships;

-- Create proper policies
CREATE POLICY "Users can view their friendships"
  ON friendships FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can create friendships"
  ON friendships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their friendships"
  ON friendships FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can delete their friendships"
  ON friendships FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- ============================================================================
-- NOTIFICATIONS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can delete their own notifications" ON notifications;

-- Create proper policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true); -- System can create notifications for any user

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
  ON notifications FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- MARKETPLACE_ADS TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view active marketplace ads" ON marketplace_ads;
DROP POLICY IF EXISTS "Users can insert their own ads" ON marketplace_ads;
DROP POLICY IF EXISTS "Users can update their own ads" ON marketplace_ads;
DROP POLICY IF EXISTS "Users can delete their own ads" ON marketplace_ads;

-- Create proper policies
CREATE POLICY "Anyone can view active marketplace ads"
  ON marketplace_ads FOR SELECT
  USING (status = 'active' OR auth.uid() = seller_id);

CREATE POLICY "Users can insert their own ads"
  ON marketplace_ads FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update their own ads"
  ON marketplace_ads FOR UPDATE
  USING (auth.uid() = seller_id);

CREATE POLICY "Users can delete their own ads"
  ON marketplace_ads FOR DELETE
  USING (auth.uid() = seller_id);

-- ============================================================================
-- RIDE_REQUESTS TABLE RLS POLICIES (from 00002_additional_tables.sql)
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view active ride requests" ON ride_requests;
DROP POLICY IF EXISTS "Users can create their own ride requests" ON ride_requests;
DROP POLICY IF EXISTS "Users can update their own ride requests" ON ride_requests;

-- Create proper policies
CREATE POLICY "Users can view active ride requests"
  ON ride_requests FOR SELECT
  USING (status = 'active' OR requester_id = auth.uid() OR matched_driver_id = auth.uid());

CREATE POLICY "Users can create their own ride requests"
  ON ride_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update their own ride requests"
  ON ride_requests FOR UPDATE
  USING (auth.uid() = requester_id OR auth.uid() = matched_driver_id);

-- ============================================================================
-- MARKETPLACE_ITEMS TABLE RLS POLICIES (from 00002_additional_tables.sql)
-- ============================================================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view active marketplace items" ON marketplace_items;
DROP POLICY IF EXISTS "Users can create their own listings" ON marketplace_items;
DROP POLICY IF EXISTS "Users can update their own listings" ON marketplace_items;
DROP POLICY IF EXISTS "Users can delete their own listings" ON marketplace_items;

-- Create proper policies
CREATE POLICY "Anyone can view active marketplace items"
  ON marketplace_items FOR SELECT
  USING (status = 'active' OR seller_id = auth.uid());

CREATE POLICY "Users can create their own listings"
  ON marketplace_items FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update their own listings"
  ON marketplace_items FOR UPDATE
  USING (auth.uid() = seller_id);

CREATE POLICY "Users can delete their own listings"
  ON marketplace_items FOR DELETE
  USING (auth.uid() = seller_id);

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$ 
BEGIN
  RAISE NOTICE 'RLS policies successfully created for all tables!';
  RAISE NOTICE 'Tables covered: vehicles, users, qr_codes, posts, park_spots, likes, comments, park_notes, friendships, notifications, marketplace_ads, ride_requests, marketplace_items';
END $$;
