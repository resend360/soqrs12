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
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          fetchNearbySpots(position.coords.latitude, position.coords.longitude)
        },
        () => {
          setLoading(false)
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
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg relative overflow-hidden">
        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75" />
          </div>
        </div>

        {/* Park Spots */}
        {parkSpots.map((spot, index) => {
          // Simple positioning for demo
          const angle = (index / parkSpots.length) * Math.PI * 2
          const radius = 80
          const x = 50 + Math.cos(angle) * radius
          const y = 50 + Math.sin(angle) * radius

          return (
            <div
              key={spot.id}
              className="absolute z-20"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <MapPin className="w-6 h-6 text-primary drop-shadow-lg" fill="currentColor" />
            </div>
          )
        })}

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-blue-300 dark:border-blue-700" />
            ))}
          </div>
        </div>
      </div>

      {/* Spot Count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {parkSpots.length} park yeri bulundu
        </span>
        <Button variant="ghost" size="sm" onClick={() => fetchNearbySpots(userLocation.lat, userLocation.lng)}>
          Yenile
        </Button>
      </div>
    </div>
  )
}
