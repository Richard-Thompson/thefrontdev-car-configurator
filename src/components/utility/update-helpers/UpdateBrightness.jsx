import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSpring } from '@react-spring/three';
import { useAnimationControls } from 'context/animationControls';

export const updateBrightnessHandler = (brightness, background, percentage) => {
  brightness.current = (1.0 - 0.1) * percentage;

  if (background?.current) {
    const color = new THREE.Color('white');
    const startColor = new THREE.Color('#161616');
    background.current.copy(startColor).lerp(color, percentage);
  }
};

export const UpdateBrightness = ({ background }) => {
  const postProBrightValue = useRef(null);
  const { endOfAnimation, setBrightnessValue } = useAnimationControls((state) => ({
    endOfAnimation: state.endOfAnimation,
    setBrightnessValue: state.setBrightnessValue,
  }));

  useEffect(() => {
    postProBrightValue.current = 0.1;
    setBrightnessValue(postProBrightValue);
  }, []);
  useSpring({
    config: { duration: 4000, clamp: true },
    percentage: endOfAnimation ? 1 : 0,
    onChange: ({ value: { percentage } }) => {
      updateBrightnessHandler(postProBrightValue, background, percentage);
    },
  });

  return null;
};
