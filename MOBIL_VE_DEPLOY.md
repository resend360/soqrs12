# 📱 Mobil & Canlıya Alma Rehberi

## 📊 Proje Durumu

### ✅ Çalışan (60% MVP)

**Backend & Altyapı (100%)**
- ✅ Next.js 14 + TypeScript
- ✅ Supabase database (18 tablo)
- ✅ NetGSM SMS entegrasyonu
- ✅ Authentication sistemi
- ✅ API routes hazır
- ✅ PWA yapılandırması

**Frontend (60%)**
- ✅ Landing page
- ✅ Login/Register sayfaları
- ✅ Onboarding (3 adım)
- ✅ Profile & Edit
- ✅ QR kod üretme/tarama
- ✅ Settings
- ✅ Notifications
- ✅ Responsive design (Tailwind)

**Eksik Sayfalar (40%)**
- ❌ Sosyal feed (gönderi paylaşma)
- ❌ Park notları sistemi
- ❌ Yerime Geç (park yeri paylaşma)
- ❌ Take to Me (carpooling)
- ❌ Marketplace
- ❌ Chat sistemi
- ❌ VIP QR satın alma

---

## 📱 MOBİL DURUM

### PWA (Progressive Web App) ✅

Proje zaten PWA olarak yapılandırılmış!

**Çalışan Özellikler:**
- ✅ `manifest.json` hazır
- ✅ Service Worker (`public/sw.js`)
- ✅ Offline fallback
- ✅ "Add to Home Screen" desteği
- ✅ App ikonu
- ✅ Splash screen

**Kullanımı:**
1. Mobil cihazda siteyi aç
2. Tarayıcı menü → "Add to Home Screen"
3. Uygulama gibi kullan!

### Responsive Design ✅

- ✅ Tüm sayfalar mobil uyumlu
- ✅ Tailwind CSS ile responsive
- ✅ Touch gestures hazır
- ✅ QR scanner kamera erişimi

### Native App Yapmak İstersen (Gelecekte)

**React Native:**
- Mevcut Next.js kodunu kullanabilirsin
- API'ler hazır
- UI componentlerini tekrar kullan

**Capacitor:**
- Next.js projesini native app'e çevir
- iOS/Android store'da yayınla

---

## 🚀 CANLIYA ALMA (3 Seçenek)

### SEÇENEK 1: Vercel (ÜCRETSİZ - Önerilen) ⭐

**Avantajları:**
- ✅ Ücretsiz
- ✅ Otomatik SSL
- ✅ Global CDN
- ✅ Otomatik deployment
- ✅ Next.js optimizasyonu

**Adımlar:**

1. **GitHub'a Push Et:**
```powershell
cd C:\Users\craze\soqrs
git init
git add .
git commit -m "Initial commit - SOQRS MVP"
git branch -M main
git remote add origin https://github.com/USERNAME/soqrs.git
git push -u origin main
```

2. **Vercel'e Deploy:**
   - [vercel.com](https://vercel.com) → Sign up (GitHub ile)
   - "Import Project"
   - GitHub repo'nu seç: `USERNAME/soqrs`
   - "Import"

3. **Environment Variables Ekle:**
   - Settings → Environment Variables
   - `.env.local` dosyasındaki tüm değerleri ekle:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NETGSM_USERCODE`
     - `NETGSM_PASSWORD`
     - `NETGSM_MSGHEADER`

4. **Deploy:**
   - "Deploy" butonuna tıkla
   - 2-3 dakika bekle
   - ✅ Canlıda!

5. **Domain Bağla:**
   - Vercel Dashboard → Settings → Domains
   - `soqrs.com` ekle
   - DNS ayarlarını yap (A record veya CNAME)

**Ücretsiz Plan Limitleri:**
- 100 GB bandwidth/ay
- Unlimited deployments
- Otomatik SSL

---

### SEÇENEK 2: Kendi Sunucun (VPS/cPanel)

**Gereksinimler:**
- Node.js 18+
- PM2 veya Forever
- Nginx/Apache

**Adımlar:**

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
    server_name soqrs.com www.soqrs.com;
    
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

4. **SSL (Let's Encrypt):**
```bash
sudo certbot --nginx -d soqrs.com -d www.soqrs.com
```

**Detaylı rehber:** `SSH_KURULUM.md`

---

### SEÇENEK 3: Netlify (Alternatif)

**Benzer Vercel'e:**
- Ücretsiz plan
- Otomatik SSL
- Global CDN

**Adımlar:**
1. [netlify.com](https://netlify.com) → Sign up
2. "Import from Git"
3. GitHub repo'nu seç
4. Environment variables ekle
5. Deploy!

---

## 🌐 Domain Ayarları

### DNS Konfigürasyonu (GoDaddy/Namecheap/vb.)

**Vercel için:**
```
A Record:
Name: @
Value: 76.76.21.21

CNAME Record:
Name: www
Value: cname.vercel-dns.com
```

**Kendi Sunucu için:**
```
A Record:
Name: @
Value: YOUR_SERVER_IP

A Record:
Name: www
Value: YOUR_SERVER_IP
```

---

## 📱 Mobil Test

### PWA Testi

1. **Android Chrome:**
   - Site'yi aç
   - Menü → "Add to Home Screen"
   - Uygulama gibi aç

2. **iOS Safari:**
   - Site'yi aç
   - Share → "Add to Home Screen"
   - Uygulama gibi aç

### QR Scanner Testi

1. Mobilde siteyi aç
2. "QR Tara" butonuna tıkla
3. Kamera izni ver
4. QR kod tara

---

## 🐛 Canlıda Test Senaryosu

### 1. Landing Page
- [ ] Sayfa yükleniyor mu?
- [ ] Görseller görünüyor mu?
- [ ] Butonlar çalışıyor mu?

### 2. Kayıt Ol
- [ ] Telefon numarası giriliyor mu?
- [ ] SMS geliyor mu? (NetGSM)
- [ ] Kod doğrulanıyor mu?
- [ ] Profil oluşturuluyor mu?

### 3. QR Kod
- [ ] QR kod üretiliyor mu?
- [ ] QR kod görüntüleniyor mu?
- [ ] QR scanner açılıyor mu?
- [ ] Kamera çalışıyor mu?

### 4. Profil
- [ ] Profil görüntüleniyor mu?
- [ ] Düzenleme çalışıyor mu?
- [ ] Fotoğraf yükleniyor mu? (Cloudinary gerekli)

### 5. Performans
- [ ] Sayfa yükleme hızı?
- [ ] Mobil performans?
- [ ] PWA çalışıyor mu?

---

## 📊 Production Checklist

**Öncesi:**
- [ ] `.env.local` değerlerini production'a ekle
- [ ] Supabase RLS policies aktif mi kontrol et
- [ ] Error handling kontrol et
- [ ] Console log'ları temizle

**Deployment:**
- [ ] GitHub'a push edildi
- [ ] Vercel/Netlify'a deploy edildi
- [ ] Environment variables eklendi
- [ ] Build başarılı

**Sonrası:**
- [ ] Domain bağlandı
- [ ] SSL aktif (HTTPS)
- [ ] Tüm sayfalar test edildi
- [ ] Mobil PWA test edildi
- [ ] Analytics eklendi (opsiyonel)

---

## 🎯 Performans İpuçları

1. **Lighthouse Skoru:**
   - F12 → Lighthouse
   - Performance, Accessibility test et

2. **Image Optimization:**
   - Next.js Image component kullanıldı ✅
   - Cloudinary entegre et (daha iyi)

3. **Caching:**
   - Next.js otomatik cache ✅
   - Vercel CDN ✅

4. **Bundle Size:**
   - 606 paket yüklü
   - Next.js tree-shaking ✅

---

## 🔒 Güvenlik

**Hazır:**
- ✅ Environment variables
- ✅ Supabase RLS policies
- ✅ API rate limiting (Supabase)
- ✅ Input validation (Zod)

**Eklenebilir:**
- ⏳ CORS ayarları
- ⏳ Rate limiting (API routes)
- ⏳ DDoS protection (Vercel otomatik)

---

## 💰 Maliyet Tahmini

**Ücretsiz Plan (Yeterli):**
- Vercel: Ücretsiz
- Supabase: Ücretsiz (500 MB DB)
- NetGSM: ~5 TL / 100 SMS

**Büyüyünce (1000+ kullanıcı):**
- Vercel Pro: $20/ay
- Supabase Pro: $25/ay
- NetGSM: Paket bazlı

---

## 🚀 Hemen Deploy Et!

**En hızlı yol (5 dakika):**

```powershell
# 1. Git init
git init
git add .
git commit -m "Initial commit"

# 2. GitHub'a push (repo oluştur önce)
git remote add origin https://github.com/USERNAME/soqrs.git
git push -u origin main

# 3. Vercel'e git
# vercel.com → Import → GitHub repo seç → Deploy!
```

---

## 📱 Mobil App Yapmak İstersen (Gelecek)

**React Native ile:**
1. `npx react-native init SoqrsApp`
2. API'leri kullan (hazır!)
3. UI'ları yeniden yap (veya web view kullan)
4. App Store + Play Store'da yayınla

**Capacitor ile (Daha kolay):**
1. `npm install @capacitor/core @capacitor/cli`
2. Next.js build'i wrap et
3. Native app olarak derle
4. Store'larda yayınla

---

**Başarılar! Canlıya alıyoruz! 🚀**
