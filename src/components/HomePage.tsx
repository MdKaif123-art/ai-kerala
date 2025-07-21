import React from 'react';
import { Bot, Phone, MessageCircle, Sparkles, Hotel, Mic, Volume2, Wifi } from 'lucide-react';

interface HomePageProps {
  onNavigateToChat: () => void;
  onNavigateToPhone: () => void;
  onNavigateToAbout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToChat, onNavigateToPhone, onNavigateToAbout }) => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 right-32 w-32 h-32 border border-white/10 rounded-2xl backdrop-blur-sm bg-white/5 animate-float"></div>
        <div className="absolute bottom-40 right-40 w-24 h-24 border border-purple-400/20 rounded-xl backdrop-blur-sm bg-purple-500/10 animate-float-delayed"></div>
        <div className="absolute top-1/3 left-20 w-20 h-20 border border-blue-400/20 rounded-lg backdrop-blur-sm bg-blue-500/10 animate-float-slow"></div>
        
        {/* Grid Pattern */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
          <div className="grid grid-cols-8 gap-4 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white/20 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Hotel className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Aadhira</h1>
              <p className="text-sm text-gray-400">AI Hotel Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#" className="text-white hover:text-purple-400 transition-colors">Home</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a>
            <button 
              onClick={onNavigateToAbout}
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                AI-Powered
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Hotel Assistant
                </span>
                <span className="block text-4xl lg:text-5xl text-gray-300">
                  for modern hospitality
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                Experience the future of hotel management with voice-enabled AI assistance, 
                seamless guest interactions, and intelligent automation.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onNavigateToChat}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">Start Chat Assistant</span>
                <div className="w-2 h-2 bg-white rounded-full group-hover:animate-ping"></div>
              </button>
              
              <button
                onClick={onNavigateToPhone}
                className="group px-8 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 backdrop-blur-sm border border-white/20"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold">Voice Interface</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                <Mic className="w-8 h-8 text-purple-400 mb-2" />
                <h3 className="text-white font-semibold">Voice Recognition</h3>
                <p className="text-gray-400 text-sm">Natural speech processing</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                <Volume2 className="w-8 h-8 text-blue-400 mb-2" />
                <h3 className="text-white font-semibold">Text-to-Speech</h3>
                <p className="text-gray-400 text-sm">Human-like responses</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                <Bot className="w-8 h-8 text-green-400 mb-2" />
                <h3 className="text-white font-semibold">AI Intelligence</h3>
                <p className="text-gray-400 text-sm">Smart hotel management</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                <Wifi className="w-8 h-8 text-yellow-400 mb-2" />
                <h3 className="text-white font-semibold">Offline Mode</h3>
                <p className="text-gray-400 text-sm">Works without internet</p>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className="relative">
            {/* Main Demo Card */}
            <div className="relative p-8 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl"></div>
              
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">AI Assistant Active</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                </div>

                {/* Chat Preview */}
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                      <p className="text-sm">I need help with room booking</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-white/20 text-white px-4 py-2 rounded-2xl rounded-bl-md max-w-xs backdrop-blur-sm">
                      <p className="text-sm">I'd be happy to help you with your reservation. What dates are you looking to stay?</p>
                    </div>
                  </div>
                </div>

                {/* Voice Indicator */}
                <div className="flex items-center justify-center space-x-2 py-4">
                  <div className="w-2 h-8 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-12 bg-pink-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-6 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                  <div className="w-2 h-10 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                  <div className="w-2 h-4 bg-pink-400 rounded-full animate-pulse delay-400"></div>
                </div>

                <div className="text-center">
                  <p className="text-white/80 text-sm">Voice recognition active</p>
                  <p className="text-white/60 text-xs">Speak naturally for assistance</p>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float">
              <Sparkles className="w-8 h-8 text-purple-300" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float-delayed">
              <Bot className="w-6 h-6 text-blue-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-400">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-gray-400">Hotels</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;