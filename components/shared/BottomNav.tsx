'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin, Car, Home, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  {
    href: '/park',
    icon: MapPin,
    label: 'Park',
  },
  {
    href: '/take-to-me',
    icon: Car,
    label: 'Take to Me',
  },
  {
    href: '/social',
    icon: Home,
    label: 'Sosyal',
  },
  {
    href: '/profile',
    icon: User,
    label: 'Profil',
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
