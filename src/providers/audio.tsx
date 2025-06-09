import type { TSoundNames } from "@/context";
import { AudioContext } from "@/context";
import { useVariables } from "@/hooks";
import React from "react";

const SOUND_FILES = {
  click: { src: "click.opus", vol: 0.5 },
  yay: { src: "yay.opus", vol: 0.04 },
};

const AudioProvider: React.FC<IProvidersProps> = ({ children }) => {
  const [{ muteMusic, muteSound, agreed }] = useVariables();
  const musicRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    const music = musicRef.current;

    if (!music || !agreed) return;

    music.volume = muteMusic ? 0 : 0.1;

    music.play().catch(() => {});
  }, [muteMusic, muteSound, agreed]);

  const playClickSound = (name: TSoundNames, pitch: number) => {
    if (muteSound) return;

    const newAudio = new Audio(SOUND_FILES[name].src);

    newAudio.volume = muteSound ? 0 : SOUND_FILES[name].vol;
    newAudio.playbackRate = pitch;

    newAudio.currentTime = 0;

    newAudio.play().catch(() => {});
  };

  // Render provider with current device size
  return (
    <AudioContext.Provider value={playClickSound}>
      <audio className="d-none" src="bgm.opus" ref={musicRef} preload="auto" loop></audio>
      <audio className="d-none" src="click.opus" preload="auto"></audio>
      <audio className="d-none" src="yay.opus" preload="auto"></audio>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
