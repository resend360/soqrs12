# SOQRS - QR Tabanlı Sosyal Platform + Carpooling Sistemi

Modern, cross-platform QR sosyal platform ve minimal carpooling sistemi. Next.js 14, TypeScript, Supabase ve PWA teknolojileri ile geliştirilmiştir.

🚀 **Live Demo:** https://soqrs12.vercel.app

## 🎯 Proje Özeti

**SOQRS**, QR kod bazlı sosyal bir platformdur. Kullanıcılar araçlarına/eşyalarına özel QR kod alır, park iletişimi kurar, sosyal ağlarını genişletir ve carpooling ile yolculuklarını paylaşır.

### Ana Özellikler

- ✅ **QR Sistemi**: Her kullanıcıya unique QR, tarama ile profil görüntüleme
- ✅ **Park İletişim**: Araçlara not bırakma, güvenli iletişim
- ✅ **Sosyal Platform**: Feed, hikayeler, shorts, arkadaşlık sistemi
- ✅ **Yerime Geç**: Park yerini paylaşma + bahşiş sistemi
- ✅ **Take to Me**: Minimal P2P carpooling (otomatik eşleştirme YOK)
- ✅ **Marketplace**: Kullanıcı arası ilan alanı
- ✅ **VIP QR**: Premium QR tasarımları satışı (Stripe)
- ✅ **Güvenlik**: Lokasyon tabanlı uyarılar, güçlü bildirim sistemi

## 🚀 Teknoloji Stack

### Frontend
- **Next.js 14** (App Router, TypeScript, Server Components, Server Actions)
- **Tailwind CSS** + **shadcn/ui** (component library)
- **PWA** (Progressive Web App) - offline support, installable
- **Framer Motion** (smooth animations)
- **React Hook Form** + **Zod** (form validation)
- **Zustand** (lightweight state management)
- **TanStack Query** (data fetching & caching)

### Backend
- **Supabase**:
  - PostgreSQL + PostGIS (location features)
  - Auth (phone SMS, email, social login)
  - Storage (QR codes)
  - Realtime (chat, notifications, live tracking)
  - Edge Functions (SMS, push notifications)
  - Row Level Security (RLS policies)

### Payments & Services
- **Stripe** (VIP QR purchases, platform fees)
- **Twilio** (SMS verification & notifications)
- **OneSignal** (push notifications)
- **Google Maps API** (geocoding, distance, maps)
- **Cloudinary** (image optimization, CDN)

### QR & Media
- **qrcode.react** (QR generation)
- **html5-qrcode** (QR scanning)
- **react-webcam** (camera access)

### Internationalization
- **next-i18next** (multi-language)
- Languages: Türkçe (TR - default), English (EN), Deutsch (DE), Español (ES), Français (FR)

## 📁 Proje Yapısı

```
soqrs/
├── app/
│   ├── (auth)/              # Auth pages (login, register, onboarding)
│   ├── (main)/              # Main app pages (park, social, take-to-me, profile)
│   ├── api/                 # API routes
│   ├── offline/             # Offline fallback page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── shared/              # Shared components (Header, BottomNav)
│   ├── landing/             # Landing page components
│   └── providers.tsx        # React Query provider
├── lib/
│   ├── supabase/            # Supabase client & server
│   ├── cloudinary.ts        # Cloudinary utilities
│   ├── stripe.ts            # Stripe utilities
│   ├── utils.ts             # Helper functions
│   └── validations.ts       # Zod schemas
├── types/
│   ├── database.types.ts    # Supabase generated types
│   └── index.ts             # Custom types
├── hooks/
│   └── use-toast.ts         # Toast hook
├── supabase/
│   ├── migrations/          # Database migrations
│   ├── functions/           # Edge Functions
│   └── config.toml          # Supabase config
├── public/
│   ├── manifest.json        # PWA manifest
│   ├── sw.js                # Service worker
│   └── icons/               # App icons
├── .env.local.example       # Environment variables example
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── package.json             # Dependencies
```

## 🛠️ Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn
- Supabase hesabı
- Stripe hesabı (VIP özellikler için)
- Twilio hesabı (SMS için)
- Google Maps API key
- Cloudinary hesabı

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repo-url>
cd soqrs
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment variables ayarlayın**
`.env.local.example` dosyasını `.env.local` olarak kopyalayın ve değerleri doldurun:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# OneSignal
NEXT_PUBLIC_ONESIGNAL_APP_ID=your_onesignal_app_id
ONESIGNAL_API_KEY=your_onesignal_api_key

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Supabase database'i ayarlayın**
```bash
# Supabase CLI kurulumu (opsiyonel)
npm install -g supabase

# Migration'ları çalıştırın
supabase db push
```

Veya Supabase Dashboard'dan `supabase/migrations/00001_initial_schema.sql` dosyasını manuel olarak çalıştırın.

5. **Development server'ı başlatın**
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📱 PWA Kurulumu

PWA olarak çalışması için:

1. HTTPS üzerinden serve edin (production'da otomatik)
2. Tarayıcıda "Ana ekrana ekle" seçeneği görünecektir
3. Offline mode için service worker otomatik çalışır

## 🗄️ Database Schema

Detaylı database schema için `supabase/migrations/00001_initial_schema.sql` dosyasına bakın.

### Ana Tablolar
- `users` - Kullanıcı profilleri
- `qr_codes` - QR kod bilgileri
- `vehicles` - Araç bilgileri
- `posts` - Sosyal medya gönderileri
- `park_notes` - Park notları
- `park_spots` - Park yeri paylaşımları
- `ride_requests` - Yolculuk talepleri
- `ride_offers` - Sürücü teklifleri
- `marketplace_ads` - Marketplace ilanları
- `notifications` - Bildirimler
- `security_alerts` - Güvenlik uyarıları

## 🔐 Güvenlik

- **Row Level Security (RLS)**: Tüm tablolarda aktif
- **Phone SMS Verification**: Twilio ile güvenli doğrulama
- **Encrypted Data**: Plaka numaraları şifreli
- **Location Security**: QR tarama lokasyon kontrolü
- **Input Validation**: Zod schemas ile doğrulama

## 🌍 Çoklu Dil Desteği

Desteklenen diller:
- 🇹🇷 Türkçe (default)
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇪🇸 Español
- 🇫🇷 Français

## 🚀 Deployment

### Vercel (Önerilen)

1. GitHub'a push edin
2. Vercel'e import edin
3. Environment variables'ı ekleyin
4. Deploy edin

```bash
npm run build
npm run start
```

### Domain Ayarları
- Primary: **soqrs.com**
- Redirect: **soqrz.com** → soqrs.com

## 📝 Önemli Notlar

### P2P & Legal
- Platform "carpooling eşleştirme" servisidir
- Ticari taşımacılık DEĞİLDİR
- Kullanıcılar kendi yolculuklarından sorumludur
- Platform ücreti "hizmet bedeli"dir

### Media Strategy
- Video upload YOK (MVP)
- Sadece fotoğraf
- Tüm media Cloudinary'de

### Minimal Take to Me
- Real-time tracking YOK (MVP)
- Otomatik eşleştirme YOK
- Manuel koordinasyon

## 🎨 Design System

### Colors
- Primary: `#FF6B35` (Turuncu)
- Secondary: `#004E89` (Mavi)
- Success: `#2EC4B6` (Yeşil)
- Warning: `#FFB703` (Sarı)
- Danger: `#E71D36` (Kırmızı)

### Typography
- Heading: Inter (Bold)
- Body: Inter (Regular)
- Accent: Poppins

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel bir projedir. Tüm hakları saklıdır.

## 📞 İletişim

- Website: [soqrs.com](https://soqrs.com)
- Alternative: [soqrz.com](https://soqrz.com)

---

**SOQRS** - QR ile bağlan, sosyalleş, yolculuk et! 🚀
