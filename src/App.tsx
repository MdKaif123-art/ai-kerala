import React, { useState } from 'react';
import { Home, Phone } from 'lucide-react';
import HomePage from './components/HomePage';
import ChatInterface from './components/ChatInterface';
import PhoneInterface from './components/PhoneInterface';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'chat' | 'phone' | 'about'>('home');

  if (currentView === 'home') {
    return (
      <HomePage 
        onNavigateToChat={() => setCurrentView('chat')}
        onNavigateToPhone={() => setCurrentView('phone')}
        onNavigateToAbout={() => setCurrentView('about')}
      />
    );
  }

  if (currentView === 'about') {
    return <AboutPage onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Aadhira</h1>
                <p className="text-sm text-gray-400">Hotel Management Assistant</p>
              </div>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('home')}
                className={`p-3 rounded-full transition-all duration-200 ${
                  currentView === 'home' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Home size={20} />
              </button>
              
              <button
                onClick={() => setCurrentView('chat')}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  currentView === 'chat' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                }`}
              >
                Chat
              </button>
              
              <button
                onClick={() => setCurrentView('phone')}
                className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Phone size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        {currentView === 'chat' && <ChatInterface />}
        {currentView === 'phone' && (
          <PhoneInterface onBackToChat={() => setCurrentView('chat')} />
        )}
      </main>
    </div>
  );
};

export default App;