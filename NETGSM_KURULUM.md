# 📱 NetGSM SMS Kurulumu

## 1. NetGSM Hesabı

1. [netgsm.com.tr](https://www.netgsm.com.tr) adresine git
2. Hesap oluştur veya giriş yap
3. SMS paketi satın al (test için küçük paket yeterli)

## 2. API Bilgilerini Al

1. NetGSM paneline giriş yap
2. **Ayarlar** → **API Kullanıcı Adı/Şifre** bölümüne git
3. Şu bilgileri not et:
   - **Kullanıcı Kodu** (Usercode): 8503xxxxxx
   - **Şifre** (Password): API şifresi
   - **Başlık** (Msgheader): SOQRS (veya onaylı başlığınız)

## 3. .env.local Dosyasına Ekle

`.env.local` dosyasını aç ve ekle:

```env
# NetGSM SMS
NETGSM_USERCODE=8503xxxxxx
NETGSM_PASSWORD=your_api_password
NETGSM_MSGHEADER=SOQRS
```

## 4. Başlık (Msgheader) Onayı

NetGSM'de SMS başlığı kullanmak için onay gerekir:

1. NetGSM panelinde **Başlık Tanımlama** bölümüne git
2. "SOQRS" başlığını ekle
3. Onay bekle (genelde 1-2 saat)
4. Onaylanana kadar test için mevcut başlıklarınızı kullanabilirsiniz

## 5. Test Et

```bash
# Development server'ı başlat
npm run dev

# Kayıt ol sayfasına git
# Telefon numaranı gir
# SMS gelecek!
```

## 📊 NetGSM Fiyatlandırma

- **Standart SMS**: ~0.05 TL/SMS
- **Test Paketi**: 100 SMS = ~5 TL
- **Toplu Paket**: 1000 SMS = ~40 TL

## 🔧 Telefon Format

NetGSM telefon formatı:
- ✅ Doğru: `905XXXXXXXXX` (90 ile başlar, 0 yok)
- ❌ Yanlış: `05XXXXXXXXX`
- ❌ Yanlış: `+905XXXXXXXXX`

Kod otomatik düzeltir, sen normal gir: `05XXXXXXXXX`

## 🐛 Sorun Giderme

### SMS Gitmiyor

1. **API bilgileri doğru mu?**
   - Usercode, password, msgheader kontrol et
   - `.env.local` dosyasında doğru mu?

2. **Başlık onaylı mı?**
   - NetGSM panelinde kontrol et
   - Onaylanana kadar farklı başlık kullan

3. **Bakiye var mı?**
   - NetGSM panelinde bakiyeni kontrol et
   - SMS paketi aktif mi?

4. **Hata kodları:**
   - `30`: Kullanıcı adı/şifre hatalı
   - `40`: Başlık tanımlı değil
   - `80`: Gönderim sınırı aşıldı

### Dev Server'ı Yeniden Başlat

`.env.local` değiştirdikten sonra:
```bash
# Ctrl+C ile durdur
npm run dev
```

## 🎯 Alternatif: Supabase SMS

NetGSM yerine Supabase'in kendi SMS'ini de kullanabilirsin:

1. Supabase Dashboard → Authentication → Providers
2. Phone provider'ı aç
3. Twilio veya MessageBird entegre et
4. Veya Supabase'in ücretsiz SMS'ini kullan (limitli)

## 💡 Production İpuçları

1. **Rate Limiting Ekle**: Spam önlemek için
2. **SMS Logları**: Gönderilen SMS'leri database'e kaydet
3. **Hata Yönetimi**: SMS gitmezse kullanıcıyı bilgilendir
4. **Backup**: NetGSM çalışmazsa alternatif SMS servisi hazır tut

## 📞 NetGSM Destek

- **Web**: netgsm.com.tr
- **Telefon**: 0850 xxx xxxx
- **Email**: destek@netgsm.com.tr
- **Dokümantasyon**: [API Docs](https://www.netgsm.com.tr/dokuman/)

---

**Başarılar! 📱**
