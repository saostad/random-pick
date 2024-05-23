import React, { useEffect, useRef, useState } from "react";

interface TimerProps {
  currentSpeakerIndex: number | string;
  challengeMode: boolean;
  resetTrigger: boolean;
}

const Timer: React.FC<TimerProps> = ({
  currentSpeakerIndex,
  challengeMode,
  resetTrigger,
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setElapsedTime(0);

    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentSpeakerIndex, challengeMode, resetTrigger]);

  return (
    <div>
      <b>Elapsed Time:</b> {elapsedTime}s
    </div>
  );
};

export default Timer;
