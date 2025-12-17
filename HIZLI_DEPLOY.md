# ⚡ Hızlı Deploy - Şimdi Yap!

## 🚀 3 ADIMDA CANLIYA AL

### 1️⃣ PowerShell'de Çalıştır:

```powershell
cd C:\Users\craze\soqrs

# PATH'e npm ekle
$env:PATH += ";$env:APPDATA\npm"

# Vercel ile deploy
npx vercel --prod
```

### 2️⃣ Environment Variables Ekle

Vercel deploy sırasında soracak. Şunları gir:

**NEXT_PUBLIC_SUPABASE_URL:**
```
https://gpfkiusdbygypbgebjpz.supabase.co
```

**NEXT_PUBLIC_SUPABASE_ANON_KEY:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwZmtpdXNkYnlneXBiZ2VianB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MjI4NzEsImV4cCI6MjA1MDAwMjg3MX0.nal2-hCi9Aj_Ig5rOKAZuA_r_vwNA3K
```

**SUPABASE_SERVICE_ROLE_KEY:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwZmtpdXNkYnlneXBiZ2VianB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDQyMjg3MSwiZXhwIjoyMDUwMDAyODcxfQ.SD4K9IJ_jgR-qgbTYhWTvw_2GCreiDw
```

**NETGSM_USERCODE:**
```
2166067560
```

**NETGSM_PASSWORD:**
```
5CCE*12
```

**NETGSM_MSGHEADER:**
```
2166067560
```

### 3️⃣ Deploy Tamamlandı!

URL'yi kopyala ve aç!

---

## 🐛 "npx: command not found" Hatası Alırsan

```powershell
# Node.js PATH'e ekle
$env:PATH = "C:\Program Files\nodejs;$env:PATH;$env:APPDATA\npm"

# Tekrar dene
npx vercel --prod
```

---

## 🎯 Alternatif: Vercel Web UI

Eğer CLI çalışmazsa:

1. **ZIP Oluştur:**
```powershell
# Gereksiz dosyaları sil
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue

# ZIP oluştur
Compress-Archive -Path * -DestinationPath C:\Users\craze\soqrs.zip -Force
```

2. **GitHub Upload:**
   - [github.com/new](https://github.com/new)
   - Repo: `soqrs`
   - Upload ZIP

3. **Vercel Deploy:**
   - [vercel.com/new](https://vercel.com/new)
   - Import from GitHub
   - Add environment variables
   - Deploy!

---

**ŞİMDİ YAP! ⚡**
