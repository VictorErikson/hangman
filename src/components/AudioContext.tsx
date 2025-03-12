import React, { createContext, useRef, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

// Define the type for the audio context
type AudioContextType = React.RefObject<HTMLAudioElement> | null;

// Create the context with the defined type
export const AudioContext = createContext<AudioContextType>(null);

// Define the props for the AudioProvider component
interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null); // Type the ref as HTMLAudioElement
  const location = useLocation();

  useEffect(() => {
    // Set initial volume and start playing the audio
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
      audioRef.current
        .play()
        .catch((error) => console.error("Autoplay error:", error)); // Catch any autoplay errors
    }
  }, []);

  useEffect(() => {
    // Define the pages where you want to mute the audio
    const noMusicPages = ["/Ingame"];

    if (audioRef.current) {
      if (noMusicPages.includes(location.pathname)) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((error) => console.error("Play error:", error)); // Catch any play errors
      }
    }
  }, [location]);

  return (
    <AudioContext.Provider value={audioRef}>
      <audio
        ref={audioRef}
        src="assets/Music/Low_ES_SundayBluesHaraNoda.wav"
        loop
        autoPlay
      />
      {children}
    </AudioContext.Provider>
  );
};
