// MediaPlayer.tsx
import React, { useEffect, useRef, useState } from "react";
import CarbonPlayOutline from "~icons/carbon/play-outline";
import CarbonPauseOutline from "~icons/carbon/pause-outline";

interface MediaPlayerProps {
  mediaUrl: string;
  loop?: boolean;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  mediaUrl,
  loop = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(mediaUrl);
      audioRef.current.onended = handleSoundEnded;
      audioRef.current.loop = loop;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [mediaUrl, loop]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSoundEnded = () => {
    if (!loop) {
      setIsPlaying(false);
    }
  };

  return (
    <label className="swap">
      <input type="checkbox" checked={isPlaying} onChange={togglePlayPause} />
      <div className="swap-on">
        <CarbonPauseOutline className="min-h-8 min-w-10" />
      </div>
      <div className="swap-off">
        <CarbonPlayOutline className="min-h-8 min-w-10" />
      </div>
    </label>
  );
};

export default MediaPlayer;
