import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnimationControls } from '../../../context/animationControls';

export const PlayAudio = () => {
  const { isPlayingIntroSong } = useAnimationControls((state) => ({
    isPlayingIntroSong: state.isPlayingIntroSong,
  }));
  const { camera } = useThree();

  const [soundObj, listenerObj] = useMemo(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(
      '/car/audio/runaway-oakvale-of-albion-main-version-03-13-3073-timestrech.mp3',
      (buffer) => {
        console.log('Loaded Audio');
        sound.setBuffer(buffer);
        // sound.
        sound.setLoop(false);
        sound.setVolume(4.0);
      },
    );
    return [sound, listener];
  }, []);

  useEffect(() => {
    if (isPlayingIntroSong && soundObj && listenerObj) {
      soundObj.play();
      const source = listenerObj.context.createBufferSource();
      source.connect(listenerObj.context.destination);
      source.start();
    }
  }, [isPlayingIntroSong, soundObj, listenerObj]);

  return null;
};
