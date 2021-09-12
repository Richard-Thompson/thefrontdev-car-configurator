import React, { useRef, useState, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const PositionalAudio = ({ url, soundPlaying }) => {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);

  useEffect(() => {
    if (sound.current && buffer) {
      sound.current.setBuffer(buffer);
      sound.current.setRefDistance(8.0);
      sound.current.onEnded = function () {
        if (sound.current) {
          sound.current.stop(); /* sets Three wrapper property correctly */
        }
      };
      if (soundPlaying) {
        sound.current.play();
      }
      if (!soundPlaying) {
        sound.current.pause();
      }
    }
    camera.add(listener);
    return () => camera.remove(listener);
  }, [soundPlaying]);

  return <positionalAudio ref={sound} args={[listener]} />;
};
