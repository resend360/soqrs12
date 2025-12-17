# 🗄️ Supabase Detaylı Kurulum

## 1. Hesap Oluştur

1. [supabase.com](https://supabase.com) adresine git
2. **"Start your project"** butonuna tıkla
3. GitHub ile giriş yap (önerilen) veya email ile kayıt ol

## 2. Yeni Proje Oluştur

1. **"New Project"** butonuna tıkla
2. Organization seç (veya yeni oluştur)
3. Proje bilgilerini doldur:
   - **Name**: `soqrs`
   - **Database Password**: Güçlü bir şifre oluştur (KAYDET!)
   - **Region**: `Europe (Frankfurt)` - Türkiye'ye en yakın
   - **Pricing Plan**: Free (başlangıç için yeterli)
4. **"Create new project"** butonuna tıkla
5. ⏰ Proje hazırlanırken bekle (~2 dakika)

## 3. Database'i Kur

### Adım 1: SQL Editor'ü Aç
1. Sol menüden **SQL Editor**'e tıkla
2. **"New Query"** butonuna tıkla

### Adım 2: Migration'ı Çalıştır
1. Bilgisayarından `supabase/migrations/00001_initial_schema.sql` dosyasını aç
2. İçeriğin **TAMAMINI** kopyala (Ctrl+A, Ctrl+C)
3. Supabase SQL Editor'e yapıştır (Ctrl+V)
4. Sağ üstteki **"Run"** butonuna tıkla
5. ✅ "Success. No rows returned" mesajını gör

### Adım 3: Tabloları Kontrol Et
1. Sol menüden **Table Editor**'e tıkla
2. Şu tabloları görmelisin:
   - users
   - qr_codes
   - vehicles
   - posts
   - likes
   - comments
   - park_notes
   - park_spots
   - friendships
   - notifications
   - ve diğerleri...

## 4. Authentication Ayarları

### Phone Auth'u Aktifleştir
1. Sol menüden **Authentication** → **Providers**'a git
2. **Phone** provider'ı bul
3. Toggle'ı aç (enable)
4. **"Save"** butonuna tıkla

### Email Auth (Opsiyonel)
1. **Email** provider zaten aktif
2. Ayarları olduğu gibi bırak

## 5. API Anahtarlarını Al

1. Sol menüden **Project Settings** (dişli ikonu) → **API**'ye git
2. Şu değerleri kopyala:

### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
Bu senin `NEXT_PUBLIC_SUPABASE_URL`

### API Keys

**anon public** (herkese açık):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
Bu senin `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**service_role** (GİZLİ - asla paylaşma!):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
Bu senin `SUPABASE_SERVICE_ROLE_KEY`

## 6. .env.local Dosyasını Düzenle

1. Proje klasöründe `.env.local.example` dosyasını bul
2. Dosyayı `.env.local` olarak kopyala
3. Şu satırları doldur:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Dosyayı kaydet

## 7. Test Et

```bash
# Development server'ı başlat
npm run dev

# Tarayıcıda aç
http://localhost:3000

# Kayıt ol sayfasına git
# Telefon numaranı gir
# SMS kodu gelecek (Supabase'in ücretsiz SMS'i - limitli)
```

## 🎯 Supabase SMS Seçenekleri

### Opsiyon 1: Supabase'in Ücretsiz SMS'i
- **Limit**: Saatte 3 SMS
- **Kullanım**: Test için yeterli
- **Ayar**: Zaten aktif, bir şey yapman gerekmiyor

### Opsiyon 2: NetGSM Entegrasyonu (Önerilen)
- **Limit**: Paketine göre
- **Kullanım**: Production için ideal
- **Ayar**: `NETGSM_KURULUM.md` dosyasına bak

### Opsiyon 3: Twilio
1. Supabase Dashboard → Authentication → Providers → Phone
2. **"Use a custom SMS provider"** seç
3. Twilio bilgilerini gir

## 🔒 Güvenlik Ayarları

### Row Level Security (RLS)
- ✅ Zaten aktif (migration'da yapıldı)
- Kullanıcılar sadece kendi verilerini görebilir

### API Rate Limiting
1. Project Settings → API
2. Rate limiting ayarlarını kontrol et
3. Free plan: 60 requests/minute

## 📊 Supabase Dashboard Özellikleri

### Table Editor
- Verileri görüntüle ve düzenle
- SQL yazmadan CRUD işlemleri

### SQL Editor
- Custom SQL sorguları çalıştır
- Migration'ları buradan yap

### Authentication
- Kullanıcıları görüntüle
- Auth ayarlarını yönet

### Storage
- Dosya yükleme (QR kodlar için)
- Public/private bucket'lar

### Database
- Schema görüntüle
- Backup al
- Performance monitoring

## 🐛 Sorun Giderme

### "Invalid API key" Hatası
- `.env.local` dosyasını kontrol et
- Anahtarları doğru kopyaladın mı?
- Dev server'ı yeniden başlat

### "Table does not exist" Hatası
- Migration'ı çalıştırdın mı?
- SQL Editor'de hata var mıydı?
- Table Editor'de tabloları görebiliyor musun?

### SMS Gelmiyor
- Phone Auth aktif mi kontrol et
- Supabase'in ücretsiz SMS limiti: 3/saat
- NetGSM kullanmayı düşün (production için)

### Bağlantı Hatası
- Project URL doğru mu?
- Internet bağlantın var mı?
- Supabase servisleri çalışıyor mu? (status.supabase.com)

## 💡 İpuçları

1. **Database Şifreni Kaydet**: Kaybedersen sıfırlamak zor
2. **Service Role Key'i Gizli Tut**: Asla GitHub'a pushlamayın
3. **Backup Al**: Önemli veriler için düzenli backup
4. **Monitoring**: Dashboard'dan kullanımı takip et
5. **Upgrade**: Free plan limitleri aşarsan Pro'ya geç

## 📈 Supabase Free Plan Limitleri

- **Database**: 500 MB
- **Storage**: 1 GB
- **Bandwidth**: 2 GB/ay
- **API Requests**: 500K/ay
- **Auth Users**: Unlimited
- **Edge Functions**: 500K invocations/ay

Production için yeterli, büyüyünce upgrade yaparsın.

## 📞 Supabase Destek

- **Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Discord**: Supabase Community
- **GitHub**: github.com/supabase/supabase
- **Status**: status.supabase.com

---

**Başarılar! 🗄️**
