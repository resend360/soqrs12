'use client'

import { useState, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Upload, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AvatarUploadProps {
  currentAvatar?: string
  fallbackText: string
  onUploadComplete?: (url: string) => void
}

export function AvatarUpload({ currentAvatar, fallbackText, onUploadComplete }: AvatarUploadProps) {
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentAvatar)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Hata',
        description: 'Lütfen bir resim dosyası seçin',
        variant: 'destructive',
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Hata',
        description: 'Dosya boyutu 5MB\'dan küçük olmalı',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // TODO: Upload to Cloudinary
      // For now, just use the preview
      await new Promise(resolve => setTimeout(resolve, 1500))

      toast({
        title: 'Başarılı',
        description: 'Profil fotoğrafı güncellendi',
      })

      if (onUploadComplete) {
        onUploadComplete(preview || '')
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: 'Fotoğraf yüklenemedi',
        variant: 'destructive',
      })
      setPreview(currentAvatar)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={preview} />
        <AvatarFallback className="text-2xl">
          {fallbackText}
        </AvatarFallback>
      </Avatar>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
        disabled={uploading}
      />
      
      <Button 
        type="button" 
        variant="outline" 
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Yükleniyor...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Fotoğraf Yükle
          </>
        )}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        JPG, PNG veya GIF (max 5MB)
      </p>
    </div>
  )
}
