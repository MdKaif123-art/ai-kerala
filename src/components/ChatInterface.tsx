import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Volume2, Wifi, WifiOff, Hotel } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { openRouterService } from '../services/openRouterService';
import { offlineResponses } from '../data/offlineResponses';
import { languageService } from '../services/languageService';
import HotelServices from './HotelServices';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey there! 👋 I\'m Aadhira, your friendly hotel buddy! I\'m so excited to chat with you and help you out with anything you need! I can help you with room service, housekeeping, maintenance, and more. What would you like to do today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [showHotelServices, setShowHotelServices] = useState(false);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();
  const { speak, isSpeaking } = useTextToSpeech();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
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

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Detect language from user input
    const detectedLang = languageService.detectLanguageFromGreeting(inputText);
    if (detectedLang !== currentLanguage) {
      setCurrentLanguage(detectedLang);
      openRouterService.setLanguage(detectedLang);
    }

    const userMessage = addMessage(inputText, true);
    setInputText('');
    setIsLoading(true);

    try {
      let response: string;
      
      // Always try API first, regardless of online status
      try {
        response = await openRouterService.getChatResponse(inputText);
        console.log('API response received successfully');
      } catch (apiError) {
        console.log('API failed, falling back to offline mode:', apiError);
        // Only use offline mode if API fails
        response = getOfflineResponse(inputText);
      }

      const botMessage = addMessage(response, false);
      speak(response);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.';
      addMessage(errorMessage, false);
      speak(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleHotelServiceRequest = (serviceType: string, description: string) => {
    const request = {
      id: `${serviceType}_${Date.now()}`,
      type: serviceType,
      description: description,
      priority: serviceType === 'maintenance' ? 'high' : 'medium',
      status: 'pending' as const,
      timestamp: new Date()
    };
    
    setServiceRequests(prev => [...prev, request]);
    
    // Add a message about the service request
    const message = `I've submitted your ${serviceType} request: ${description}. You can track the status in the Hotel Services tab.`;
    addMessage(message, false);
    speak(message);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {showHotelServices ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Hotel Services</h2>
            <button
              onClick={() => setShowHotelServices(false)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Back to Chat
            </button>
          </div>
          <HotelServices 
            onRequestService={handleHotelServiceRequest}
            serviceRequests={serviceRequests}
          />
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Status Bar */}
          <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm text-white px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">AI Assistant Active</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHotelServices(true)}
                className="flex items-center space-x-2 px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Hotel size={16} />
                <span className="text-sm">Hotel Services</span>
              </button>
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <>
                    <Wifi size={16} />
                    <span className="text-sm">AI Mode</span>
                  </>
                ) : (
                  <>
                    <WifiOff size={16} />
                    <span className="text-sm">Limited Mode</span>
                  </>
                )}
              </div>
            </div>
          </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-6 space-y-4 bg-black/20 backdrop-blur-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.isUser
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md'
                  : 'bg-white/20 text-white shadow-md rounded-bl-md border border-white/20 backdrop-blur-sm'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="flex items-center justify-between mt-2">
                <p className={`text-xs ${message.isUser ? 'text-purple-100' : 'text-gray-300'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {!message.isUser && (
                  <button
                    onClick={() => speak(message.text)}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                    disabled={isSpeaking}
                  >
                    <Volume2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/20 text-white shadow-md rounded-2xl rounded-bl-md border border-white/20 backdrop-blur-sm px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/20 p-6 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or use voice input..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-white placeholder-gray-400 backdrop-blur-sm"
              rows={1}
            />
            {isListening && (
              <div className="absolute inset-0 border-2 border-red-500 rounded-xl animate-pulse bg-red-50 bg-opacity-20"></div>
            )}
          </div>
          
          <button
            onClick={toggleListening}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isListening
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        
        {isListening && (
          <p className="text-sm text-red-400 mt-2 flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
            Listening... Speak now
          </p>
        )}
      </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;