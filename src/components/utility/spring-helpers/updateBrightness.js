import * as THREE from 'three';

export const updateBrightness = (brightness, background, percentage) => {
  // console.log(percentage)

  brightness.current = (0.9 - 0.1) * percentage;

  if (background?.current) {
    const color = new THREE.Color('white');
    const startColor = new THREE.Color('#161616');
    background.current.copy(startColor).lerp(color, percentage);
  }
  // console.log({ bg: background })
};
