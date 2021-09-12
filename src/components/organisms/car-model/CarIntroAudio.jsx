import React from 'react';
import { useAnimationControls } from 'context/animationControls';
import { PositionalAudio } from './PositionalAudio';

export const CarIntroAudio = () => {
  const { isPlayingIntroSong } = useAnimationControls((state) => ({
    isPlayingIntroSong: state.isPlayingIntroSong,
  }));

  return (
    <PositionalAudio
      url="/car/audio/runaway-oakvale-of-albion-main-version-03-13-3073-timestrech.mp3"
      soundPlaying={isPlayingIntroSong}
    />
  );
};
