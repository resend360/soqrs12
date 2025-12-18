-- Fix ALL RLS Policies - Based on ACTUAL table structures from 00001_initial_schema.sql
-- Run this ONCE to enable all INSERT/UPDATE/DELETE operations

DO $$ 
BEGIN
  RAISE NOTICE 'Starting RLS policy fixes for SOQRS...';
END $$;

-- ============================================================================
-- CORE TABLES (from 00001_initial_schema.sql ONLY)
-- ============================================================================

-- VEHICLES TABLE
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

-- USERS TABLE
DROP POLICY IF EXISTS "Users can view all profiles" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;

CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE USING (auth.uid() = id);

-- QR_CODES TABLE
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

-- POSTS TABLE (uses user_id)
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

-- LIKES TABLE (uses user_id)
DROP POLICY IF EXISTS "Anyone can view likes" ON likes;
DROP POLICY IF EXISTS "Users can insert their own likes" ON likes;
DROP POLICY IF EXISTS "Users can delete their own likes" ON likes;

CREATE POLICY "Anyone can view likes"
  ON likes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own likes"
  ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own likes"
  ON likes FOR DELETE USING (auth.uid() = user_id);

-- COMMENTS TABLE (uses user_id)
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

-- PARK_NOTES TABLE (uses from_user_id and to_user_id)
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

-- PARK_SPOTS TABLE (00001 version - uses status column)
DROP POLICY IF EXISTS "Anyone can view available park spots" ON park_spots;
DROP POLICY IF EXISTS "Users can insert their own park spots" ON park_spots;
DROP POLICY IF EXISTS "Users can update their own park spots" ON park_spots;
DROP POLICY IF EXISTS "Users can delete their own park spots" ON park_spots;

CREATE POLICY "Anyone can view available park spots"
  ON park_spots FOR SELECT USING (status = 'available' OR auth.uid() = user_id);
CREATE POLICY "Users can insert their own park spots"
  ON park_spots FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own park spots"
  ON park_spots FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own park spots"
  ON park_spots FOR DELETE USING (auth.uid() = user_id);

-- FRIENDSHIPS TABLE
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

-- NOTIFICATIONS TABLE
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

-- MARKETPLACE_ADS TABLE
DROP POLICY IF EXISTS "Anyone can view active marketplace ads" ON marketplace_ads;
DROP POLICY IF EXISTS "Users can insert their own ads" ON marketplace_ads;
DROP POLICY IF EXISTS "Users can update their own ads" ON marketplace_ads;
DROP POLICY IF EXISTS "Users can delete their own ads" ON marketplace_ads;

CREATE POLICY "Anyone can view active marketplace ads"
  ON marketplace_ads FOR SELECT USING (status = 'active' OR auth.uid() = seller_id);
CREATE POLICY "Users can insert their own ads"
  ON marketplace_ads FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Users can update their own ads"
  ON marketplace_ads FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Users can delete their own ads"
  ON marketplace_ads FOR DELETE USING (auth.uid() = seller_id);

-- ============================================================================
-- ADDITIONAL TABLES (from 00002_additional_tables.sql - IF THEY EXIST)
-- ============================================================================

-- RIDE_REQUESTS TABLE (uses requester_id)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'ride_requests') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can view active ride requests" ON ride_requests';
    EXECUTE 'DROP POLICY IF EXISTS "Users can create their own ride requests" ON ride_requests';
    EXECUTE 'DROP POLICY IF EXISTS "Users can update their own ride requests" ON ride_requests';
    
    EXECUTE 'CREATE POLICY "Users can view active ride requests" ON ride_requests FOR SELECT USING (status = ''active'' OR requester_id = auth.uid() OR matched_driver_id = auth.uid())';
    EXECUTE 'CREATE POLICY "Users can create their own ride requests" ON ride_requests FOR INSERT WITH CHECK (auth.uid() = requester_id)';
    EXECUTE 'CREATE POLICY "Users can update their own ride requests" ON ride_requests FOR UPDATE USING (auth.uid() = requester_id OR auth.uid() = matched_driver_id)';
    
    RAISE NOTICE '✅ ride_requests policies created';
  END IF;
END $$;

-- MARKETPLACE_ITEMS TABLE (uses seller_id)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'marketplace_items') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Anyone can view active marketplace items" ON marketplace_items';
    EXECUTE 'DROP POLICY IF EXISTS "Users can create their own listings" ON marketplace_items';
    EXECUTE 'DROP POLICY IF EXISTS "Users can update their own listings" ON marketplace_items';
    EXECUTE 'DROP POLICY IF EXISTS "Users can delete their own listings" ON marketplace_items';
    
    EXECUTE 'CREATE POLICY "Anyone can view active marketplace items" ON marketplace_items FOR SELECT USING (status = ''active'' OR seller_id = auth.uid())';
    EXECUTE 'CREATE POLICY "Users can create their own listings" ON marketplace_items FOR INSERT WITH CHECK (auth.uid() = seller_id)';
    EXECUTE 'CREATE POLICY "Users can update their own listings" ON marketplace_items FOR UPDATE USING (auth.uid() = seller_id)';
    EXECUTE 'CREATE POLICY "Users can delete their own listings" ON marketplace_items FOR DELETE USING (auth.uid() = seller_id)';
    
    RAISE NOTICE '✅ marketplace_items policies created';
  END IF;
END $$;

-- POST_LIKES TABLE (uses liker_id)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'post_likes') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Anyone can view post likes" ON post_likes';
    EXECUTE 'DROP POLICY IF EXISTS "Users can insert their own post likes" ON post_likes';
    EXECUTE 'DROP POLICY IF EXISTS "Users can delete their own post likes" ON post_likes';
    
    EXECUTE 'CREATE POLICY "Anyone can view post likes" ON post_likes FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Users can insert their own post likes" ON post_likes FOR INSERT WITH CHECK (auth.uid() = liker_id)';
    EXECUTE 'CREATE POLICY "Users can delete their own post likes" ON post_likes FOR DELETE USING (auth.uid() = liker_id)';
    
    RAISE NOTICE '✅ post_likes policies created';
  END IF;
END $$;

-- POST_COMMENTS TABLE (uses commenter_id)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'post_comments') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Anyone can view post comments" ON post_comments';
    EXECUTE 'DROP POLICY IF EXISTS "Users can insert their own post comments" ON post_comments';
    EXECUTE 'DROP POLICY IF EXISTS "Users can update their own post comments" ON post_comments';
    EXECUTE 'DROP POLICY IF EXISTS "Users can delete their own post comments" ON post_comments';
    
    EXECUTE 'CREATE POLICY "Anyone can view post comments" ON post_comments FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "Users can insert their own post comments" ON post_comments FOR INSERT WITH CHECK (auth.uid() = commenter_id)';
    EXECUTE 'CREATE POLICY "Users can update their own post comments" ON post_comments FOR UPDATE USING (auth.uid() = commenter_id)';
    EXECUTE 'CREATE POLICY "Users can delete their own post comments" ON post_comments FOR DELETE USING (auth.uid() = commenter_id)';
    
    RAISE NOTICE '✅ post_comments policies created';
  END IF;
END $$;

-- QR_SCANS TABLE (uses scanner_id)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'qr_scans') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Users can view their own scans" ON qr_scans';
    EXECUTE 'DROP POLICY IF EXISTS "Users can view scans of their QR" ON qr_scans';
    EXECUTE 'DROP POLICY IF EXISTS "Users can insert qr scans" ON qr_scans';
    
    EXECUTE 'CREATE POLICY "Users can view their own scans" ON qr_scans FOR SELECT USING (auth.uid() = scanner_id)';
    EXECUTE 'CREATE POLICY "Users can view scans of their QR" ON qr_scans FOR SELECT USING (auth.uid() = scanned_user_id)';
    EXECUTE 'CREATE POLICY "Users can insert qr scans" ON qr_scans FOR INSERT WITH CHECK (auth.uid() = scanner_id)';
    
    RAISE NOTICE '✅ qr_scans policies created';
  END IF;
END $$;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$ 
BEGIN
  RAISE NOTICE '🎉 RLS policies successfully created!';
  RAISE NOTICE '📊 Core tables (00001): vehicles, users, qr_codes, posts, likes, comments';
  RAISE NOTICE '📊 Core tables (00001): park_notes, park_spots, friendships, notifications, marketplace_ads';
  RAISE NOTICE '📊 Additional tables (00002): Checked and configured if they exist';
  RAISE NOTICE '✅ All done! Database is ready for use.';
END $$;
