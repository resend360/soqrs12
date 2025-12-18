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
      // Create preview immediately
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Cloudinary
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'soqrs_avatars') // You need to create this in Cloudinary
      formData.append('folder', 'soqrs/avatars')

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      
      if (!cloudName) {
        // Fallback: use base64 preview if Cloudinary not configured
        console.warn('Cloudinary not configured, using base64 preview')
        await new Promise(resolve => setTimeout(resolve, 500))
        
        if (onUploadComplete) {
          onUploadComplete(preview || '')
        }
        
        toast({
          title: 'Başarılı',
          description: 'Profil fotoğrafı güncellendi (geçici)',
        })
        return
      }

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      const imageUrl = data.secure_url

      setPreview(imageUrl)

      toast({
        title: 'Başarılı',
        description: 'Profil fotoğrafı yüklendi',
      })

      if (onUploadComplete) {
        onUploadComplete(imageUrl)
      }
    } catch (error) {
      console.error('Avatar upload error:', error)
      toast({
        title: 'Hata',
        description: 'Fotoğraf yüklenemedi. Lütfen tekrar deneyin.',
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

