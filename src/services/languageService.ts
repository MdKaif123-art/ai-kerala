interface LanguageResponse {
  language: string;
  greeting: string;
  responses: {
    welcome: string;
    help: string;
    reservation: string;
    room: string;
    services: string;
    goodbye: string;
  };
}

export class LanguageService {
  private languages: Record<string, LanguageResponse> = {
    english: {
      language: 'English',
      greeting: 'Hello! Welcome to Aadhira Hotel.',
      responses: {
        welcome: 'Welcome to Aadhira Hotel! How may I assist you today?',
        help: 'I can help you with reservations, room information, hotel services, and general inquiries.',
        reservation: 'I\'d be happy to help you with your reservation. What dates are you looking to stay?',
        room: 'We offer Standard, Deluxe, and Suite rooms with modern amenities. Which type interests you?',
        services: 'Our services include 24/7 room service, spa, fitness center, restaurant, and concierge assistance.',
        goodbye: 'Thank you for choosing Aadhira Hotel. Have a wonderful day!'
      }
    },
    hindi: {
      language: 'Hindi',
      greeting: 'नमस्ते! आधिरा होटल में आपका स्वागत है।',
      responses: {
        welcome: 'आधिरा होटल में आपका स्वागत है! आज मैं आपकी कैसे सहायता कर सकता हूं?',
        help: 'मैं आपकी बुकिंग, कमरे की जानकारी, होटल सेवाओं और सामान्य पूछताछ में मदद कर सकता हूं।',
        reservation: 'मुझे आपकी बुकिंग में मदद करने में खुशी होगी। आप कौन सी तारीखों में रुकना चाहते हैं?',
        room: 'हमारे पास आधुनिक सुविधाओं के साथ स्टैंडर्ड, डीलक्स और सूट कमरे हैं। कौन सा प्रकार आपको पसंद है?',
        services: 'हमारी सेवाओं में 24/7 रूम सर्विस, स्पा, फिटनेस सेंटर, रेस्टोरेंट और कंसीयर्ज सहायता शामिल है।',
        goodbye: 'आधिरा होटल चुनने के लिए धन्यवाद। आपका दिन शुभ हो!'
      }
    },
    tamil: {
      language: 'Tamil',
      greeting: 'வணக்கம்! ஆதிரா ஹோட்டலுக்கு வரவேற்கிறோம்.',
      responses: {
        welcome: 'ஆதிரா ஹோட்டலுக்கு வரவேற்கிறோம்! இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
        help: 'முன்பதிவு, அறை தகவல், ஹோட்டல் சேவைகள் மற்றும் பொதுவான விசாரணைகளில் நான் உங்களுக்கு உதவ முடியும்.',
        reservation: 'உங்கள் முன்பதிவில் உதவுவதில் மகிழ்ச்சி அடைகிறேன். நீங்கள் எந்த தேதிகளில் தங்க விரும்புகிறீர்கள்?',
        room: 'எங்களிடம் நவீன வசதிகளுடன் ஸ்டாண்டர்ட், டீலக்ஸ் மற்றும் சூட் அறைகள் உள்ளன. எந்த வகை உங்களுக்கு ஆர்வமாக உள்ளது?',
        services: 'எங்கள் சேவைகளில் 24/7 அறை சேவை, ஸ்பா, உடற்பயிற்சி மையம், உணவகம் மற்றும் கன்சியர்ஜ் உதவி அடங்கும்.',
        goodbye: 'ஆதிரா ஹோட்டலைத் தேர்ந்தெடுத்ததற்கு நன்றி. உங்களுக்கு அற்புதமான நாள் இருக்கட்டும்!'
      }
    },
    malayalam: {
      language: 'Malayalam',
      greeting: 'നമസ്കാരം! ആധിരാ ഹോട്ടലിലേക്ക് സ്വാഗതം.',
      responses: {
        welcome: 'ആധിരാ ഹോട്ടലിലേക്ക് സ്വാഗതം! ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?',
        help: 'റിസർവേഷൻ, റൂം വിവരങ്ങൾ, ഹോട്ടൽ സേവനങ്ങൾ, പൊതുവായ അന്വേഷണങ്ങൾ എന്നിവയിൽ എനിക്ക് നിങ്ങളെ സഹായിക്കാൻ കഴിയും.',
        reservation: 'നിങ്ങളുടെ റിസർവേഷനിൽ സഹായിക്കുന്നതിൽ സന്തോഷമുണ്ട്. നിങ്ങൾ ഏത് തീയതികളിൽ താമസിക്കാൻ ആഗ്രഹിക്കുന്നു?',
        room: 'ആധുനിക സൗകര്യങ്ങളുള്ള സ്റ്റാൻഡേർഡ്, ഡീലക്സ്, സ്യൂട്ട് റൂമുകൾ ഞങ്ങളുടെ പക്കലുണ്ട്. ഏത് തരം നിങ്ങൾക്ക് താൽപ്പര്യമുണ്ട്?',
        services: 'ഞങ്ങളുടെ സേവനങ്ങളിൽ 24/7 റൂം സർവീസ്, സ്പാ, ഫിറ്റ്നസ് സെന്റർ, റെസ്റ്റോറന്റ്, കൺസിയർജ് സഹായം എന്നിവ ഉൾപ്പെടുന്നു.',
        goodbye: 'ആധിരാ ഹോട്ടൽ തിരഞ്ഞെടുത്തതിന് നന്ദി. നിങ്ങൾക്ക് അത്ഭുതകരമായ ഒരു ദിവസം ഉണ്ടാകട്ടെ!'
      }
    }
  };

  detectLanguageFromGreeting(greeting: string): string {
    const lowerGreeting = greeting.toLowerCase().trim();
    
    if (lowerGreeting.includes('namaste') || lowerGreeting.includes('नमस्ते')) {
      return 'hindi';
    } else if (lowerGreeting.includes('vanakkam') || lowerGreeting.includes('வணக்கம்')) {
      return 'tamil';
    } else if (lowerGreeting.includes('namaskaram') || lowerGreeting.includes('നമസ്കാരം')) {
      return 'malayalam';
    } else {
      return 'english'; // Default to English
    }
  }

  getLanguageResponse(language: string): LanguageResponse {
    return this.languages[language] || this.languages.english;
  }

  getGreetingResponse(greeting: string): string {
    const detectedLanguage = this.detectLanguageFromGreeting(greeting);
    const languageData = this.getLanguageResponse(detectedLanguage);
    return languageData.greeting;
  }

  getContextualResponse(input: string, context: string): string {
    const detectedLanguage = this.detectLanguageFromGreeting(input);
    const languageData = this.getLanguageResponse(detectedLanguage);
    
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('help') || lowerInput.includes('सहायता') || 
        lowerInput.includes('உதவி') || lowerInput.includes('സഹായം')) {
      return languageData.responses.help;
    } else if (lowerInput.includes('reservation') || lowerInput.includes('booking') ||
               lowerInput.includes('बुकिंग') || lowerInput.includes('முன்பதிவு') ||
               lowerInput.includes('റിസർവേഷൻ')) {
      return languageData.responses.reservation;
    } else if (lowerInput.includes('room') || lowerInput.includes('कमरा') ||
               lowerInput.includes('அறை') || lowerInput.includes('റൂം')) {
      return languageData.responses.room;
    } else if (lowerInput.includes('service') || lowerInput.includes('सेवा') ||
               lowerInput.includes('சேவை') || lowerInput.includes('സേവനം')) {
      return languageData.responses.services;
    } else if (lowerInput.includes('bye') || lowerInput.includes('goodbye') ||
               lowerInput.includes('धन्यवाद') || lowerInput.includes('நன்றி') ||
               lowerInput.includes('നന്ദി')) {
      return languageData.responses.goodbye;
    } else {
      return languageData.responses.welcome;
    }
  }
}

export const languageService = new LanguageService();