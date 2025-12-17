# 🪟 Windows'ta SOQRS Kurulumu

## ⚠️ ÖNEMLİ: Node.js Gerekli!

`npm` komutu çalışmıyorsa Node.js yüklü değil demektir.

---

## 1️⃣ Node.js Kurulumu

### Otomatik Kurulum (Önerilen)

1. **Node.js İndir:**
   - [nodejs.org](https://nodejs.org/) adresine git
   - **LTS** versiyonunu indir (v18.x veya v20.x)
   - `node-v20.x.x-x64.msi` dosyasını çalıştır

2. **Kurulum Sihirbazı:**
   - "Next" → "I accept" → "Next"
   - ✅ **"Automatically install necessary tools"** seçeneğini işaretle
   - "Next" → "Install"
   - Kurulum bitince PowerShell'i **KAPAT ve YENİDEN AÇ**

3. **Kontrol Et:**
```powershell
node --version
# v20.x.x görmeli

npm --version
# 10.x.x görmeli
```

---

## 2️⃣ Proje Kurulumu

### Adım 1: Bağımlılıkları Yükle
```powershell
cd C:\Users\craze\soqrs
npm install
```

Bu işlem 2-3 dakika sürebilir. Bekle!

### Adım 2: .env.local Oluştur

1. `.env.example` dosyasını kopyala:
```powershell
Copy-Item .env.example .env.local
```

2. `.env.local` dosyasını düzenle:
```powershell
notepad .env.local
```

3. Şu bilgileri doldur:
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

4. Kaydet ve kapat (Ctrl+S, Alt+F4)

### Adım 3: Supabase Kur

**Detaylı rehber:** `SUPABASE_KURULUM.md` dosyasını aç!

Kısaca:
1. [supabase.com](https://supabase.com) → Yeni proje oluştur
2. SQL Editor → `supabase/migrations/00001_initial_schema.sql` çalıştır
3. Settings → API → Anahtarları kopyala
4. `.env.local` dosyasına yapıştır

### Adım 4: NetGSM Kur

**Detaylı rehber:** `NETGSM_KURULUM.md` dosyasını aç!

Kısaca:
1. [netgsm.com.tr](https://netgsm.com.tr) → Hesap oluştur
2. SMS paketi al
3. API bilgilerini al
4. `.env.local` dosyasına yapıştır

### Adım 5: Başlat!
```powershell
npm run dev
```

Tarayıcıda aç: **http://localhost:3000**

---

## 🐛 Sorun Giderme

### "npm: The term 'npm' is not recognized"
- Node.js yüklü değil
- Node.js'i yükle ve PowerShell'i **YENİDEN BAŞLAT**

### "Cannot find module"
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Port 3000 Kullanımda
```powershell
# Farklı port kullan
npm run dev -- -p 3001
```

### PowerShell Execution Policy Hatası
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## 📊 Hızlı Komutlar

```powershell
# Node.js versiyonunu kontrol et
node --version
npm --version

# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

---

## 🎯 Kurulum Kontrol Listesi

- [ ] Node.js 18+ kurulu
- [ ] `node --version` çalışıyor
- [ ] `npm --version` çalışıyor
- [ ] `npm install` tamamlandı
- [ ] `.env.local` oluşturuldu ve dolduruldu
- [ ] Supabase kuruldu
- [ ] NetGSM kuruldu
- [ ] `npm run dev` çalışıyor
- [ ] http://localhost:3000 açılıyor

---

## 💡 İpuçları

1. **PowerShell'i Yönetici Olarak Çalıştır:**
   - Sağ tık → "Run as Administrator"

2. **PATH Kontrolü:**
   ```powershell
   $env:PATH -split ';' | Select-String node
   ```

3. **Node.js Yeniden Yükle:**
   - Eski versiyonu kaldır (Control Panel → Programs)
   - Yeni versiyonu yükle
   - PowerShell'i yeniden başlat

4. **WSL Kullan (Alternatif):**
   ```powershell
   wsl --install
   # Ubuntu'da çalıştır
   ```

---

## 🚀 Hızlı Başlangıç (Node.js Yüklüyse)

```powershell
# Tek satırda
cd C:\Users\craze\soqrs; npm install; npm run dev
```

---

## 📞 Yardım

Hala sorun yaşıyorsan:
1. Node.js'i kaldır ve yeniden yükle
2. PowerShell'i yönetici olarak çalıştır
3. Bilgisayarı yeniden başlat
4. `SUPABASE_KURULUM.md` ve `NETGSM_KURULUM.md` dosyalarını oku

---

**Başarılar! 🎉**
