import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  duration?: number;
  message?: string;
  variant?: 'rainbow' | 'modern' | 'minimal' | 'particles' | 'geometric' | 'liquid';
  showProgress?: boolean;
  fullScreen?: boolean;
  backgroundColor?: string;
  onComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({
  duration = 3000,
  message = "Celebrating diversity and love for all. 🌈",
  variant = 'rainbow',
  showProgress = true,
  fullScreen = true,
  backgroundColor = 'bg-white',
  onComplete
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 600);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  // Spinner Components
  const renderSpinner = () => {
    switch (variant) {
      case 'modern':
        return (
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent 
              border-t-purple-500 border-r-pink-500 border-b-blue-500 border-l-green-500 
              animate-spin animate-pulse" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-50 to-pink-50 
              flex items-center justify-center shadow-inner">
              <div className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>🌈</div>
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div className="relative w-20 h-20">
            <svg className="w-full h-full animate-spin" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="100"
                strokeDashoffset={100 - progress}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF0000" />
                  <stop offset="25%" stopColor="#FF9900" />
                  <stop offset="50%" stopColor="#00FF00" />
                  <stop offset="75%" stopColor="#0099FF" />
                  <stop offset="100%" stopColor="#6633FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );

      case 'particles': {
        const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3', '#FF69B4'];
        return (
          <div className="relative w-28 h-28">
            {colors.map((color, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full animate-bounce"
                style={{
                  backgroundColor: color,
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translate(40px) rotate(-${i * 45}deg)`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1.2s'
                }}
              />
            ))}
          </div>
        );
      }

      case 'geometric':
        return (
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r 
              from-red-400 via-purple-400 to-pink-400 animate-spin rounded-lg"
              style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-2 border-4 border-transparent bg-gradient-to-r 
              from-blue-400 via-green-400 to-yellow-400 animate-spin rounded-lg"
              style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
          </div>
        );

      case 'liquid':
        return (
          <div className="relative w-24 h-24 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 
              animate-liquid" style={{ animationDuration: '4s' }}>
              <style>{`
                @keyframes liquid {
                  0%, 100% { transform: translateY(0) rotate(0deg); }
                  33% { transform: translateY(-20%) rotate(120deg); }
                  66% { transform: translateY(20%) rotate(240deg); }
                }
                .animate-liquid { animation: liquid 4s ease-in-out infinite; }
              `}</style>
            </div>
            <div className="absolute inset-2 bg-white rounded-full"></div>
          </div>
        );

      default: // rainbow
        return (
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-6 border-transparent 
              bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 
              animate-spin shadow-lg"
              style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-3 rounded-full bg-white shadow-inner"></div>
            <div className="absolute inset-5 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 
              flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 
                animate-pulse"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`${fullScreen ? 'fixed inset-0 z-50' : 'relative w-full h-96'} 
      flex items-center justify-center ${backgroundColor} transition-all duration-500 
      ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      <div className="flex flex-col items-center space-y-8">
        {/* Animated Spinner */}
        <div className={`transform transition-all duration-500 ${isAnimating ? 'scale-100' : 'scale-0'}`}>
          {renderSpinner()}
        </div>

        {/* Loading Text with Gradient Animation */}
        <div className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 
            bg-clip-text text-transparent animate-gradient bg-300%">
            Loading
            <span className="inline-block animate-pulse">.</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
          </span>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-64 space-y-2">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 
                  transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-600">Loading</span>
              <span className="text-purple-600 font-bold">{Math.round(progress)}%</span>
            </div>
          </div>
        )}

        {/* Message with Fade Animation */}
        <div className={`max-w-md text-center transition-all duration-700 delay-300 
          ${progress > 50 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-700 px-6 py-3 bg-gradient-to-r from-red-50 via-purple-50 to-pink-50 
            rounded-xl border border-gray-100 shadow-sm">
            {message}
          </p>
        </div>

        {/* Floating Elements for visual interest */}
        <div className="flex space-x-2">
          {['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '🌈'].map((emoji, i) => (
            <span
              key={i}
              className="opacity-0 animate-float"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '3s'
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Global Styles */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        .animate-spin { animation: spin linear infinite; }
        .animate-bounce { animation: bounce 2s ease-in-out infinite; }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
        .animate-gradient { animation: gradient 3s ease infinite; }
        .animate-float { animation: float ease-in-out infinite; }
        .bg-300% { background-size: 300% 300%; }
      `}</style>
    </div>
  );
};

export default Preloader;