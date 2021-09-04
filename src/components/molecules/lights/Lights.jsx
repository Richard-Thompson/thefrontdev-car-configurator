import React from 'react';
import { AmbientLight } from 'components/atoms/ambient-light/AmbientLight';
import { DirectionalLight } from 'components/atoms/directional-light/DirectionalLight';

export const Lights = () => (
  <>
    <AmbientLight layers={2} intensity={20} color="white" />
    <DirectionalLight
      layers={1}
      castShadow
      position={[2.5, 8, 5]}
      intensity={5.5}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
      color="white"
    />
  </>
);
