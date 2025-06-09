import type { TSoundNames } from "@/context";
import { AudioContext } from "@/context";
import { useVariables } from "@/hooks";
import React from "react";

interface SoundConfig {
  poolSize?: number; // Number of audio instances to pre-create for overlapping sounds
  src: string;
  vol: number;
}

const SOUND_FILES: Record<TSoundNames, SoundConfig> = {
  gameover: { src: "gameover.opus", vol: 0.2, poolSize: 1 },
  click: { src: "click.opus", vol: 0.5, poolSize: 5 },
  yay: { src: "yay.opus", vol: 0.04, poolSize: 3 },
};

interface AudioPool {
  instances: HTMLAudioElement[];
  currentIndex: number;
  config: SoundConfig;
}

const AudioProvider: React.FC<IProvidersProps> = ({ children }) => {
  const [{ muteMusic, muteSound, agreed }] = useVariables();
  const musicRef = React.useRef<HTMLAudioElement>(null);
  const audioPoolsRef = React.useRef<Record<TSoundNames, AudioPool>>({} as Record<TSoundNames, AudioPool>);
  const isInitializedRef = React.useRef(false);

  // Initialize audio pools
  const initializeAudioPools = React.useCallback(() => {
    if (isInitializedRef.current) return;

    Object.entries(SOUND_FILES).forEach(([soundName, config]) => {
      const poolSize = config.poolSize || 3;
      const instances: HTMLAudioElement[] = [];

      for (let i = 0; i < poolSize; i++) {
        const audio = new Audio(config.src);
        audio.preload = "auto";
        audio.volume = config.vol;

        // Pre-load the audio
        audio.load();

        // Add error handling
        audio.addEventListener("error", (e) => {
          console.warn(`Failed to load audio: ${config.src}`, e);
        });

        instances.push(audio);
      }

      audioPoolsRef.current[soundName as TSoundNames] = {
        instances,
        currentIndex: 0,
        config,
      };
    });

    isInitializedRef.current = true;
  }, []);

  // Initialize pools when component mounts and user has agreed
  React.useEffect(() => {
    if (agreed && !isInitializedRef.current) {
      initializeAudioPools();
    }
  }, [agreed, initializeAudioPools]);

  // Handle background music
  React.useEffect(() => {
    const music = musicRef.current;
    if (!music || !agreed) return;

    music.volume = muteMusic ? 0 : 0.1;

    if (!muteMusic) {
      music.play().catch((error) => {
        console.warn("Failed to play background music:", error);
      });
    } else {
      music.pause();
    }
  }, [muteMusic, agreed]);

  // Optimized sound playing function
  const playSound = React.useCallback(
    (name: TSoundNames, pitch: number = 1) => {
      if (muteSound || !agreed || !isInitializedRef.current) return;

      const pool = audioPoolsRef.current[name];
      if (!pool) {
        console.warn(`Audio pool not found for sound: ${name}`);
        return;
      }

      // Get the next available audio instance from the pool
      const audio = pool.instances[pool.currentIndex];

      // Update the pool index for next use (circular)
      pool.currentIndex = (pool.currentIndex + 1) % pool.instances.length;

      // Configure and play the audio
      try {
        audio.currentTime = 0; // Reset to beginning
        audio.volume = pool.config.vol;
        audio.playbackRate = pitch;

        // Play the audio
        const playPromise = audio.play();

        // Handle play promise (modern browsers return a promise)
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn(`Failed to play sound: ${name}`, error);
          });
        }
      } catch (error) {
        console.warn(`Error playing sound: ${name}`, error);
      }
    },
    [muteSound, agreed]
  );

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => playSound, [playSound]);

  // Cleanup function
  React.useEffect(() => {
    return () => {
      // Clean up audio pools on unmount
      Object.values(audioPoolsRef.current).forEach((pool) => {
        pool.instances.forEach((audio) => {
          audio.pause();
          audio.currentTime = 0;
          // Remove event listeners to prevent memory leaks
          audio.removeEventListener("error", () => {});
        });
      });
    };
  }, []);

  return (
    <AudioContext.Provider value={contextValue}>
      <audio
        className="d-none"
        src="bgm.opus"
        ref={musicRef}
        preload="auto"
        loop
        onError={(e) => console.warn("Failed to load background music:", e)}
      />
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
