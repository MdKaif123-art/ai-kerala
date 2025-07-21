import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, PhoneOff, ArrowLeft } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { openRouterService } from '../services/openRouterService';
import { offlineResponses } from '../data/offlineResponses';
import { hotelService } from '../services/hotelService';

interface PhoneInterfaceProps {
  onBackToChat: () => void;
}

const PhoneInterface: React.FC<PhoneInterfaceProps> = ({ onBackToChat }) => {
  const [dialedNumber, setDialedNumber] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [callDuration, setCallDuration] = useState(0);

  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();
  const { speak, isSpeaking } = useTextToSpeech();

  const dialPad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  useEffect(() => {
    let interval: number;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  useEffect(() => {
    if (transcript && isConnected) {
      handleVoiceInput(transcript);
    }
  }, [transcript, isConnected]);

  const handleDigitPress = (digit: string) => {
    if (!isConnected && dialedNumber.length < 10) {
      setDialedNumber(prev => prev + digit);
    }
  };

  const handleCall = () => {
    if (dialedNumber === '101') {
      setIsConnected(true);
      setCallDuration(0);
      speak('Hey! This is Aadhira at the hotel. How can I help you today? I\'m here for room service, housekeeping, maintenance - whatever you need!', () => {
        // Start listening after the greeting finishes
        setTimeout(() => {
          if (isConnected) {
            startListening();
          }
        }, 500);
      });
    } else {
      speak('Oops! That\'s not the right number. Just dial 101 to reach me!');
      setDialedNumber('');
    }
  };

  const handleEndCall = () => {
    setIsConnected(false);
    setDialedNumber('');
    setCallDuration(0);
    stopListening();
    speak('Thanks for calling! Have a great stay with us. Call back anytime if you need anything else!');
  };

  const handleVoiceInput = async (input: string) => {
    if (!input.trim()) return;

    try {
      let response: string;
      
      // Always try API first, regardless of online status
      try {
        response = await openRouterService.getChatResponse(input);
        console.log('API response received successfully');
      } catch (apiError) {
        console.log('API failed, falling back to offline mode:', apiError);
        // Only use offline mode if API fails
        response = getOfflineResponse(input);
      }

      speak(response, () => {
        // Automatically start listening again after the response finishes
        setTimeout(() => {
          if (isConnected) {
            startListening();
          }
        }, 500); // Wait 0.5 seconds after response finishes for natural conversation
      });
      
    } catch (error) {
      console.error('Error processing voice input:', error);
      const errorMessage = 'Sorry about that! I\'m having a bit of trouble right now. Can you try again in a moment?';
      speak(errorMessage, () => {
        // Also restart listening after error
        setTimeout(() => {
          if (isConnected) {
            startListening();
          }
        }, 500);
      });
    }
  };

  const getOfflineResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    for (const [key, response] of Object.entries(offlineResponses)) {
      if (input.includes(key)) {
        return response;
      }
    }
    
    return offlineResponses.default;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-sm text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBackToChat}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">Phone</h2>
          <div className="w-8"></div>
        </div>

        {isConnected ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aadhira AI Assistant</h3>
            <p className="text-green-400">Connected - {formatTime(callDuration)}</p>
            {isListening && (
              <div className="mt-2 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <span className="text-sm text-red-400 ml-2">Listening...</span>
              </div>
            )}
            {!isListening && isConnected && (
              <div className="mt-2 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 ml-2">Ready to listen</span>
              </div>
            )}

          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl font-mono bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
              {dialedNumber || 'Enter Number'}
            </div>
            <p className="text-gray-300 text-sm">Dial 101 for AI Assistant</p>
          </div>
        )}
      </div>

      {/* Dial Pad */}
      {!isConnected && (
        <div className="p-6 bg-black/20 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {dialPad.flat().map((digit) => (
              <button
                key={digit}
                onClick={() => handleDigitPress(digit)}
                className="aspect-square bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-2xl font-semibold text-white transition-colors duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/20"
              >
                {digit}
              </button>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleCall}
              disabled={!dialedNumber}
              className="w-16 h-16 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-all duration-200 transform hover:scale-105"
            >
              <PhoneCall size={24} />
            </button>
            
            <button
              onClick={() => setDialedNumber('')}
              className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 transform hover:scale-105 backdrop-blur-sm"
            >
              <span className="text-xl">⌫</span>
            </button>
          </div>
        </div>
      )}

      {/* Call Controls */}
      {isConnected && (
        <div className="p-6 bg-black/20 backdrop-blur-sm">
          <div className="flex justify-center">
            <button
              onClick={handleEndCall}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all duration-200 transform hover:scale-105"
            >
              <PhoneOff size={24} />
            </button>
          </div>
          
          <div className="mt-6 text-center text-gray-300">
            <p className="text-sm">Speak naturally to interact with Aadhira</p>
            <p className="text-xs mt-1">I'll automatically listen and respond like a human conversation</p>
            <p className="text-xs mt-1">Just speak when you see the red listening indicator</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInterface;