# 🚀 SSH ile Tek Seferde Kurulum

## 📋 Ön Hazırlık

### 1. Gerekli Bilgileri Hazırla

Şunları hazır tut:
- ✅ Supabase URL
- ✅ Supabase Anon Key
- ✅ Supabase Service Role Key
- ✅ NetGSM Usercode
- ✅ NetGSM Password
- ✅ NetGSM Msgheader

---

## 🖥️ SSH Bağlantısı

```bash
# SSH ile sunucuya bağlan
ssh user@your-server-ip

# Veya key ile
ssh -i your-key.pem user@your-server-ip
```

---

## ⚡ Tek Komut Kurulum

```bash
# 1. Node.js kur (eğer yoksa)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Git kur (eğer yoksa)
sudo apt-get install -y git

# 3. Projeyi klonla
cd /var/www  # veya istediğin dizin
git clone <your-repo-url> soqrs
cd soqrs

# 4. Bağımlılıkları yükle
npm install

# 5. .env.local oluştur
cat > .env.local << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# NetGSM
NETGSM_USERCODE=8503xxxxxx
NETGSM_PASSWORD=your_password
NETGSM_MSGHEADER=SOQRS

# App
NEXT_PUBLIC_APP_URL=https://soqrs.com
EOF

# 6. Build yap
npm run build

# 7. PM2 ile başlat (production)
npm install -g pm2
pm2 start npm --name "soqrs" -- start
pm2 save
pm2 startup
```

---

## 🔧 Manuel Adım Adım

### 1. Node.js Kurulumu

```bash
# Node.js 18.x kur
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Kontrol et
node --version  # v18.x.x
npm --version   # 9.x.x
```

### 2. Projeyi Hazırla

```bash
# Proje dizinine git
cd /var/www

# Repo'yu klonla (veya dosyaları yükle)
git clone <repo-url> soqrs
cd soqrs

# Veya dosyaları SCP ile yükle
# scp -r ./soqrs user@server:/var/www/
```

### 3. Bağımlılıkları Yükle

```bash
npm install
```

### 4. Environment Variables

```bash
# .env.local dosyasını oluştur
nano .env.local
```

İçeriği yapıştır:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

NETGSM_USERCODE=8503xxxxxx
NETGSM_PASSWORD=your_password
NETGSM_MSGHEADER=SOQRS

NEXT_PUBLIC_APP_URL=https://soqrs.com
```

Kaydet: `Ctrl+X`, `Y`, `Enter`

### 5. Build

```bash
npm run build
```

### 6. PM2 ile Çalıştır

```bash
# PM2 kur
npm install -g pm2

# Uygulamayı başlat
pm2 start npm --name "soqrs" -- start

# Otomatik başlatma
pm2 startup
pm2 save

# Logları görmek için
pm2 logs soqrs
```

---

## 🌐 Nginx Konfigürasyonu

```bash
# Nginx kur
sudo apt-get install -y nginx

# Config dosyası oluştur
sudo nano /etc/nginx/sites-available/soqrs
```

İçerik:
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

Aktifleştir:
```bash
sudo ln -s /etc/nginx/sites-available/soqrs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 SSL Sertifikası (Let's Encrypt)

```bash
# Certbot kur
sudo apt-get install -y certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d soqrs.com -d www.soqrs.com

# Otomatik yenileme
sudo certbot renew --dry-run
```

---

## 📊 PM2 Komutları

```bash
# Durumu göster
pm2 status

# Logları göster
pm2 logs soqrs

# Yeniden başlat
pm2 restart soqrs

# Durdur
pm2 stop soqrs

# Sil
pm2 delete soqrs

# Tüm uygulamaları göster
pm2 list

# Monitoring
pm2 monit
```

---

## 🔄 Güncelleme (Deploy)

```bash
# Sunucuya bağlan
ssh user@server

# Proje dizinine git
cd /var/www/soqrs

# Son değişiklikleri çek
git pull

# Bağımlılıkları güncelle
npm install

# Yeniden build
npm run build

# PM2'yi yeniden başlat
pm2 restart soqrs
```

---

## 🐛 Sorun Giderme

### Port 3000 Kullanımda
```bash
# Port'u kullanan process'i bul
sudo lsof -i :3000

# Process'i öldür
sudo kill -9 <PID>
```

### PM2 Çalışmıyor
```bash
# PM2'yi yeniden başlat
pm2 kill
pm2 start npm --name "soqrs" -- start
```

### Nginx Hatası
```bash
# Nginx loglarını kontrol et
sudo tail -f /var/log/nginx/error.log

# Nginx'i test et
sudo nginx -t

# Yeniden başlat
sudo systemctl restart nginx
```

### Build Hatası
```bash
# node_modules'ü sil ve yeniden yükle
rm -rf node_modules
npm install

# Cache'i temizle
rm -rf .next
npm run build
```

---

## 📁 Dosya İzinleri

```bash
# Doğru izinleri ver
sudo chown -R $USER:$USER /var/www/soqrs
chmod -R 755 /var/www/soqrs
```

---

## 🔥 Firewall Ayarları

```bash
# UFW kur ve aktifleştir
sudo apt-get install -y ufw

# Portları aç
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS

# Aktifleştir
sudo ufw enable

# Durumu kontrol et
sudo ufw status
```

---

## 📊 Monitoring

### PM2 Plus (Opsiyonel)
```bash
# PM2 Plus'a kaydol: https://app.pm2.io
pm2 link <secret> <public>
```

### Disk Kullanımı
```bash
df -h
```

### Memory Kullanımı
```bash
free -m
```

### CPU Kullanımı
```bash
top
```

---

## 🎯 Hızlı Komutlar

```bash
# Tek satırda tüm kurulum (Node.js yüklü olduğunu varsayar)
cd /var/www/soqrs && npm install && npm run build && pm2 start npm --name "soqrs" -- start && pm2 save

# Hızlı güncelleme
cd /var/www/soqrs && git pull && npm install && npm run build && pm2 restart soqrs

# Logları izle
pm2 logs soqrs --lines 100

# Tüm servisleri yeniden başlat
pm2 restart all && sudo systemctl restart nginx
```

---

## ✅ Kurulum Kontrol Listesi

- [ ] Node.js 18+ kurulu
- [ ] Proje dosyaları yüklendi
- [ ] npm install tamamlandı
- [ ] .env.local oluşturuldu ve dolduruldu
- [ ] npm run build başarılı
- [ ] PM2 ile uygulama çalışıyor
- [ ] Nginx kurulu ve yapılandırıldı
- [ ] SSL sertifikası alındı
- [ ] Firewall ayarlandı
- [ ] Domain DNS ayarları yapıldı

---

## 🌐 Domain DNS Ayarları

Domain sağlayıcında (GoDaddy, Namecheap, vs):

```
A Record:
Name: @
Value: YOUR_SERVER_IP

A Record:
Name: www
Value: YOUR_SERVER_IP
```

---

**Başarılar! Sunucun hazır! 🚀**
