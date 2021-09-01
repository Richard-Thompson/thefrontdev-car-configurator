import React, { useEffect, useState } from 'react';
import { useThree, extend } from '@react-three/fiber';
import { useControls } from 'context/controlsContext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useAnimationControls } from 'context/animationControls';

extend({ OrbitControls });

export const Controls = () => {
  const { camera, gl } = useThree();
  const [controls, setControls] = useState(null);

  const { setControlsRef } = useControls((state) => ({
    setControlsRef: state.setControlsRef,
  }));

  const { startOfAnimation, endOfAnimation } = useAnimationControls((state) => ({
    startOfAnimation: state.startOfAnimation,
    endOfAnimation: state.endOfAnimation,
  }));

  useEffect(() => {
    setControlsRef(controls);
  }, [controls]);

  useEffect(() => {
    if (startOfAnimation) {
      controls.enabled = false;
    }
    if (endOfAnimation) {
      controls.enabled = true;
    }
  }, [startOfAnimation, endOfAnimation]);

  return <orbitControls layers={1} ref={setControls} args={[camera, gl.domElement]} />;
};
