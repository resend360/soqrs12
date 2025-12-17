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
    // NetGSM telefon formatı: 905XXXXXXXXX (başında + ve 0 yok)
    let cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '90' + cleanPhone.substring(1)
    } else if (!cleanPhone.startsWith('90')) {
      cleanPhone = '90' + cleanPhone
    }
    
    // NetGSM XML API kullanımı
    const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<mainbody>
  <header>
    <company dil="TR">Netgsm</company>
    <usercode>${config.usercode}</usercode>
    <password>${config.password}</password>
    <type>1:n</type>
    <msgheader>${config.msgheader}</msgheader>
  </header>
  <body>
    <msg><![CDATA[${message}]]></msg>
    <no>${cleanPhone}</no>
  </body>
</mainbody>`

    const response = await fetch('https://api.netgsm.com.tr/sms/send/xml', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
      },
      body: xmlData,
    })
    
    const result = await response.text()
    
    console.log('NetGSM Response:', result)

    // NetGSM başarılı yanıt: "00 XXXXXXXX" (00 = başarılı, XXXXXXXX = bulkid)
    if (result.trim().startsWith('00')) {
      console.log('SMS sent successfully via NetGSM:', result)
      return true
    } else {
      console.error('NetGSM error code:', result)
      const errorCode = result.trim()
      if (NETGSM_ERROR_CODES[errorCode]) {
        console.error('NetGSM error:', NETGSM_ERROR_CODES[errorCode])
      }
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
