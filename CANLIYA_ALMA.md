# 🚀 Canlıya Alma Rehberi

## 📋 Seçenekler

### Seçenek 1: Kendi Sunucun (phpMyAdmin var)
- ✅ Supabase yerine kendi MySQL/PostgreSQL
- ✅ Tam kontrol
- ⚠️ Database migration gerekli

### Seçenek 2: Supabase (Önerilen - Hızlı)
- ✅ Ücretsiz başlangıç
- ✅ Hazır database
- ✅ Otomatik backup
- ✅ 5 dakikada hazır

---

## 🎯 HIZLI BAŞLANGIÇ (Supabase ile)

### 1️⃣ Supabase Hesabı Oluştur (2 dk)

1. [supabase.com](https://supabase.com) → Sign up
2. "New Project" → Proje adı: `soqrs`
3. Database şifresi oluştur (KAYDET!)
4. Region: Europe (Frankfurt)
5. "Create new project" → Bekle (~2 dk)

### 2️⃣ Database'i Kur (1 dk)

1. Sol menü → **SQL Editor**
2. "New Query"
3. `supabase/migrations/00001_initial_schema.sql` dosyasını aç
4. **TÜMÜNÜ** kopyala (Ctrl+A, Ctrl+C)
5. SQL Editor'e yapıştır (Ctrl+V)
6. "Run" butonuna tıkla
7. ✅ "Success" mesajını gör

### 3️⃣ API Anahtarlarını Al (30 sn)

1. Sol menü → **Settings** (dişli) → **API**
2. Şu 3 değeri kopyala:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon public:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**service_role:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4️⃣ .env.local Oluştur (30 sn)

PowerShell'de:
```powershell
cd C:\Users\craze\soqrs
notepad .env.local
```

Şunu yapıştır ve bilgilerini doldur:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# NetGSM (Şimdilik boş bırakabilirsin)
NETGSM_USERCODE=
NETGSM_PASSWORD=
NETGSM_MSGHEADER=SOQRS

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Kaydet: Ctrl+S, Kapat: Alt+F4

### 5️⃣ Test Et! (10 sn)

```powershell
npm run dev
```

Tarayıcıda: **http://localhost:3000**

✅ Landing page görünüyorsa BAŞARILI!

---

## 🌐 Production'a Deploy

### Vercel (ÜCRETSİZ - Önerilen)

1. **GitHub'a Push Et:**
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/soqrs.git
git push -u origin main
```

2. **Vercel'e Deploy:**
   - [vercel.com](https://vercel.com) → Sign up
   - "Import Project"
   - GitHub repo'nu seç
   - Environment Variables ekle (`.env.local` içeriği)
   - "Deploy"!

3. **Domain Bağla:**
   - Vercel Dashboard → Settings → Domains
   - `soqrs.com` ekle
   - DNS ayarlarını yap

---

## 🖥️ Kendi Sunucuna Deploy (cPanel/Plesk)

### Gereksinimler:
- Node.js 18+
- PM2 veya Forever
- Nginx/Apache

### Adımlar:

1. **Dosyaları Yükle:**
```bash
# Local'den sunucuya
scp -r C:\Users\craze\soqrs user@server:/var/www/
```

2. **Sunucuda:**
```bash
cd /var/www/soqrs
npm install
npm run build

# PM2 ile başlat
npm install -g pm2
pm2 start npm --name "soqrs" -- start
pm2 save
pm2 startup
```

3. **Nginx Config:**
```nginx
server {
    listen 80;
    server_name soqrs.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📊 Kendi Database Kullanmak İstersen

### MySQL/PostgreSQL Migration

1. **Database Oluştur:**
```sql
CREATE DATABASE soqrs;
```

2. **Migration'ı Çalıştır:**
   - `supabase/migrations/00001_initial_schema.sql` dosyasını aç
   - phpMyAdmin'de çalıştır
   - Veya:
```bash
mysql -u root -p soqrs < supabase/migrations/00001_initial_schema.sql
```

3. **Bağlantı Ayarları:**
   - `lib/supabase/` klasöründeki dosyaları düzenle
   - Supabase yerine kendi DB connection string'ini kullan

---

## 🐛 Hata Ayıklama

### Canlıda Test Etmek İçin:

1. **Console Logları:**
   - Tarayıcıda F12 → Console
   - Hataları gör

2. **Network İstekleri:**
   - F12 → Network
   - API isteklerini izle

3. **Supabase Logs:**
   - Supabase Dashboard → Logs
   - Database hatalarını gör

4. **Server Logs:**
```powershell
# Development
npm run dev

# Production (PM2)
pm2 logs soqrs
```

---

## ✅ Canlıya Alma Checklist

- [ ] Supabase projesi oluşturuldu
- [ ] Database migration çalıştırıldı
- [ ] `.env.local` oluşturuldu ve dolduruldu
- [ ] `npm run dev` çalışıyor
- [ ] Landing page açılıyor
- [ ] Kayıt ol sayfası çalışıyor
- [ ] GitHub'a push edildi
- [ ] Vercel'e deploy edildi
- [ ] Domain bağlandı
- [ ] SSL sertifikası aktif
- [ ] Production'da test edildi

---

## 🎯 İlk Test Senaryosu

1. Landing page aç
2. "Hemen Başla" butonuna tıkla
3. Telefon numarası gir (SMS gelecek)
4. Kodu gir
5. Profil bilgilerini doldur
6. ✅ Ana sayfaya yönlendirildin mi?

**Hata varsa:**
- F12 → Console'a bak
- Hata mesajını kopyala
- Bana gönder, düzeltelim!

---

**Başarılar! Canlıya alıyoruz! 🚀**
