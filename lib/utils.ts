import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phone: string): string {
  // Format: 05XX XXX XX XX
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`
  }
  return phone
}

export function maskPhoneNumber(phone: string): string {
  // Mask middle digits: 05XX XXX XX XX -> 05XX *** ** XX
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} *** ** ${cleaned.slice(9)}`
  }
  return phone
}

export function generateUsername(fullName: string): string {
  const cleaned = fullName.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
  const random = Math.floor(Math.random() * 1000)
  return `${cleaned}_${random}`
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  }
  return `${(meters / 1000).toFixed(1)}km`
}

export function formatPrice(amount: number, currency: string = '₺'): string {
  return `${amount.toFixed(2)}${currency}`
}

export function timeAgo(date: Date | string, locale: string = 'tr'): string {
  const now = new Date()
  const past = new Date(date)
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  const intervals: { [key: string]: { [key: string]: string } } = {
    tr: {
      year: 'yıl',
      month: 'ay',
      week: 'hafta',
      day: 'gün',
      hour: 'saat',
      minute: 'dakika',
      second: 'saniye',
    },
    en: {
      year: 'year',
      month: 'month',
      week: 'week',
      day: 'day',
      hour: 'hour',
      minute: 'minute',
      second: 'second',
    },
  }

  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'week', seconds: 604800 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 },
  ]

  for (const unit of units) {
    const interval = Math.floor(seconds / unit.seconds)
    if (interval >= 1) {
      const unitName = intervals[locale]?.[unit.name] || intervals.en[unit.name]
      return `${interval} ${unitName} ${locale === 'tr' ? 'önce' : 'ago'}`
    }
  }

  return locale === 'tr' ? 'şimdi' : 'just now'
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return /^0[5][0-9]{9}$/.test(cleaned)
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Haversine formula
  const R = 6371e3 // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in meters
}

export function encryptPlateNumber(plate: string): string {
  // Simple encryption for demo - use crypto-js in production
  return Buffer.from(plate).toString('base64')
}

export function decryptPlateNumber(encrypted: string): string {
  // Simple decryption for demo
  try {
    return Buffer.from(encrypted, 'base64').toString('utf-8')
  } catch {
    return encrypted
  }
}
