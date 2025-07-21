import { useState, useRef } from 'react';

interface TextToSpeechHook {
  speak: (text: string, onComplete?: () => void) => void;
  isSpeaking: boolean;
  cancel: () => void;
  isSupported: boolean;
}

export const useTextToSpeech = (): TextToSpeechHook => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState('speechSynthesis' in window);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = (text: string, onComplete?: () => void) => {
    if (!isSupported) {
      console.warn('Text-to-speech is not supported in this browser');
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower for more natural speech
    utterance.pitch = 1.05; // Slightly higher pitch for more feminine sound
    utterance.volume = 1;

    // Enhanced female voice selection
    const voices = speechSynthesis.getVoices();
    const femaleVoiceNames = [
      'samantha', 'karen', 'victoria', 'alex', 'sarah', 'emma', 'lisa', 'anna',
      'maria', 'sophie', 'julia', 'claire', 'rachel', 'jessica', 'ashley',
      'female', 'woman', 'girl', 'lady'
    ];
    
    // Try to find a female voice by name
    let femaleVoice = voices.find(voice => 
      femaleVoiceNames.some(name => 
        voice.name.toLowerCase().includes(name)
      )
    );
    
    // If no specific female voice found, try to find any voice that sounds feminine
    if (!femaleVoice) {
      femaleVoice = voices.find(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('woman') ||
         voice.name.toLowerCase().includes('girl'))
      );
    }
    
    // Fallback to any English female-sounding voice
    if (!femaleVoice) {
      femaleVoice = voices.find(voice => 
        voice.lang.startsWith('en') && 
        voice.name.toLowerCase().includes('samantha')
      );
    }
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
      console.log('Using female voice:', femaleVoice.name);
    } else {
      console.log('No female voice found, using default voice');
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      if (onComplete) {
        onComplete();
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      if (onComplete) {
        onComplete();
      }
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return {
    speak,
    isSpeaking,
    cancel,
    isSupported
  };
};