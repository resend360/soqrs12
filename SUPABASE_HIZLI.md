# ⚡ Supabase Hızlı Kurulum (3 Dakika)

## 🚀 ADIM ADIM

### 1️⃣ Supabase Hesabı Oluştur (1 dk)

**Tarayıcıda aç:** S

1. **"Start your project"** butonuna tıkla
2. **GitHub ile giriş yap** (en hızlısı)
3. **"New Project"** butonuna tıkla
4. **Organization seç** (veya yeni oluştur)

### 2️⃣ Proje Bilgilerini Doldur (30 sn)

- **Name:** `soqrs`
- **Database Password:** Güçlü bir şifre oluştur
  - Örnek: `SoqRs2024!SecurePass`
  - **ÖNEMLİ:** Bu şifreyi kaydet!
- **Region:** `Europe (Frankfurt)` - Türkiye'ye en yakın
- **Pricing Plan:** `Free` (başlangıç için yeterli)

**"Create new project"** → ⏰ Bekle 2 dakika

---

### 3️⃣ SQL Migration'ı Çalıştır (1 dk)

Proje hazır olunca:

1. Sol menüden **"SQL Editor"** sekmesine tıkla
2. **"New Query"** butonuna tıkla
3. Cursor'da `supabase/migrations/00001_initial_schema.sql` dosyasını aç
4. **TÜMÜNÜ** seç (Ctrl+A) ve kopyala (Ctrl+C)
5. Supabase SQL Editor'e yapıştır (Ctrl+V)
6. Sağ üstteki **"Run"** butonuna tıkla
7. ✅ **"Success. No rows returned"** mesajını gör

**Tebrikler! Database hazır!** 🎉

---

### 4️⃣ API Anahtarlarını Al (30 sn)

1. Sol menüden **Settings** (dişli ikonu) → **API** sekmesine git
2. Şu 3 değeri kopyala:

#### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
**Nerede:** "Project URL" başlığının altında

#### anon public Key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**Nerede:** "Project API keys" → "anon public" → Sağdaki kopyala ikonu

#### service_role Key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
**Nerede:** "Project API keys" → "service_role" → Sağdaki kopyala ikonu
**⚠️ DİKKAT:** Bu anahtarı GİZLİ tut!

---

### 5️⃣ .env.local Dosyasını Güncelle (30 sn)

PowerShell'de:
```powershell
notepad C:\Users\craze\soqrs\.env.local
```

Şu 3 satırı bul ve değiştir:

**ÖNCE:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**SONRA:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Kaydet:** Ctrl+S, **Kapat:** Alt+F4

---

### 6️⃣ Test Et! (10 sn)

PowerShell'de:
```powershell
# Eğer çalışıyorsa Ctrl+C ile durdur
npm run dev
```

Tarayıcıda: **http://localhost:3000**

✅ **Landing page hatasız açılacak!**

---

## 🎯 Kontrol Listesi

- [ ] Supabase hesabı oluşturuldu
- [ ] Proje oluşturuldu (2 dk beklendi)
- [ ] SQL migration çalıştırıldı
- [ ] 3 API anahtarı kopyalandı
- [ ] `.env.local` dosyası güncellendi
- [ ] `npm run dev` çalışıyor
- [ ] http://localhost:3000 hatasız açılıyor

---

## 🐛 Sorun Giderme

### "Success" yerine hata aldım
- SQL'i tekrar kopyala ve yapıştır
- Tüm SQL'in kopyalandığından emin ol (449 satır)

### "Invalid API key" hatası
- `.env.local` dosyasını kontrol et
- Anahtarları doğru kopyaladın mı?
- Dev server'ı yeniden başlat (Ctrl+C, sonra `npm run dev`)

### Proje oluşturulmuyor
- 2 dakika bekle
- Sayfayı yenile
- Supabase status'ü kontrol et: status.supabase.com

---

## 📊 Supabase'de Neler Var?

Kurduğun tablolar:
- ✅ users (kullanıcılar)
- ✅ qr_codes (QR kodlar)
- ✅ vehicles (araçlar)
- ✅ posts (gönderiler)
- ✅ likes (beğeniler)
- ✅ comments (yorumlar)
- ✅ park_notes (park notları)
- ✅ park_spots (park yerleri)
- ✅ friendships (arkadaşlıklar)
- ✅ notifications (bildirimler)
- ✅ ve 8 tablo daha...

**Toplam 18 tablo hazır!**

---

## 💡 İpuçları

1. **Database Şifreni Kaydet:** Kaybedersen sıfırlamak zor
2. **Service Role Key'i Gizli Tut:** Asla GitHub'a pushlamayın
3. **Table Editor:** Supabase'de verileri görüntüleyebilirsin
4. **Logs:** Hataları Supabase Dashboard → Logs'da görebilirsin

---

## 🎉 Tebrikler!

Supabase hazır! Şimdi:
1. ✅ `npm run dev` çalıştır
2. ✅ http://localhost:3000 aç
3. ✅ "Hemen Başla" butonuna tıkla
4. ✅ Kayıt ol sayfasını test et

**Başarılar! 🚀**
