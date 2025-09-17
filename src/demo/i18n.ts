// Simple i18n helper for demo
export const t = (key: string, lang: string = 'en'): string => {
  const translations: { [key: string]: { [lang: string]: string } } = {
    'welcome': {
      en: 'Welcome to Sangini AI',
      hi: 'सांगिनी AI में आपका स्वागत है',
      pa: 'ਸੰਗਿਨੀ AI ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ'
    },
    'choose_language': {
      en: 'Choose your language',
      hi: 'अपनी भाषा चुनें',
      pa: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ'
    },
    'enter_otp': {
      en: 'Enter OTP',
      hi: 'OTP दर्ज करें',
      pa: 'OTP ਦਰਜ ਕਰੋ'
    },
    'verify': {
      en: 'Verify',
      hi: 'सत्यापित करें',
      pa: 'ਪੁਸ਼ਟੀ ਕਰੋ'
    },
    'start_chat': {
      en: 'Start Chat',
      hi: 'चैट शुरू करें',
      pa: 'ਚੈਟ ਸ਼ੁਰੂ ਕਰੋ'
    },
    'invite_friend': {
      en: 'Invite a friend → +3 min call',
      hi: 'दोस्त को आमंत्रित करें → +3 मिनट कॉल',
      pa: 'ਦੋਸਤ ਨੂੰ ਸੱਦੋ → +3 ਮਿੰਟ ਕਾਲ'
    },
    'adults_only': {
      en: 'Adults only • Consensual roleplay only • No real-person uploads',
      hi: 'केवल वयस्क • केवल सहमति से रोलप्ले • कोई वास्तविक व्यक्ति अपलोड नहीं',
      pa: 'ਸਿਰਫ਼ ਬਾਲਗ • ਸਿਰਫ਼ ਸਹਿਮਤੀ ਨਾਲ ਰੋਲਪਲੇ • ਕੋਈ ਅਸਲ ਵਿਅਕਤੀ ਅਪਲੋਡ ਨਹੀਂ'
    },
    'request_photo': {
      en: 'Request Photo',
      hi: 'फोटो मांगें',
      pa: 'ਫੋਟੋ ਮੰਗੋ'
    },
    'request_video': {
      en: 'Request Video',
      hi: 'वीडियो मांगें',
      pa: 'ਵੀਡੀਓ ਮੰਗੋ'
    },
    'choose_scene': {
      en: 'Choose Scene',
      hi: 'दृश्य चुनें',
      pa: 'ਸੀਨ ਚੁਣੋ'
    },
    'unlock_with': {
      en: 'Unlock with Tonight ₹10 • Invite friend +3 min call',
      hi: 'आज रात ₹10 से अनलॉक करें • दोस्त को आमंत्रित करें +3 मिनट कॉल',
      pa: 'ਅੱਜ ਰਾਤ ₹10 ਨਾਲ ਅਨਲੌਕ ਕਰੋ • ਦੋਸਤ ਨੂੰ ਸੱਦੋ +3 ਮਿੰਟ ਕਾਲ'
    },
    'messages_left': {
      en: 'messages left today',
      hi: 'आज बचे संदेश',
      pa: 'ਅੱਜ ਬਚੇ ਸੁਨੇਹੇ'
    },
    'call_minutes_left': {
      en: 'call minutes left',
      hi: 'बचे कॉल मिनट',
      pa: 'ਬਚੇ ਕਾਲ ਮਿੰਟ'
    },
    'continue_tonight': {
      en: 'Continue tonight ₹10',
      hi: 'आज रात जारी रखें ₹10',
      pa: 'ਅੱਜ ਰਾਤ ਜਾਰੀ ਰੱਖੋ ₹10'
    },
    'add_3min_call': {
      en: '+3 min call ₹10',
      hi: '+3 मिनट कॉल ₹10',
      pa: '+3 ਮਿੰਟ ਕਾਲ ₹10'
    }
  }
  
  return translations[key]?.[lang] || translations[key]?.['en'] || key
}
