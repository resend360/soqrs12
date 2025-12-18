'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, Bug, CheckCircle, XCircle, Wifi, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DebugMessage {
  id: string
  type: 'info' | 'success' | 'error' | 'warning'
  message: string
  timestamp: Date
}

export function DebugBar() {
  const [messages, setMessages] = useState<DebugMessage[]>([])
  const [isOnline, setIsOnline] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Only show in development or if DEBUG flag is set
    const isDev = process.env.NODE_ENV === 'development' || 
                  localStorage.getItem('DEBUG_MODE') === 'true'
    
    if (!isDev) {
      setIsVisible(false)
      return
    }

    // Monitor online/offline status
    const handleOnline = () => {
      setIsOnline(true)
      addMessage('success', 'İnternet bağlantısı geri geldi')
    }
    
    const handleOffline = () => {
      setIsOnline(false)
      addMessage('error', 'İnternet bağlantısı kesildi')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Monitor console errors
    const originalError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      addMessage('error', message)
      originalError.apply(console, args)
    }

    // Monitor console warnings
    const originalWarn = console.warn
    console.warn = (...args) => {
      const message = args.join(' ')
      addMessage('warning', message)
      originalWarn.apply(console, args)
    }

    // Listen for custom debug messages (from 404, API errors, etc.)
    const handleDebugMessage = (event: CustomEvent) => {
      const { type, message } = event.detail
      addMessage(type, message)
    }

    window.addEventListener('debug-message' as any, handleDebugMessage as any)

    // Monitor fetch errors (404, 500, etc.)
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args)
        
        if (!response.ok) {
          const url = typeof args[0] === 'string' ? args[0] : args[0].url
          addMessage('error', `HTTP ${response.status}: ${url}`)
        }
        
        return response
      } catch (error: any) {
        const url = typeof args[0] === 'string' ? args[0] : args[0].url
        addMessage('error', `Network error: ${url}`)
        throw error
      }
    }

    // Add initial message
    addMessage('info', 'Debug mode aktif - Geliştirme ortamı')

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('debug-message' as any, handleDebugMessage as any)
      console.error = originalError
      console.warn = originalWarn
      window.fetch = originalFetch
    }
  }, [])

  const addMessage = (type: DebugMessage['type'], message: string) => {
    const newMessage: DebugMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev.slice(-4), newMessage]) // Keep last 5 messages
  }

  const getIcon = (type: DebugMessage['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <Bug className="w-4 h-4 text-blue-500" />
    }
  }

  const getBgColor = (type: DebugMessage['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20'
      case 'error':
        return 'bg-red-500/10 border-red-500/20'
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20'
      default:
        return 'bg-blue-500/10 border-blue-500/20'
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-t border-white/10 p-2 pb-safe">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-white">Debug Mode</span>
            <div className="flex items-center gap-1">
              {isOnline ? (
                <Wifi className="w-3 h-3 text-green-500" />
              ) : (
                <WifiOff className="w-3 h-3 text-red-500" />
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => {
              localStorage.removeItem('DEBUG_MODE')
              setIsVisible(false)
            }}
          >
            Kapat
          </Button>
        </div>

        {/* Messages */}
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-xs text-white/50 text-center py-2">
              Henüz mesaj yok
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 p-2 rounded border ${getBgColor(msg.type)}`}
              >
                {getIcon(msg.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{msg.message}</p>
                  <p className="text-[10px] text-white/50">
                    {msg.timestamp.toLocaleTimeString('tr-TR')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs flex-1"
            onClick={() => {
              console.log('User:', localStorage.getItem('supabase.auth.token'))
              addMessage('info', 'Auth token logged')
            }}
          >
            Check Auth
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs flex-1"
            onClick={() => {
              console.log('LocalStorage:', localStorage)
              addMessage('info', 'LocalStorage logged')
            }}
          >
            Check Storage
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-6 text-xs flex-1"
            onClick={() => {
              setMessages([])
              addMessage('info', 'Mesajlar temizlendi')
            }}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  )
}

