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

export default function RegisterPage() {
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
      const cleanPhone = phone.replace(/\s/g, '')
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
      
      // Normal OTP flow
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
      // Test mode kontrolü - belirli numaralar için 123456 kabul et
      const testPhones = ['+905511074559', '+905559876543']
      const cleanPhone = phone.replace(/\s/g, '')
      
      let authData, authError
      
      if (testPhones.includes(cleanPhone) && code === '123456') {
        // Test mode - direkt sign in
        console.log('[DEV MODE] Test phone with dev OTP, signing in...')
        const signInResult = await supabase.auth.signInWithPassword({
          phone: cleanPhone,
          password: 'Test1234!', // Test kullanıcısının şifresi
        })
        authData = signInResult.data
        authError = signInResult.error
      } else {
        // Normal OTP doğrulama
        const verifyResult = await supabase.auth.verifyOtp({
          phone: cleanPhone,
          token: code,
          type: 'sms',
        })
        authData = verifyResult.data
        authError = verifyResult.error
      }

      if (authError) throw authError

      // Check if user profile exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('phone', phone.replace(/\s/g, ''))
        .single()

      if (existingUser) {
        // User exists, redirect to main app
        toast({
          title: 'Başarılı',
          description: 'Giriş yapıldı',
        })
        router.push('/park')
      } else {
        // New user, redirect to onboarding
        toast({
          title: 'Başarılı',
          description: 'Profilinizi tamamlayın',
        })
        router.push('/onboarding')
      }
      
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
        <CardTitle className="text-2xl">SOQRS'a Katıl</CardTitle>
        <CardDescription>
          {step === 'phone' 
            ? 'Telefon numaranızla kayıt olun' 
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
              {loading ? 'Doğrulanıyor...' : 'Kayıt Ol'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep('phone')}
              disabled={loading}
            >
              Farklı numara ile kayıt ol
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground text-center">
          Zaten hesabınız var mı?{' '}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Giriş Yap
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
