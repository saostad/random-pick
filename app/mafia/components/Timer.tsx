import React, { useEffect, useRef, useState } from "react";

interface TimerProps {
  isRunning: boolean;
  onElapsedTimeChange?: (elapsedTime: number) => void;
}

const Timer: React.FC<TimerProps> = ({ isRunning, onElapsedTimeChange }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      startTimer();
    } else {
      pauseTimer();
    }

    return () => {
      resetTimer();
    };
  }, [isRunning]);

  useEffect(() => {
    if (onElapsedTimeChange) {
      onElapsedTimeChange(elapsedTime);
    }
  }, [elapsedTime, onElapsedTimeChange]);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setElapsedTime(0);
  };

  return (
    <div>
      <b>Elapsed Time:</b> {elapsedTime}s
    </div>
  );
};

export default Timer;
