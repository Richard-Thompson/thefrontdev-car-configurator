import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnimationControls } from '../../../context/animationControls';

export const PlayAudio = () => {
  const { isPlayingIntroSong } = useAnimationControls((state) => ({
    isPlayingIntroSong: state.isPlayingIntroSong,
  }));
  const { camera } = useThree();

  const [soundObj] = useMemo(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(
      '/car/audio/runaway-oakvale-of-albion-main-version-03-13-3073-timestrech.wav',
      (buffer) => {
        sound.setBuffer(buffer);
        // sound.
        sound.setLoop(false);
        sound.setVolume(1.0);
      },
    );
    return [sound];
  }, []);

  useEffect(() => {
    if (isPlayingIntroSong && soundObj) {
      soundObj.play();
    }
  }, [isPlayingIntroSong, soundObj]);

  return null;
};
