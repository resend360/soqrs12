'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { createClient } from '@/lib/supabase/client'
import { isValidPhoneNumber } from '@/lib/utils'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValidPhoneNumber(phone)) {
      toast({
        title: 'Hata',
        description: 'Geçerli bir telefon numarası girin (05XX XXX XX XX)',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    
    try {
      // Telefonu +90 formatına çevir
      let cleanPhone = phone.replace(/\s/g, '')
      if (cleanPhone.startsWith('0')) {
        cleanPhone = '+90' + cleanPhone.substring(1)
      } else if (!cleanPhone.startsWith('+')) {
        cleanPhone = '+90' + cleanPhone
      }
      
      const testPhones = ['+905511074559', '+905559876543']
      
      // Test mode - skip OTP
      if (testPhones.includes(cleanPhone)) {
        toast({
          title: 'Test Mode',
          description: 'Test numarası - OTP: 123456',
        })
        setStep('code')
        setLoading(false)
        return
      }
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: cleanPhone,
        options: {
          channel: 'sms',
        },
      })

      if (error) throw error

      toast({
        title: 'Kod Gönderildi',
        description: 'Telefonunuza gelen 6 haneli kodu girin',
      })
      setStep('code')
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message || 'Kod gönderilemedi',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (code.length !== 6) {
      toast({
        title: 'Hata',
        description: '6 haneli kodu girin',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    
    try {
      // Telefonu +90 formatına çevir
      let cleanPhone = phone.replace(/\s/g, '')
      if (cleanPhone.startsWith('0')) {
        cleanPhone = '+90' + cleanPhone.substring(1)
      } else if (!cleanPhone.startsWith('+')) {
        cleanPhone = '+90' + cleanPhone
      }
      
      const testPhones = ['+905511074559', '+905559876543']
      
      // Test mode - direkt giriş
      if (testPhones.includes(cleanPhone) && code === '123456') {
        console.log('[DEV MODE] Test login successful')
        
        // Direkt sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          phone: cleanPhone,
          password: 'Test1234!',
        })
        
        if (signInError) throw signInError
        
        toast({
          title: 'Başarılı',
          description: 'Giriş yapıldı',
        })
        
        router.push('/park')
        router.refresh()
        return
      }
      
      // Normal OTP doğrulama
      const { error } = await supabase.auth.verifyOtp({
        phone: cleanPhone,
        token: code,
        type: 'sms',
      })

      if (error) throw error

      toast({
        title: 'Başarılı',
        description: 'Giriş yapıldı',
      })
      
      router.push('/park')
      router.refresh()
    } catch (error: any) {
      toast({
        title: 'Hata',
        description: error.message || 'Kod doğrulanamadı',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-2">
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
          <QrCode className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">SOQRS'a Giriş Yap</CardTitle>
        <CardDescription>
          {step === 'phone' 
            ? 'Telefon numaranızla giriş yapın' 
            : 'Telefonunuza gelen kodu girin'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 'phone' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon Numarası</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="05XX XXX XX XX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Gönderiliyor...' : 'Kod Gönder'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Doğrulama Kodu</Label>
              <Input
                id="code"
                type="text"
                placeholder="6 haneli kod"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                disabled={loading}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Doğrulanıyor...' : 'Giriş Yap'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep('phone')}
              disabled={loading}
            >
              Farklı numara ile giriş yap
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground text-center">
          Hesabınız yok mu?{' '}
          <Link href="/register" className="text-primary hover:underline font-medium">
            Kayıt Ol
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
