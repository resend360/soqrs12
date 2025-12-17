export interface User {
  id: string
  phone: string
  email?: string
  username: string
  full_name?: string
  avatar_url?: string
  bio?: string
  social_links?: {
    instagram?: string
    twitter?: string
    linkedin?: string
    tiktok?: string
  }
  is_premium: boolean
  premium_until?: string
  push_token?: string
  location_permission: boolean
  language: string
  notification_settings: NotificationSettings
  created_at: string
  updated_at: string
}

export interface NotificationSettings {
  qr_scan: boolean
  messages: boolean
  social: boolean
  park_notes: boolean
  security: boolean
  ride: boolean
}

export interface QRCode {
  id: string
  user_id: string
  qr_code_url: string
  qr_type: 'free' | 'premium' | 'custom'
  qr_design: {
    color: string
    shape: 'square' | 'rounded' | 'dots'
    logo?: string
  }
  scan_count: number
  is_active: boolean
  created_at: string
}

export interface Vehicle {
  id: string
  user_id: string
  plate_number?: string
  brand: string
  model: string
  year?: number
  color?: string
  photo_url?: string
  qr_code_id?: string
  is_primary: boolean
  created_at: string
}

export interface Post {
  id: string
  user_id: string
  user?: User
  content?: string
  media_urls: string[]
  post_type: 'normal' | 'story' | 'short'
  likes_count: number
  comments_count: number
  shares_count: number
  is_story: boolean
  story_expires_at?: string
  created_at: string
  updated_at: string
  is_liked?: boolean
}

export interface Comment {
  id: string
  user_id: string
  user?: User
  post_id: string
  content: string
  created_at: string
}

export interface ParkNote {
  id: string
  from_user_id: string
  from_user?: User
  to_user_id: string
  to_user?: User
  vehicle_id?: string
  vehicle?: Vehicle
  message: string
  note_type: 'info' | 'complaint' | 'request' | 'custom'
  location?: {
    lat: number
    lng: number
  }
  is_read: boolean
  created_at: string
}

export interface ParkSpot {
  id: string
  user_id: string
  user?: User
  location: {
    lat: number
    lng: number
  }
  address: string
  tip_amount: number
  status: 'available' | 'reserved' | 'completed' | 'expired'
  reserved_by?: string
  reserved_user?: User
  expires_at: string
  created_at: string
}

export interface Friendship {
  id: string
  user_id: string
  friend_id: string
  friend?: User
  status: 'pending' | 'accepted' | 'blocked'
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  data: any
  is_read: boolean
  send_sms: boolean
  send_push: boolean
  sms_sent: boolean
  push_sent: boolean
  created_at: string
}

export interface SecurityAlert {
  id: string
  qr_code_id: string
  user_id: string
  scanned_location: {
    lat: number
    lng: number
  }
  vehicle_last_location: {
    lat: number
    lng: number
  }
  distance_km: number
  alert_sent: boolean
  created_at: string
}

export interface MarketplaceAd {
  id: string
  user_id: string
  user?: User
  title: string
  description?: string
  price?: number
  category: string
  images: string[]
  location?: {
    lat: number
    lng: number
  }
  address?: string
  is_active: boolean
  views_count: number
  created_at: string
  updated_at: string
}

export interface RideRequest {
  id: string
  rider_id: string
  rider?: User
  pickup_location: {
    lat: number
    lng: number
  }
  pickup_address: string
  dropoff_location: {
    lat: number
    lng: number
  }
  dropoff_address: string
  distance_km?: number
  requested_price?: number
  price_type: 'fixed' | 'per_km' | 'negotiable'
  passengers: number
  notes?: string
  status: 'pending' | 'matched' | 'in_progress' | 'completed' | 'cancelled' | 'expired'
  expires_at: string
  created_at: string
}

export interface RideOffer {
  id: string
  driver_id: string
  driver?: User
  ride_request_id: string
  ride_request?: RideRequest
  offered_price: number
  estimated_time_minutes?: number
  message?: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  created_at: string
}

export interface ActiveRide {
  id: string
  ride_request_id: string
  ride_offer_id: string
  driver_id: string
  driver?: User
  rider_id: string
  rider?: User
  final_price: number
  platform_fee?: number
  driver_earning?: number
  pickup_time?: string
  dropoff_time?: string
  status: 'matched' | 'driver_arriving' | 'in_progress' | 'completed'
  created_at: string
}

export interface RideHistory {
  id: string
  active_ride_id: string
  driver_id: string
  driver?: User
  rider_id: string
  rider?: User
  distance_km?: number
  duration_minutes?: number
  final_price: number
  platform_fee?: number
  driver_rating?: number
  rider_rating?: number
  driver_review?: string
  rider_review?: string
  completed_at: string
}

export interface Location {
  lat: number
  lng: number
}

export interface ChatMessage {
  id: string
  sender_id: string
  receiver_id: string
  message: string
  image_url?: string
  is_read: boolean
  created_at: string
}
