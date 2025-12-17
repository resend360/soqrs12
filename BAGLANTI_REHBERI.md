# 🚀 SOQRS Bağlantı Rehberi

Projeyi çalıştırmak için adım adım rehber.

## ✅ Ön Hazırlık

### 1. Node.js Kurulumu
```bash
# Node.js versiyonunu kontrol et
node --version  # v18 veya üzeri olmalı

# Eğer yüklü değilse:
# https://nodejs.org/ adresinden indir ve kur
```

### 2. Bağımlılıkları Yükle
```bash
cd c:\Users\craze\soqrs
npm install
```

Bu işlem 2-3 dakika sürebilir.

## 🗄️ Supabase Kurulumu (ZORUNLU)

### 1. Supabase Hesabı Oluştur
1. [supabase.com](https://supabase.com) adresine git
2. "Start your project" butonuna tıkla
3. GitHub ile giriş yap (veya email)

### 2. Yeni Proje Oluştur
1. "New Project" butonuna tıkla
2. Proje adı: `soqrs`
3. Database şifresi: Güçlü bir şifre seç (kaydet!)
4. Region: `Europe (Frankfurt)` seç (Türkiye'ye en yakın)
5. "Create new project" butonuna tıkla
6. ⏰ Proje hazırlanırken bekle (~2 dakika)

### 3. Database'i Kur
1. Sol menüden **SQL Editor**'e tıkla
2. "New Query" butonuna tıkla
3. Bilgisayarından `supabase/migrations/00001_initial_schema.sql` dosyasını aç
4. İçeriğin tamamını kopyala
5. Supabase SQL Editor'e yapıştır
6. **"Run"** butonuna tıkla (sağ üstte)
7. ✅ "Success. No rows returned" mesajını gör

### 4. Phone Auth'u Aktifleştir
1. Sol menüden **Authentication** → **Providers**'a git
2. **Phone** provider'ı bul
3. Toggle'ı aç (enable)
4. "Save" butonuna tıkla

### 5. API Anahtarlarını Al
1. Sol menüden **Project Settings** → **API**'ye git
2. Şu değerleri kopyala:
   - **Project URL** (örn: https://xxxxx.supabase.co)
   - **anon public** key (uzun bir string)
   - **service_role** key (uzun bir string - GİZLİ!)

### 6. .env.local Dosyasını Düzenle
1. `c:\Users\craze\soqrs\.env.local` dosyasını aç
2. Şu satırları doldur:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```
3. Dosyayı kaydet

## 🚀 Projeyi Başlat

```bash
# Development server'ı başlat
npm run dev
```

Tarayıcıda aç: [http://localhost:3000](http://localhost:3000)

## ✅ Test Et

### 1. Landing Page
- Ana sayfa açılmalı
- "Hemen Başla" ve "Giriş Yap" butonları görünmeli

### 2. Kayıt Ol
1. "Hemen Başla" butonuna tıkla
2. Telefon numaranı gir (gerçek numara)
3. SMS kodu gelecek (Supabase'in ücretsiz SMS'i)
4. Kodu gir
5. Profil bilgilerini doldur
6. ✅ Ana sayfaya yönlendirilmelisin

### 3. QR Kod
1. Profil → "QR Kodum" butonuna tıkla
2. QR kodun görünmeli
3. ✅ Başarılı!

## 🐛 Sorun Giderme

### "Module not found" Hatası
```bash
rm -rf node_modules
npm install
```

### Supabase Bağlantı Hatası
- `.env.local` dosyasını kontrol et
- URL ve key'leri doğru kopyaladığından emin ol
- Dev server'ı yeniden başlat (Ctrl+C, sonra `npm run dev`)

### SMS Gelmiyor
- Supabase'de Phone Auth aktif mi kontrol et
- Numara formatı doğru mu: 05XXXXXXXXX
- Supabase'in ücretsiz SMS limiti: 3 SMS/saat

### Port 3000 Kullanımda
```bash
# Farklı port kullan
npm run dev -- -p 3001
```

## 📱 Mobil Test

### Aynı Ağda Test
1. Bilgisayarının IP adresini bul:
```bash
ipconfig  # Windows
# "IPv4 Address" satırını bul (örn: 192.168.1.100)
```

2. Telefonunda tarayıcıyı aç:
```
http://192.168.1.100:3000
```

3. QR tarayıcı için HTTPS gerekli (localhost'ta çalışır)

## 🎉 Başarılı!

Eğer kayıt olup giriş yapabildiysen, proje çalışıyor demektir! 🎊

### Şimdi Ne Yapmalı?

1. **Profil Düzenle**: Bilgilerini güncelle
2. **QR Kodu İndir**: Paylaş
3. **Ayarları Keşfet**: Bildirimleri ayarla

### Kalan Özellikler

Şu özellikler henüz tamamlanmadı (çalışmıyor):
- ❌ Sosyal feed (gönderi paylaşma)
- ❌ Park notları
- ❌ Yerime geç
- ❌ Take to me (carpooling)
- ❌ Marketplace
- ❌ VIP QR

Bu özellikler için `IMPLEMENTATION_GUIDE.md` dosyasına bak.

## 💡 İpuçları

- **Hot Reload**: Kod değişikliği yaptığında sayfa otomatik yenilenir
- **Console**: Tarayıcı console'unu aç (F12) hataları görmek için
- **Supabase Dashboard**: Database'i görüntüle, logları kontrol et
- **Git**: Değişiklikleri commit et düzenli olarak

## 📞 Yardım

Sorun yaşarsan:
1. `DEVELOPMENT_NOTES.md` dosyasına bak
2. Supabase loglarını kontrol et
3. Browser console'da hata var mı bak
4. Terminal'de hata mesajı var mı kontrol et

---

**Başarılar! 🚀**
