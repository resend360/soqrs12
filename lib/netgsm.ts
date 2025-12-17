// NetGSM SMS API Integration

interface NetGSMConfig {
  usercode: string
  password: string
  msgheader: string
}

const config: NetGSMConfig = {
  usercode: process.env.NETGSM_USERCODE || '',
  password: process.env.NETGSM_PASSWORD || '',
  msgheader: process.env.NETGSM_MSGHEADER || 'SOQRS',
}

export async function sendSMS(phone: string, message: string): Promise<boolean> {
  try {
    // NetGSM telefon formatı: 905XXXXXXXXX (başında 0 yok)
    const cleanPhone = phone.replace(/\D/g, '').replace(/^0/, '90')
    
    const url = 'https://api.netgsm.com.tr/sms/send/get'
    const params = new URLSearchParams({
      usercode: config.usercode,
      password: config.password,
      gsmno: cleanPhone,
      message: message,
      msgheader: config.msgheader,
      dil: 'TR',
    })

    const response = await fetch(`${url}?${params.toString()}`)
    const result = await response.text()

    // NetGSM başarılı yanıt: "00 XXXXXXXX" (00 = başarılı, XXXXXXXX = bulkid)
    if (result.startsWith('00')) {
      console.log('SMS sent successfully via NetGSM:', result)
      return true
    } else {
      console.error('NetGSM error:', result)
      return false
    }
  } catch (error) {
    console.error('NetGSM send error:', error)
    return false
  }
}

export async function sendOTP(phone: string, code: string): Promise<boolean> {
  const message = `SOQRS dogrulama kodunuz: ${code}\n\nBu kodu kimseyle paylasmayiniz.`
  return sendSMS(phone, message)
}

export async function sendSecurityAlert(phone: string, username: string): Promise<boolean> {
  const message = `SOQRS Guvenlik Uyarisi!\n\nQR kodunuz farkli bir lokasyonda tarandi. Aracınızı kontrol edin.\n\nsoqrs.com/@${username}`
  return sendSMS(phone, message)
}

export async function sendParkNote(phone: string, message: string): Promise<boolean> {
  const smsMessage = `SOQRS Park Notu:\n\n${message}\n\nDetaylar icin uygulamayi acin.`
  return sendSMS(phone, smsMessage)
}

// NetGSM Hata Kodları
export const NETGSM_ERROR_CODES: { [key: string]: string } = {
  '20': 'Mesaj metninde hata var (Boş ya da standartlara uygun değil)',
  '30': 'Geçersiz kullanıcı adı, şifre veya kullanıcınızın API erişim izninin olmadığı',
  '40': 'Mesaj başlığınız (gönderici adınız) sistemde tanımlı değil',
  '50': 'Abone hesabınız ile İYS kontrollü gönderim yapamazsınız',
  '51': 'Birden fazla abonenin İYS kontrolünde onayı yok',
  '70': 'Hatalı sorgulama',
  '80': 'Gönderim sınırı aşıldı',
  '85': 'Mükerrer gönderim',
}
