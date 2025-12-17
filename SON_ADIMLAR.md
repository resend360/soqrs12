# 🚀 SOQRS - Son Adımlar ve Bağlantı

## ✅ Yapılması Gerekenler (Sırayla)

### 1. Node.js Kontrolü
```bash
node --version
npm --version
```

Eğer yüklü değilse: [nodejs.org](https://nodejs.org/) adresinden indir ve kur.

### 2. Bağımlılıkları Yükle
```bash
cd c:\Users\craze\soqrs
npm install
```

Bu işlem 2-3 dakika sürebilir. Bekle!

### 3. Supabase Kurulumu
**Detaylı rehber:** `SUPABASE_KURULUM.md` dosyasını aç ve takip et!

Kısaca:
1. [supabase.com](https://supabase.com) → Yeni proje oluştur
2. SQL Editor → `supabase/migrations/00001_initial_schema.sql` çalıştır
3. Settings → API → Anahtarları kopyala
4. `.env.local` dosyasını oluştur ve doldur

### 4. NetGSM SMS Kurulumu
**Detaylı rehber:** `NETGSM_KURULUM.md` dosyasını aç!

Kısaca:
1. [netgsm.com.tr](https://www.netgsm.com.tr) → Hesap oluştur
2. SMS paketi al
3. API bilgilerini al (usercode, password, msgheader)
4. `.env.local` dosyasına ekle

### 5. .env.local Dosyası Oluştur

`.env.example` dosyasını `.env.local` olarak kopyala:

```bash
copy .env.example .env.local
```

Sonra düzenle:

```env
# Supabase (ZORUNLU)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# NetGSM (ZORUNLU - SMS için)
NETGSM_USERCODE=8503xxxxxx
NETGSM_PASSWORD=your_password
NETGSM_MSGHEADER=SOQRS

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Başlat!
```bash
npm run dev
```

Tarayıcıda aç: **http://localhost:3000**

---

## 🎯 İlk Test

### 1. Landing Page
- ✅ Ana sayfa açılmalı
- ✅ "Hemen Başla" butonu görünmeli

### 2. Kayıt Ol
1. "Hemen Başla" butonuna tıkla
2. Telefon numaranı gir: `05XXXXXXXXX`
3. SMS kodu gelecek (NetGSM'den)
4. Kodu gir
5. Profil bilgilerini doldur
6. ✅ Ana sayfaya yönlendirilmelisin

### 3. QR Kod
1. Profil → "QR Kodum" butonuna tıkla
2. QR kodun görünmeli
3. ✅ Başarılı!

---

## 🔧 Eksik Özellikler (Çalışmıyor)

Bunlar henüz implement edilmedi:
- ❌ Sosyal feed (gönderi paylaşma)
- ❌ Park notları
- ❌ Yerime geç
- ❌ Carpooling (Take to Me)
- ❌ Marketplace ilanları
- ❌ VIP QR satın alma

**Nasıl eklersin?** → `IMPLEMENTATION_GUIDE.md` dosyasına bak!

---

## 📱 Mobil Test

### Aynı Ağda Test
1. Bilgisayarının IP adresini bul:
```bash
ipconfig
# IPv4 Address: 192.168.1.100
```

2. Telefonunda tarayıcıyı aç:
```
http://192.168.1.100:3000
```

3. QR tarayıcı için HTTPS gerekli (localhost'ta çalışır)

---

## 🐛 Sorun Giderme

### "Module not found" Hatası
```bash
rm -rf node_modules
npm install
```

### Supabase Bağlanamıyor
- `.env.local` dosyasını kontrol et
- Anahtarları doğru kopyaladın mı?
- Dev server'ı yeniden başlat (Ctrl+C, sonra `npm run dev`)

### SMS Gelmiyor
- NetGSM bilgileri doğru mu?
- Bakiye var mı?
- Başlık onaylı mı?
- `NETGSM_KURULUM.md` dosyasına bak

### Port 3000 Kullanımda
```bash
npm run dev -- -p 3001
```

---

## 📊 Proje Durumu

### ✅ Çalışan (60%)
- Authentication (telefon SMS)
- Profil oluşturma ve düzenleme
- QR kod üretme ve tarama
- Ayarlar
- Bildirimler (yapı hazır)
- PWA (offline, kurulabilir)

### 🚧 Yapılacak (40%)
- Sosyal feed
- Park özellikleri
- Carpooling
- Marketplace
- VIP QR

---

## 📚 Dokümantasyon

1. **SUPABASE_KURULUM.md** - Detaylı Supabase kurulumu
2. **NETGSM_KURULUM.md** - NetGSM SMS kurulumu
3. **BAGLANTI_REHBERI.md** - Genel bağlantı rehberi
4. **IMPLEMENTATION_GUIDE.md** - Kalan özellikleri nasıl eklersin
5. **README.md** - Proje genel bakış

---

## 🎉 Başarı Kriterleri

Eğer bunları yapabiliyorsan, proje çalışıyor demektir:

- ✅ Landing page açılıyor
- ✅ Kayıt olabiliyorum
- ✅ SMS kodu geliyor
- ✅ Profil oluşturabiliyorum
- ✅ QR kodum görünüyor
- ✅ Profil düzenleyebiliyorum
- ✅ Çıkış yapabiliyorum

---

## 💡 Sonraki Adımlar

1. **Test Et**: Tüm özellikleri dene
2. **Geliştir**: `IMPLEMENTATION_GUIDE.md` ile devam et
3. **Deploy Et**: Vercel'e deploy et (production)
4. **Domain**: soqrs.com domain'ini bağla

---

## 🚀 Production'a Geçiş

### Vercel Deploy
1. GitHub'a push et
2. [vercel.com](https://vercel.com) → Import project
3. Environment variables'ı ekle
4. Deploy!

### Domain Bağlama
1. Vercel Dashboard → Settings → Domains
2. `soqrs.com` ekle
3. DNS ayarlarını yap
4. ✅ Canlıda!

---

## 📞 Yardım

Sorun yaşarsan:
1. İlgili dokümana bak (SUPABASE_KURULUM.md, NETGSM_KURULUM.md)
2. Console'u kontrol et (F12)
3. Terminal'de hata var mı bak
4. `.env.local` dosyasını kontrol et

---

**Başarılar! Projen hazır! 🎊**

Şimdi:
1. ✅ `npm install` çalıştır
2. ✅ Supabase'i kur
3. ✅ NetGSM'i kur
4. ✅ `.env.local` oluştur
5. ✅ `npm run dev` ile başlat

**Kolay gelsin! 🚀**
