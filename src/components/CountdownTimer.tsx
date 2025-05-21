
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  duration, 
  onTimeUp, 
  isActive,
  className 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(!isActive);

  useEffect(() => {
    setIsPaused(!isActive);
    if (isActive) {
      setTimeLeft(duration);
    }
  }, [isActive, duration]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!isPaused && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isPaused) {
      onTimeUp();
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft, isPaused, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-1 text-center text-sm font-medium text-gray-700">
        {timeLeft} segundos
      </div>
    </div>
  );
};

export default CountdownTimer;
