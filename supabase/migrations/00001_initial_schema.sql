-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255),
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  social_links JSONB DEFAULT '{}',
  is_premium BOOLEAN DEFAULT false,
  premium_until TIMESTAMP,
  push_token TEXT,
  location_permission BOOLEAN DEFAULT false,
  language VARCHAR(5) DEFAULT 'tr',
  notification_settings JSONB DEFAULT '{"qr_scan":true,"messages":true,"social":true,"park_notes":true,"security":true,"ride":true}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- QR Codes table
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  qr_code_url TEXT NOT NULL,
  qr_type VARCHAR(20) DEFAULT 'free' CHECK (qr_type IN ('free', 'premium', 'custom')),
  qr_design JSONB DEFAULT '{"color":"#000000","shape":"square"}',
  scan_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_qr_codes_user_id ON qr_codes(user_id);
CREATE INDEX idx_qr_codes_active ON qr_codes(is_active);

-- Vehicles table
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plate_number TEXT,
  brand VARCHAR(100),
  model VARCHAR(100),
  year INTEGER,
  color VARCHAR(50),
  photo_url TEXT,
  qr_code_id UUID REFERENCES qr_codes(id),
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_vehicles_user_id ON vehicles(user_id);

-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  media_urls JSONB DEFAULT '[]',
  post_type VARCHAR(20) DEFAULT 'normal' CHECK (post_type IN ('normal', 'story', 'short')),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  is_story BOOLEAN DEFAULT false,
  story_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_story ON posts(is_story, story_expires_at) WHERE is_story = true;
CREATE INDEX idx_posts_type ON posts(post_type);

-- Likes table
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);

-- Comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comments_post_id ON comments(post_id, created_at);
CREATE INDEX idx_comments_user_id ON comments(user_id);

-- Park Notes table
CREATE TABLE park_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  note_type VARCHAR(20) CHECK (note_type IN ('info', 'complaint', 'request', 'custom')),
  location GEOGRAPHY(POINT, 4326),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_park_notes_to_user ON park_notes(to_user_id, is_read);
CREATE INDEX idx_park_notes_from_user ON park_notes(from_user_id);
CREATE INDEX idx_park_notes_created_at ON park_notes(created_at DESC);
CREATE INDEX idx_park_notes_location ON park_notes USING GIST(location);

-- Park Spots table
CREATE TABLE park_spots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  location GEOGRAPHY(POINT, 4326),
  address TEXT,
  tip_amount DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'completed', 'expired')),
  reserved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_park_spots_status ON park_spots(status, expires_at);
CREATE INDEX idx_park_spots_location ON park_spots USING GIST(location);
CREATE INDEX idx_park_spots_user_id ON park_spots(user_id);

-- Friendships table
CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

CREATE INDEX idx_friendships_user_id ON friendships(user_id, status);
CREATE INDEX idx_friendships_friend_id ON friendships(friend_id, status);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  send_sms BOOLEAN DEFAULT false,
  send_push BOOLEAN DEFAULT true,
  sms_sent BOOLEAN DEFAULT false,
  push_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(type);

-- Security Alerts table
CREATE TABLE security_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  scanned_location GEOGRAPHY(POINT, 4326),
  vehicle_last_location GEOGRAPHY(POINT, 4326),
  distance_km DECIMAL(10,2),
  alert_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_security_alerts_user_id ON security_alerts(user_id, created_at DESC);
CREATE INDEX idx_security_alerts_qr_code ON security_alerts(qr_code_id);

-- Marketplace Ads table
CREATE TABLE marketplace_ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(50),
  images JSONB DEFAULT '[]',
  location GEOGRAPHY(POINT, 4326),
  address TEXT,
  is_active BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_marketplace_ads_user_id ON marketplace_ads(user_id);
CREATE INDEX idx_marketplace_ads_category ON marketplace_ads(category, is_active);
CREATE INDEX idx_marketplace_ads_location ON marketplace_ads USING GIST(location);
CREATE INDEX idx_marketplace_ads_active ON marketplace_ads(is_active, created_at DESC);

-- Featured Content table
CREATE TABLE featured_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID NOT NULL,
  content_type VARCHAR(20) CHECK (content_type IN ('post', 'user')),
  featured_until TIMESTAMP NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_featured_content_type ON featured_content(content_type, featured_until);
CREATE INDEX idx_featured_content_position ON featured_content(position);

-- Ride Requests table
CREATE TABLE ride_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rider_id UUID REFERENCES users(id) ON DELETE CASCADE,
  pickup_location GEOGRAPHY(POINT, 4326) NOT NULL,
  pickup_address TEXT NOT NULL,
  dropoff_location GEOGRAPHY(POINT, 4326) NOT NULL,
  dropoff_address TEXT NOT NULL,
  distance_km DECIMAL(5,2),
  requested_price DECIMAL(10,2),
  price_type VARCHAR(20) DEFAULT 'fixed' CHECK (price_type IN ('fixed', 'per_km', 'negotiable')),
  passengers INTEGER DEFAULT 1,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'matched', 'in_progress', 'completed', 'cancelled', 'expired')),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ride_requests_status ON ride_requests(status, created_at DESC);
CREATE INDEX idx_ride_requests_pickup ON ride_requests USING GIST(pickup_location);
CREATE INDEX idx_ride_requests_rider ON ride_requests(rider_id);

-- Ride Offers table
CREATE TABLE ride_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  ride_request_id UUID REFERENCES ride_requests(id) ON DELETE CASCADE,
  offered_price DECIMAL(10,2) NOT NULL,
  estimated_time_minutes INTEGER,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ride_offers_request_id ON ride_offers(ride_request_id, status);
CREATE INDEX idx_ride_offers_driver_id ON ride_offers(driver_id);

-- Active Rides table
CREATE TABLE active_rides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ride_request_id UUID REFERENCES ride_requests(id),
  ride_offer_id UUID REFERENCES ride_offers(id),
  driver_id UUID REFERENCES users(id),
  rider_id UUID REFERENCES users(id),
  final_price DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2),
  driver_earning DECIMAL(10,2),
  pickup_time TIMESTAMP,
  dropoff_time TIMESTAMP,
  status VARCHAR(20) DEFAULT 'matched' CHECK (status IN ('matched', 'driver_arriving', 'in_progress', 'completed')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_active_rides_driver ON active_rides(driver_id);
CREATE INDEX idx_active_rides_rider ON active_rides(rider_id);
CREATE INDEX idx_active_rides_status ON active_rides(status);

-- Ride History table
CREATE TABLE ride_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  active_ride_id UUID REFERENCES active_rides(id),
  driver_id UUID REFERENCES users(id),
  rider_id UUID REFERENCES users(id),
  distance_km DECIMAL(5,2),
  duration_minutes INTEGER,
  final_price DECIMAL(10,2),
  platform_fee DECIMAL(10,2),
  driver_rating INTEGER CHECK (driver_rating BETWEEN 1 AND 5),
  rider_rating INTEGER CHECK (rider_rating BETWEEN 1 AND 5),
  driver_review TEXT,
  rider_review TEXT,
  completed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ride_history_driver ON ride_history(driver_id, completed_at DESC);
CREATE INDEX idx_ride_history_rider ON ride_history(rider_id, completed_at DESC);

-- Chat Messages table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  image_url TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_sender ON chat_messages(sender_id, created_at DESC);
CREATE INDEX idx_chat_messages_receiver ON chat_messages(receiver_id, is_read, created_at DESC);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE park_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE park_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE ride_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- QR Codes policies
CREATE POLICY "QR codes viewable by all" ON qr_codes FOR SELECT USING (true);
CREATE POLICY "Users can manage own QR codes" ON qr_codes FOR ALL USING (auth.uid() = user_id);

-- Posts policies
CREATE POLICY "Posts viewable by all" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Likes viewable by all" ON likes FOR SELECT USING (true);
CREATE POLICY "Users can manage own likes" ON likes FOR ALL USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments viewable by all" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Park notes policies
CREATE POLICY "Users can view notes sent to them" ON park_notes FOR SELECT USING (auth.uid() = to_user_id OR auth.uid() = from_user_id);
CREATE POLICY "Users can create park notes" ON park_notes FOR INSERT WITH CHECK (auth.uid() = from_user_id);

-- Park spots policies
CREATE POLICY "Park spots viewable by all" ON park_spots FOR SELECT USING (true);
CREATE POLICY "Users can manage own park spots" ON park_spots FOR ALL USING (auth.uid() = user_id);

-- Marketplace policies
CREATE POLICY "Marketplace ads viewable by all" ON marketplace_ads FOR SELECT USING (true);
CREATE POLICY "Users can manage own ads" ON marketplace_ads FOR ALL USING (auth.uid() = user_id);

-- Ride requests policies
CREATE POLICY "Ride requests viewable by all" ON ride_requests FOR SELECT USING (true);
CREATE POLICY "Users can manage own ride requests" ON ride_requests FOR ALL USING (auth.uid() = rider_id);

-- Ride offers policies
CREATE POLICY "Ride offers viewable by request owner and driver" ON ride_offers FOR SELECT USING (
  auth.uid() = driver_id OR 
  auth.uid() IN (SELECT rider_id FROM ride_requests WHERE id = ride_request_id)
);
CREATE POLICY "Drivers can create ride offers" ON ride_offers FOR INSERT WITH CHECK (auth.uid() = driver_id);

-- Chat messages policies
CREATE POLICY "Users can view their own messages" ON chat_messages FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "Users can send messages" ON chat_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update received messages" ON chat_messages FOR UPDATE USING (auth.uid() = receiver_id);

-- Functions

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_marketplace_ads_updated_at BEFORE UPDATE ON marketplace_ads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment post likes
CREATE OR REPLACE FUNCTION increment_post_likes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_created AFTER INSERT ON likes FOR EACH ROW EXECUTE FUNCTION increment_post_likes();

-- Function to decrement post likes
CREATE OR REPLACE FUNCTION decrement_post_likes()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_deleted AFTER DELETE ON likes FOR EACH ROW EXECUTE FUNCTION decrement_post_likes();

-- Function to increment post comments
CREATE OR REPLACE FUNCTION increment_post_comments()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_comment_created AFTER INSERT ON comments FOR EACH ROW EXECUTE FUNCTION increment_post_comments();

-- Function to increment QR scan count
CREATE OR REPLACE FUNCTION increment_qr_scan_count()
RETURNS void AS $$
BEGIN
  -- This will be called from application code
  NULL;
END;
$$ LANGUAGE plpgsql;
