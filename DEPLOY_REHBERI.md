# 🚀 Canlıya Alma Rehberi (Git Olmadan)

## ⚠️ Git Yüklü Değil

Windows'ta Git yüklü değil. 2 seçenek var:

---

## SEÇENEK 1: Git Kur ve Deploy Et (Önerilen)

### 1️⃣ Git'i Yükle (2 dk)

**İndir:**
- [git-scm.com/download/win](https://git-scm.com/download/win)
- İndir ve kur
- "Git Bash" seçeneğini işaretle
- PowerShell'i yeniden başlat

### 2️⃣ GitHub'a Push

```powershell
cd C:\Users\craze\soqrs

# Git init
git init
git config user.name "YourName"
git config user.email "your@email.com"

# Add ve commit
git add .
git commit -m "Initial commit - SOQRS MVP"

# GitHub'a push
git branch -M main
git remote add origin https://github.com/USERNAME/soqrs.git
git push -u origin main
```

### 3️⃣ Vercel'e Deploy

1. [vercel.com](https://vercel.com) → Sign up
2. "Import Project"
3. GitHub repo seç
4. Environment Variables ekle
5. Deploy!

---

## SEÇENEK 2: Manuel ZIP Upload (Hızlı)

### 1️⃣ Dosyaları Hazırla

```powershell
cd C:\Users\craze\soqrs

# node_modules'ü sil (büyük dosya)
Remove-Item -Recurse -Force node_modules

# ZIP oluştur
Compress-Archive -Path * -DestinationPath C:\Users\craze\soqrs-deploy.zip
```

### 2️⃣ GitHub'a Manuel Upload

1. [github.com](https://github.com) → New Repository
2. "soqrs" adını ver
3. "Upload files" → ZIP'i sürükle
4. Commit!

### 3️⃣ Vercel'e Deploy

1. [vercel.com](https://vercel.com) → Sign up
2. "Import Project" → GitHub seç
3. Environment Variables ekle
4. Deploy!

---

## SEÇENEK 3: Vercel CLI (En Hızlı)

### 1️⃣ Vercel CLI Kur

```powershell
npm install -g vercel
```

### 2️⃣ Login

```powershell
vercel login
```

### 3️⃣ Deploy!

```powershell
cd C:\Users\craze\soqrs
vercel
```

İlk deploy:
- Project name: soqrs
- Setup: Yes
- Framework: Next.js
- Deploy!

Environment variables ekle:
```powershell
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Her bir değeri gir...
```

Sonra tekrar deploy:
```powershell
vercel --prod
```

---

## 📋 Environment Variables (Vercel'de)

Şunları ekle:

```
NEXT_PUBLIC_SUPABASE_URL=https://gpfkiusdbygypbgebjpz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (service role key)
NETGSM_USERCODE=2166067560
NETGSM_PASSWORD=5CCE*12
NETGSM_MSGHEADER=2166067560
NEXT_PUBLIC_APP_URL=https://soqrs.vercel.app
```

---

## 🎯 Hangi Seçenek?

**En Kolay:** Vercel CLI (Seçenek 3)
- 5 dakika
- Tek komut: `vercel`

**Önerilen:** Git + GitHub (Seçenek 1)
- Profesyonel
- Version control
- Otomatik deployment

**Acil:** Manuel ZIP (Seçenek 2)
- Git kurmadan
- GitHub web üzerinden

---

## 🚀 Vercel CLI ile Deployment (Detaylı)

### Adım 1: Vercel CLI Kur

```powershell
npm install -g vercel
```

### Adım 2: Login

```powershell
vercel login
# Email gir, onay linkine tıkla
```

### Adım 3: İlk Deploy

```powershell
cd C:\Users\craze\soqrs
vercel
```

Sorular:
- **Set up and deploy?** Y
- **Which scope?** Kendi hesabın
- **Link to existing?** N
- **Project name?** soqrs
- **Directory?** ./
- **Framework?** Next.js (otomatik detect edilir)

Deploy başlar, 2-3 dakika sürer!

### Adım 4: Environment Variables

```powershell
# Tek tek ekle
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Değeri yapıştır: https://gpfkiusdbygypbgebjpz.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Anon key'i yapıştır

vercel env add SUPABASE_SERVICE_ROLE_KEY production  
# Service role key'i yapıştır

vercel env add NETGSM_USERCODE production
# 2166067560

vercel env add NETGSM_PASSWORD production
# 5CCE*12

vercel env add NETGSM_MSGHEADER production
# 2166067560

vercel env add NEXT_PUBLIC_APP_URL production
# https://soqrs.vercel.app (veya kendi domain'in)
```

### Adım 5: Production Deploy

```powershell
vercel --prod
```

Bu sefer env variables ile deploy edilir!

---

## ✅ Deploy Başarılı!

URL: `https://soqrs-USERNAME.vercel.app`

### Sonraki Adımlar:

1. ✅ URL'yi aç
2. ✅ Landing page test et
3. ✅ Kayıt ol dene
4. ✅ QR özellikleri test et

### Domain Bağla (Opsiyonel):

```powershell
vercel domains add soqrs.com
```

DNS ayarlarını yap, 5 dakika sonra hazır!

---

## 🐛 Sorun Giderme

### "vercel: command not found"
```powershell
# PATH'e ekle
$env:Path += ";$env:APPDATA\npm"
# Veya PowerShell'i yeniden başlat
```

### Build hatası
```powershell
# Local'de test et
npm run build

# Hata varsa düzelt
# Tekrar deploy
vercel --prod
```

### Environment variables eklenmiyor
```powershell
# Tümünü listele
vercel env ls

# Sil ve tekrar ekle
vercel env rm VARIABLE_NAME production
vercel env add VARIABLE_NAME production
```

---

## 💡 Hangi Yöntemi Seçmeliyim?

### Vercel CLI (Önerilen ⭐)
- ✅ 5 dakika
- ✅ Tek komut
- ✅ Otomatik build
- ✅ Environment variables kolay
- ❌ Git yok (sıkıntı değil)

### Git + GitHub
- ✅ Profesyonel
- ✅ Version control
- ✅ Team collaboration
- ❌ Git kurulumu gerekli
- ❌ Biraz daha uzun

### Manuel ZIP
- ✅ Git gerektirmez
- ✅ Hızlı
- ❌ Version control yok
- ❌ Her seferinde ZIP

---

## 🎯 Önerim

**Şimdi:** Vercel CLI kullan (en hızlısı)
**Sonra:** Git kur ve GitHub'a geç (profesyonel)

```powershell
# Şimdi yap:
npm install -g vercel
vercel login
vercel
# Environment variables ekle
vercel --prod
```

**5 dakikada canlıda! 🚀**
