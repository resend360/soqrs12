# 🗄️ Supabase Tabloları - Hızlı Kurulum

## 📋 Kurulum Sırası

### 1️⃣ İlk Migration (Temel Tablolar)
```sql
-- Supabase Dashboard > SQL Editor > New Query
-- Dosya: supabase/migrations/00001_initial_schema.sql
```

**İçerir:**
- ✅ users (kullanıcılar)
- ✅ vehicles (araçlar)
- ✅ qr_scans (QR taramalar)
- ✅ park_spots (park yerleri)
- ✅ park_notes (park notları)
- ✅ notifications (bildirimler)
- ✅ messages (mesajlar)
- ✅ follows (takip)
- ✅ blocks (engelleme)

### 2️⃣ İkinci Migration (Ek Özellikler)
```sql
-- Supabase Dashboard > SQL Editor > New Query
-- Dosya: supabase/migrations/00002_additional_tables.sql
```

**İçerir:**
- ✅ ride_requests (yolculuk talepleri)
- ✅ marketplace_items (marketplace ilanları)
- ✅ posts (sosyal feed)
- ✅ post_likes (beğeniler)
- ✅ post_comments (yorumlar)

---

## 🚀 Hızlı Kurulum Komutu

### Supabase Dashboard'dan:

1. **SQL Editor** aç
2. **New Query** bas
3. Aşağıdaki dosyaları sırayla çalıştır:

```bash
# 1. İlk migration
supabase/migrations/00001_initial_schema.sql

# 2. İkinci migration
supabase/migrations/00002_additional_tables.sql
```

---

## ✅ Kontrol

Tabloların oluşturulduğunu kontrol et:

```sql
-- Tüm tabloları listele
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

**Beklenen Çıktı (19 tablo):**
1. users
2. vehicles
3. qr_scans
4. park_spots
5. park_notes
6. notifications
7. messages
8. follows
9. blocks
10. ride_requests
11. marketplace_items
12. posts
13. post_likes
14. post_comments

---

## 🔧 Sorun Giderme

### Hata: "relation already exists"
```sql
-- Tabloyu sil ve tekrar oluştur
DROP TABLE IF EXISTS table_name CASCADE;
```

### Hata: "function already exists"
```sql
-- Fonksiyonu sil ve tekrar oluştur
DROP FUNCTION IF EXISTS function_name CASCADE;
```

### RLS Hatası
```sql
-- RLS'i devre dışı bırak (sadece test için!)
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
```

---

## 📊 Önemli Fonksiyonlar

### 1. Yakındaki Park Yerleri
```sql
SELECT * FROM get_nearby_park_spots(41.0082, 28.9784, 500);
```

### 2. Yakındaki Yolculuk Talepleri
```sql
SELECT * FROM get_nearby_ride_requests(41.0082, 28.9784, 5000);
```

### 3. Kullanıcı İstatistikleri
```sql
SELECT * FROM get_user_stats('user-uuid-here');
```

---

## 🔐 RLS (Row Level Security)

Tüm tablolarda RLS aktif! Politikalar:

- ✅ **SELECT**: Herkes public verileri görebilir
- ✅ **INSERT**: Sadece kendi verilerini ekleyebilir
- ✅ **UPDATE**: Sadece kendi verilerini güncelleyebilir
- ✅ **DELETE**: Sadece kendi verilerini silebilir

---

## 📱 Test Kullanıcısı

```sql
-- Test kullanıcısı oluştur
INSERT INTO public.users (id, phone, username, full_name, email)
VALUES (
  'auth-user-id-from-supabase-auth',
  '+905511074559',
  'testuser',
  'Test Kullanıcı',
  'test@soqrs.com'
);
```

---

## 🎯 Sonraki Adımlar

1. ✅ Tabloları oluştur
2. ✅ Test kullanıcısı ekle
3. ✅ RLS politikalarını kontrol et
4. ✅ API'leri test et
5. ✅ Production'a deploy et!

---

**Not:** Tüm migration'lar `supabase/migrations/` klasöründe!

