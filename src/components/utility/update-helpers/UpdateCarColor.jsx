import { useState } from 'react';
import * as THREE from 'three';
import { useSpring } from '@react-spring/three';
import { useControls } from 'context/controlsContext';

export const UpdateCarColor = ({ materials = {} }) => {
  const [initialColor] = useState(() => {
    const keys = Object.keys(materials);
    const { r, g, b } = materials[keys[0]].color;
    return `rgb(${r}, ${g}, ${b})`;
  });

  const { activeColor } = useControls((state) => ({
    activeColor: state.activeColor,
  }));
  useSpring({
    config: { duration: 500, clamp: true },
    color: activeColor || initialColor,
    onChange: ({ value: { color } }) => {
      materials.material_9.color = new THREE.Color(color);
    },
  });

  return null;
};
