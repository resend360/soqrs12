-- Fix RLS Policies - SIMPLIFIED VERSION
-- Only for tables that DEFINITELY exist

-- ============================================================================
-- USERS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "Users can view all profiles" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;

CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- VEHICLES TABLE
-- ============================================================================
DROP POLICY IF EXISTS "Users can view their own vehicles" ON vehicles;
DROP POLICY IF EXISTS "Users can insert their own vehicles" ON vehicles;
DROP POLICY IF EXISTS "Users can update their own vehicles" ON vehicles;
DROP POLICY IF EXISTS "Users can delete their own vehicles" ON vehicles;

CREATE POLICY "Users can view their own vehicles"
  ON vehicles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own vehicles"
  ON vehicles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own vehicles"
  ON vehicles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own vehicles"
  ON vehicles FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- QR_CODES TABLE
-- ============================================================================
DROP POLICY IF EXISTS "Users can view their own QR codes" ON qr_codes;
DROP POLICY IF EXISTS "Anyone can view active QR codes" ON qr_codes;
DROP POLICY IF EXISTS "Users can insert their own QR codes" ON qr_codes;
DROP POLICY IF EXISTS "Users can update their own QR codes" ON qr_codes;

CREATE POLICY "Users can view their own QR codes"
  ON qr_codes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view active QR codes"
  ON qr_codes FOR SELECT USING (is_active = true);
CREATE POLICY "Users can insert their own QR codes"
  ON qr_codes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own QR codes"
  ON qr_codes FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- POSTS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "Anyone can view posts" ON posts;
DROP POLICY IF EXISTS "Users can insert their own posts" ON posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;

CREATE POLICY "Anyone can view posts"
  ON posts FOR SELECT USING (true);
CREATE POLICY "Users can insert their own posts"
  ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own posts"
  ON posts FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- LIKES TABLE
-- ============================================================================
DROP POLICY IF EXISTS "Anyone can view likes" ON likes;
DROP POLICY IF EXISTS "Users can insert their own likes" ON likes;
DROP POLICY IF EXISTS "Users can delete their own likes" ON likes;

CREATE POLICY "Anyone can view likes"
  ON likes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own likes"
  ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes"
  ON likes FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- COMMENTS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
DROP POLICY IF EXISTS "Users can insert their own comments" ON comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;

CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own comments"
  ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- PARK_NOTES TABLE
-- ============================================================================
DROP POLICY IF EXISTS "Users can view notes they sent" ON park_notes;
DROP POLICY IF EXISTS "Users can view notes they received" ON park_notes;
DROP POLICY IF EXISTS "Users can insert park notes" ON park_notes;
DROP POLICY IF EXISTS "Users can update their sent notes" ON park_notes;
DROP POLICY IF EXISTS "Users can delete their sent notes" ON park_notes;

CREATE POLICY "Users can view notes they sent"
  ON park_notes FOR SELECT USING (auth.uid() = from_user_id);
CREATE POLICY "Users can view notes they received"
  ON park_notes FOR SELECT USING (auth.uid() = to_user_id);
CREATE POLICY "Users can insert park notes"
  ON park_notes FOR INSERT WITH CHECK (auth.uid() = from_user_id);
CREATE POLICY "Users can update their sent notes"
  ON park_notes FOR UPDATE USING (auth.uid() = from_user_id);
CREATE POLICY "Users can delete their sent notes"
  ON park_notes FOR DELETE USING (auth.uid() = from_user_id);

-- ============================================================================
-- FRIENDSHIPS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "Users can view their friendships" ON friendships;
DROP POLICY IF EXISTS "Users can create friendships" ON friendships;
DROP POLICY IF EXISTS "Users can update their friendships" ON friendships;
DROP POLICY IF EXISTS "Users can delete their friendships" ON friendships;

CREATE POLICY "Users can view their friendships"
  ON friendships FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY "Users can create friendships"
  ON friendships FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their friendships"
  ON friendships FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY "Users can delete their friendships"
  ON friendships FOR DELETE USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- ============================================================================
-- NOTIFICATIONS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can delete their own notifications" ON notifications;

CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert notifications"
  ON notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own notifications"
  ON notifications FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- MARKETPLACE_ADS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "Anyone can view active marketplace ads" ON marketplace_ads;
DROP POLICY IF EXISTS "Users can insert their own ads" ON marketplace_ads;
DROP POLICY IF EXISTS "Users can update their own ads" ON marketplace_ads;
DROP POLICY IF EXISTS "Users can delete their own ads" ON marketplace_ads;

CREATE POLICY "Anyone can view active marketplace ads"
  ON marketplace_ads FOR SELECT USING (is_active = true OR auth.uid() = user_id);
CREATE POLICY "Users can insert their own ads"
  ON marketplace_ads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ads"
  ON marketplace_ads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own ads"
  ON marketplace_ads FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- OPTIONAL TABLES (with IF EXISTS check)
-- ============================================================================

-- PARK_SPOTS (if exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'park_spots') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Anyone can view park spots" ON park_spots';
    EXECUTE 'DROP POLICY IF EXISTS "Users can insert their own park spots" ON park_spots';
    EXECUTE 'DROP POLICY IF EXISTS "Users can update their own park spots" ON park_spots';
    EXECUTE 'DROP POLICY IF EXISTS "Users can delete their own park spots" ON park_spots';
    
    IF EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'park_spots' 
      AND column_name = 'status'
    ) THEN
      EXECUTE 'CREATE POLICY "Anyone can view park spots" ON park_spots FOR SELECT USING (status = ''available'' OR auth.uid() = user_id)';
    ELSE
      EXECUTE 'CREATE POLICY "Anyone can view park spots" ON park_spots FOR SELECT USING (auth.uid() = user_id)';
    END IF;
    
    EXECUTE 'CREATE POLICY "Users can insert their own park spots" ON park_spots FOR INSERT WITH CHECK (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "Users can update their own park spots" ON park_spots FOR UPDATE USING (auth.uid() = user_id)';
    EXECUTE 'CREATE POLICY "Users can delete their own park spots" ON park_spots FOR DELETE USING (auth.uid() = user_id)';
  END IF;
END $$;

-- RIDE_REQUESTS (if exists) - handles both rider_id and requester_id
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'ride_requests') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can view active ride requests" ON ride_requests';
    EXECUTE 'DROP POLICY IF EXISTS "Users can create their own ride requests" ON ride_requests';
    EXECUTE 'DROP POLICY IF EXISTS "Users can update their own ride requests" ON ride_requests';
    
    -- Check which column exists: rider_id or requester_id
    IF EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'ride_requests' 
      AND column_name = 'rider_id'
    ) THEN
      -- Use rider_id (from 00001_initial_schema.sql)
      EXECUTE 'CREATE POLICY "Users can view active ride requests" ON ride_requests FOR SELECT USING (status IN (''pending'', ''matched'', ''in_progress'') OR rider_id = auth.uid())';
      EXECUTE 'CREATE POLICY "Users can create their own ride requests" ON ride_requests FOR INSERT WITH CHECK (auth.uid() = rider_id)';
      EXECUTE 'CREATE POLICY "Users can update their own ride requests" ON ride_requests FOR UPDATE USING (auth.uid() = rider_id)';
    ELSIF EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'ride_requests' 
      AND column_name = 'requester_id'
    ) THEN
      -- Use requester_id (from 00002_additional_tables.sql)
      EXECUTE 'CREATE POLICY "Users can view active ride requests" ON ride_requests FOR SELECT USING (status = ''active'' OR requester_id = auth.uid() OR matched_driver_id = auth.uid())';
      EXECUTE 'CREATE POLICY "Users can create their own ride requests" ON ride_requests FOR INSERT WITH CHECK (auth.uid() = requester_id)';
      EXECUTE 'CREATE POLICY "Users can update their own ride requests" ON ride_requests FOR UPDATE USING (auth.uid() = requester_id OR auth.uid() = matched_driver_id)';
    END IF;
  END IF;
END $$;

-- MARKETPLACE_ITEMS (if exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'marketplace_items') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Anyone can view active marketplace items" ON marketplace_items';
    EXECUTE 'DROP POLICY IF EXISTS "Users can create their own listings" ON marketplace_items';
    EXECUTE 'DROP POLICY IF EXISTS "Users can update their own listings" ON marketplace_items';
    EXECUTE 'DROP POLICY IF EXISTS "Users can delete their own listings" ON marketplace_items';
    
    EXECUTE 'CREATE POLICY "Anyone can view active marketplace items" ON marketplace_items FOR SELECT USING (status = ''active'' OR seller_id = auth.uid())';
    EXECUTE 'CREATE POLICY "Users can create their own listings" ON marketplace_items FOR INSERT WITH CHECK (auth.uid() = seller_id)';
    EXECUTE 'CREATE POLICY "Users can update their own listings" ON marketplace_items FOR UPDATE USING (auth.uid() = seller_id)';
    EXECUTE 'CREATE POLICY "Users can delete their own listings" ON marketplace_items FOR DELETE USING (auth.uid() = seller_id)';
  END IF;
END $$;
