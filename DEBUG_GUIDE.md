# 🐛 Debug Rehberi - SOQRS

## 🎯 Debug Mode Nasıl Aktif Edilir?

### Otomatik (Development)
Development ortamında otomatik aktif!

### Manuel (Production)
```javascript
// Browser Console'da çalıştır
localStorage.setItem('DEBUG_MODE', 'true')
// Sayfayı yenile
location.reload()
```

**Kapatmak için:**
```javascript
localStorage.removeItem('DEBUG_MODE')
location.reload()
```

---

## 📊 Debug Bar Özellikleri

### 🔴 Altta Sabit Bildirim Çubuğu
- ✅ Real-time hata yakalama
- ✅ Console error/warning monitoring
- ✅ Network status (online/offline)
- ✅ HTTP error tracking (404, 500, etc.)
- ✅ Custom debug messages

### 🎮 Quick Actions
1. **Check Auth** - Auth token'ı console'a yazdır
2. **Check Storage** - LocalStorage'ı console'a yazdır
3. **Temizle** - Debug mesajlarını temizle

---

## 🚨 Yakalanan Hatalar

### 1️⃣ 404 Errors
**Ne zaman:** Sayfa bulunamadığında
**Nerede:** `app/not-found.tsx`
**Debug Bar'da:** `404: /path/to/page`

### 2️⃣ API Errors
**Ne zaman:** API endpoint çalışmadığında
**Nerede:** `middleware.ts` + `app/api/[...catchall]/route.ts`
**Debug Bar'da:** `HTTP 404: /api/endpoint`

### 3️⃣ Network Errors
**Ne zaman:** İnternet bağlantısı kesildiğinde
**Debug Bar'da:** `İnternet bağlantısı kesildi`

### 4️⃣ Console Errors
**Ne zaman:** JavaScript hatası olduğunda
**Debug Bar'da:** Hata mesajı + timestamp

---

## 🔧 Implemented vs Not Implemented

### ✅ Çalışan Özellikler
- `/login` - Email/password login
- `/register` - Phone/OTP registration
- `/park` - Park ana sayfa + harita
- `/qr/scan` - QR tarama
- `/qr/my-qr` - QR kodumu göster
- `/social` - Sosyal feed
- `/marketplace` - Marketplace
- `/take-to-me` - Carpooling
- `/profile` - Profil görüntüleme
- `/profile/edit` - Profil düzenleme
- `/settings` - Ayarlar

### ⏳ Henüz Geliştirilmemiş
- `/qr/vip` - VIP QR (Stripe entegrasyonu gerekli)
- `/messages` - Mesajlaşma
- `/notifications` - Bildirim listesi
- Park notu oluşturma
- Araç ekleme
- Takip/engelleme sistemi

---

## 📡 API Endpoints

### ✅ Çalışan API'ler
```
POST /api/auth/login
POST /api/auth/logout
POST /api/sms/send-otp
PUT  /api/profile/update
POST /api/qr/scan
GET  /api/park/nearby
POST /api/rides/create
POST /api/marketplace/create
POST /api/social/create
POST /api/stripe/create-checkout (501 - Stripe gerekli)
```

### ❌ Henüz Geliştirilmemiş
```
POST /api/qr/generate
POST /api/notifications/send
POST /api/messages/send
POST /api/park/create-note
POST /api/park/create-spot
POST /api/vehicles/add
POST /api/follows/create
POST /api/blocks/create
POST /api/posts/like
POST /api/posts/comment
```

**Not:** Geliştirilmemiş endpoint'ler `501 Not Implemented` döner

---

## 🧪 Test Credentials

### Email Login
```
Email: test@soqrs.com
Password: Test1234!
```

### Phone Login (Test Mode)
```
Phone: +905511074559
OTP: 123456
```

---

## 🔍 Debug Senaryoları

### Senaryo 1: Login Çalışmıyor
1. Debug mode'u aç
2. Login sayfasına git
3. Test credentials ile giriş yap
4. Debug bar'da hataları kontrol et
5. Console'da detaylı log'ları gör

### Senaryo 2: API 404 Hatası
1. Debug mode aktif
2. Henüz geliştirilmemiş özelliği dene
3. Debug bar'da `HTTP 501: /api/...` görünür
4. Middleware otomatik yakalayıp bilgi verir

### Senaryo 3: Sayfa Bulunamadı
1. Olmayan bir sayfaya git (örn: `/test123`)
2. 404 sayfası otomatik açılır
3. Debug bar'da `404: /test123` görünür
4. Console'da detaylı bilgi

### Senaryo 4: Network Hatası
1. İnternet bağlantısını kes
2. Debug bar'da `İnternet bağlantısı kesildi` görünür
3. Bağlantı gelince `İnternet bağlantısı geri geldi`

---

## 🛠️ Geliştirici Araçları

### Console Commands
```javascript
// Debug mode aç/kapat
localStorage.setItem('DEBUG_MODE', 'true')
localStorage.removeItem('DEBUG_MODE')

// Auth token kontrol
console.log(localStorage.getItem('supabase.auth.token'))

// Tüm localStorage
console.log(localStorage)

// Custom debug message
window.dispatchEvent(new CustomEvent('debug-message', {
  detail: { type: 'info', message: 'Test mesajı' }
}))
```

### Network Monitoring
Debug mode aktifken tüm fetch istekleri otomatik izlenir:
- ✅ Başarılı istekler: Sessiz
- ❌ Hatalı istekler: Debug bar'da görünür

---

## 📝 Hata Raporlama

### Production'da Hata Bulursan:
1. Debug mode'u aç
2. Hatayı tekrarla
3. Debug bar'daki mesajları kaydet
4. Console'daki log'ları kaydet
5. Ekran görüntüsü al
6. Destek ekibine ilet

---

## 🎨 Debug Bar Renk Kodları

- 🔵 **Mavi** - Info (bilgi)
- 🟢 **Yeşil** - Success (başarılı)
- 🟡 **Sarı** - Warning (uyarı)
- 🔴 **Kırmızı** - Error (hata)

---

## 🚀 Sonraki Adımlar

1. ✅ Debug mode aktif
2. ✅ 404 handler çalışıyor
3. ✅ API error handler çalışıyor
4. ✅ Network monitoring aktif
5. ⏳ Eksik özellikler geliştirilecek

---

**Debug mode ile mutlu testler!** 🐛🔧
