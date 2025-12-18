'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ParkSpot {
  id: string
  lat: number
  lng: number
  username: string
  created_at: string
}

export function ParkSpotMap() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [parkSpots, setParkSpots] = useState<ParkSpot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user location with better error handling
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          fetchNearbySpots(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Location error:', error)
          setLoading(false)
          
          // Fallback to Istanbul coordinates for demo
          const fallbackLocation = { lat: 41.0082, lng: 28.9784 }
          setUserLocation(fallbackLocation)
          fetchNearbySpots(fallbackLocation.lat, fallbackLocation.lng)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    } else {
      setLoading(false)
    }
  }, [])

  const fetchNearbySpots = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`/api/park/nearby?lat=${lat}&lng=${lng}&radius=500`)
      const data = await response.json()
      setParkSpots(data.spots || [])
    } catch (error) {
      console.error('Failed to fetch park spots:', error)
    } finally {
      setLoading(false)
    }
  }

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          fetchNearbySpots(position.coords.latitude, position.coords.longitude)
        }
      )
    }
  }

  if (loading) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-muted-foreground">Harita yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!userLocation) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center space-y-4 p-6">
          <Navigation className="w-12 h-12 mx-auto text-muted-foreground" />
          <div className="space-y-2">
            <p className="font-medium">Konum İzni Gerekli</p>
            <p className="text-sm text-muted-foreground">
              Yakındaki park yerlerini görmek için konum izni verin
            </p>
          </div>
          <Button onClick={requestLocation}>
            Konumu Etkinleştir
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Simple Map Placeholder - Google Maps will be integrated later */}
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg relative overflow-hidden border-2 border-blue-200 dark:border-blue-800">
        {/* Location Info Badge */}
        <div className="absolute top-3 left-3 z-30 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Konum Aktif
        </div>

        {/* Coordinates Display */}
        <div className="absolute top-3 right-3 z-30 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-lg shadow-lg text-xs">
          <div className="text-muted-foreground">
            {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </div>
        </div>

        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-xl" />
            <div className="absolute inset-0 w-5 h-5 bg-blue-500 rounded-full animate-ping opacity-75" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-blue-600 text-white px-2 py-0.5 rounded shadow">
            Sen
          </div>
        </div>

        {/* Park Spots */}
        {parkSpots.length > 0 ? (
          parkSpots.map((spot, index) => {
            // Simple positioning for demo
            const angle = (index / parkSpots.length) * Math.PI * 2
            const radius = 30 + (index % 3) * 15
            const x = 50 + Math.cos(angle) * radius
            const y = 50 + Math.sin(angle) * radius

            return (
              <div
                key={spot.id}
                className="absolute z-20 animate-bounce"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '2s',
                }}
              >
                <MapPin className="w-7 h-7 text-green-600 drop-shadow-lg" fill="currentColor" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-green-600 text-white px-2 py-0.5 rounded shadow">
                  @{spot.username}
                </div>
              </div>
            )
          })
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-white dark:bg-gray-900 px-4 py-3 rounded-lg shadow-lg text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-sm font-medium">Yakında Park Yeri Yok</p>
              <p className="text-xs text-muted-foreground mt-1">
                Çıkarken paylaş, başkaları görsün!
              </p>
            </div>
          </div>
        )}

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-10 grid-rows-10 h-full">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border border-blue-400 dark:border-blue-600" />
            ))}
          </div>
        </div>

        {/* Compass */}
        <div className="absolute bottom-3 right-3 z-30 w-12 h-12 bg-white dark:bg-gray-900 rounded-full shadow-lg flex items-center justify-center">
          <div className="text-xs font-bold text-blue-600">N</div>
        </div>
      </div>

      {/* Spot Count */}
      <div className="flex items-center justify-between text-sm bg-muted/50 rounded-lg px-4 py-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">
            {parkSpots.length} park yeri bulundu
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => fetchNearbySpots(userLocation.lat, userLocation.lng)}
          className="h-8"
        >
          🔄 Yenile
        </Button>
      </div>
    </div>
  )
}

