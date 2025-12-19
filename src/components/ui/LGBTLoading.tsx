import React from 'react';
import { cn } from '@/lib/utils';

interface LGBTLoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'rainbow' | 'hearts' | 'stars' | 'pride';
  className?: string;
}

const LGBTLoading: React.FC<LGBTLoadingProps> = ({
  message = "Loading...",
  size = 'md',
  variant = 'rainbow',
  className
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'hearts':
        return (
          <div className={cn("relative", sizeClasses[size])}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>💖</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>💜</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg animate-bounce" style={{ animationDelay: '0.4s' }}>💙</span>
            </div>
          </div>
        );

      case 'stars':
        return (
          <div className={cn("relative", sizeClasses[size])}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl animate-spin" style={{ animationDuration: '2s' }}>⭐</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}>✨</span>
            </div>
          </div>
        );

      case 'pride':
        return (
          <div className={cn("relative", sizeClasses[size])}>
            <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-white"></div>
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
              <span className="text-sm animate-pulse">🏳️‍🌈</span>
            </div>
          </div>
        );

      default: // rainbow
        return (
          <div className={cn("relative", sizeClasses[size])}>
            <div className="absolute inset-0 rounded-full border-3 border-transparent bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 via-purple-400 to-pink-400 animate-spin"></div>
            <div className="absolute inset-1 rounded-full bg-white"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-3", className)}>
      {renderSpinner()}
      <p className={cn(
        "text-muted-foreground font-medium",
        textSizeClasses[size]
      )}>
        {message}
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-spin { animation: spin linear infinite; }
        .animate-bounce { animation: bounce 1s ease-in-out infinite; }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LGBTLoading;