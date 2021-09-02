import React, { Suspense, useEffect, useRef } from 'react';
import Effects from 'components/effects/Postprocessing';
import CarModel from 'components/molecules/car-model/Car';
import { Controls } from 'components/atoms/controls/controls';
import { useAnimationControls } from 'context/animationControls';
import { useSpring } from '@react-spring/three';
import { updateBrightness } from 'components/utility/spring-helpers/updateBrightness';

export const Scene = () => {
  const { endOfAnimation, setBrightnessValue } = useAnimationControls((state) => ({
    endOfAnimation: state.endOfAnimation,
    setBrightnessValue: state.setBrightnessValue,
  }));
  const background = useRef(null);
  const postProBrightValue = useRef(null);

  useEffect(() => {
    postProBrightValue.current = 0.1;
    setBrightnessValue(postProBrightValue);
    // console.log({ background })
    // if (endOfAnimation) {
    //     setTransitionEndColor(true);
    // }
  }, []);

  useSpring({
    config: { duration: 4000, clamp: true },
    percentage: endOfAnimation ? 1 : 0,
    onChange: ({ value: { percentage } }) => {
      updateBrightness(postProBrightValue, background, percentage);
    },
  });
  return (
    <>
      <Controls />
      {/* <color attach="background" args={["black"]} roughness={1.0} /> */}
      <gridHelper args={[10, 10]} />
      <Suspense fallback={null}>
        <color ref={background} attach="background" args={['#161616']} />

        <ambientLight layers={2} intensity={20} color="white" />
        <directionalLight
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

        <CarModel />
        <Effects />
      </Suspense>
    </>
  );
};
