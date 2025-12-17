'use client'

import { Bell, QrCode, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface HeaderProps {
  title: string
  showSearch?: boolean
  showQR?: boolean
  showNotifications?: boolean
  notificationCount?: number
}

export function Header({
  title,
  showSearch = false,
  showQR = false,
  showNotifications = true,
  notificationCount = 0,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-top">
      <div className="container flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-bold font-heading">{title}</h1>
        
        <div className="flex items-center gap-2">
          {showSearch && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search">
                <Search className="w-5 h-5" />
              </Link>
            </Button>
          )}
          
          {showQR && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/qr/scan">
                <QrCode className="w-5 h-5" />
              </Link>
            </Button>
          )}
          
          {showNotifications && (
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/notifications">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Badge>
                )}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
