import React, { Suspense } from 'react';
import { useControls } from 'context/controlsContext';
import { PositionalAudio } from './PositionalAudio';

export const CarAudio = () => {
  const { soundOn } = useControls((state) => ({
    soundOn: state.soundOn,
  }));

  return (
    <Suspense fallback={null}>
      <PositionalAudio
        key={1}
        url="/car/audio/010567704-sfx-car-idling-1-ear.mp3"
        soundPlaying={soundOn}
      />
    </Suspense>
  );
};
