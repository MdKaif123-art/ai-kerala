import React from 'react';
import { Users, Award, Star, Globe, ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const teamMembers = [
    {
      name: "Mohammed Kaif K",
      role: "Lead AI Developer",
      expertise: "Machine Learning & NLP",
      avatar: "MK"
    },
    {
      name: "Lakshaya Kishore",
      role: "Full Stack Developer", 
      expertise: "React & Node.js",
      avatar: "LK"
    },
    {
      name: "Ganesh",
      role: "Backend Developer",
      expertise: "API Development",
      avatar: "G"
    },
    {
      name: "Geetha Priya",
      role: "UI/UX Designer",
      expertise: "Design & User Experience",
      avatar: "GP"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            About
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Aadhira
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Revolutionizing hotel management with AI-powered voice assistance, 
            supporting multiple languages and providing seamless guest experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To transform the hospitality industry by providing intelligent, multilingual AI assistance 
              that understands and responds to guests in their preferred language, creating personalized 
              and memorable experiences.
            </p>
          </div>

          <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Global Reach</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Supporting multiple languages including English, Hindi, Tamil, Malayalam, and more. 
              Our AI adapts to cultural nuances and provides contextually appropriate responses 
              for guests from around the world.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-400 text-lg">The brilliant minds behind Aadhira</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="p-6 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      {member.avatar}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-purple-400 font-medium mb-2">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.expertise}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Support */}
        <div className="p-8 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Multilingual Support</h2>
            <p className="text-gray-400">Aadhira responds in your preferred language based on your greeting</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl mb-2">🇬🇧</div>
              <h3 className="text-white font-semibold mb-1">English</h3>
              <p className="text-gray-400 text-sm">"Hey" / "Hello"</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl mb-2">🇮🇳</div>
              <h3 className="text-white font-semibold mb-1">Hindi</h3>
              <p className="text-gray-400 text-sm">"Namaste"</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl mb-2">🇮🇳</div>
              <h3 className="text-white font-semibold mb-1">Tamil</h3>
              <p className="text-gray-400 text-sm">"Vanakkam"</p>
            </div>

            <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 text-center">
              <div className="text-2xl mb-2">🇮🇳</div>
              <h3 className="text-white font-semibold mb-1">Malayalam</h3>
              <p className="text-gray-400 text-sm">"Namaskaram"</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4+</div>
            <div className="text-gray-400">Languages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">∞</div>
            <div className="text-gray-400">Possibilities</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;