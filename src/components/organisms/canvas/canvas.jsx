import React, { useEffect, useState, Suspense } from 'react';
import { useProgress } from '@react-three/drei';
import * as THREE from 'three';
import {
  Canvas,
  CinematicHalfScreen,
  LoadingScreen,
  LoadingBar,
  Button,
} from 'components/organisms/canvas/canvas.styles';
import { Overlay } from 'components/organisms/overlay/Overlay';
import { useAnimationControls } from 'context/animationControls';
import {
  AMOUNT_OF_TIME_LOADING_SCREEN,
  START_ANIMATION,
  END_CAMERA_POSITION,
} from 'components/utility/constants';
import { Scene } from 'components/organisms/scene/Scene';

export const CanvasRoot = () => {
  const {
    startOfAnimation,
    endOfAnimation,
    setStartOfAnimation,
    setIsPlayingIntroSong,
    endOfLoading,
    setEndOfLoading,
  } = useAnimationControls((state) => ({
    setStartOfAnimation: state.setStartOfAnimation,
    startOfAnimation: state.startOfAnimation,
    endOfAnimation: state.endOfAnimation,
    setIsPlayingIntroSong: state.setIsPlayingIntroSong,
    endOfLoading: state.endOfLoading,
    setEndOfLoading: state.setEndOfLoading,
  }));
  const [personEntered, setPersonEntered] = useState(false);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress >= 100 && personEntered) {
      setTimeout(() => {
        setEndOfLoading(true);
      }, AMOUNT_OF_TIME_LOADING_SCREEN);

      setTimeout(() => {
        setStartOfAnimation(true);
        setIsPlayingIntroSong(true);
      }, START_ANIMATION);
    }
  }, [progress, personEntered]);

  return (
    <>
      {progress !== 100 && <LoadingScreen />}
      <Canvas
        shadows
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.antiAlias = true;
          gl.setPixelRatio(2.0);
          gl.setSize(window.innerWidth, window.innerHeight);
          // gl.setPixelRatio(2)
        }}
        camera={{
          position: [END_CAMERA_POSITION.x, END_CAMERA_POSITION.y, END_CAMERA_POSITION.z],
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <>
        {progress >= 100 && (
          <Button
            fadeOut={personEntered}
            onClick={() => {
              setPersonEntered(true);
            }}
          >
            Enter Configurator
          </Button>
        )}
        {personEntered && (
          <LoadingBar className="ripple">
            <div className={`${endOfLoading && 'fade-out'}`} />
            <div className={`${endOfLoading && 'fade-out'}`} />
          </LoadingBar>
        )}
        <CinematicHalfScreen
          top
          endOfAnimation={endOfAnimation}
          startOfAnimation={startOfAnimation}
        />
        <CinematicHalfScreen
          top={false}
          endOfAnimation={endOfAnimation}
          startOfAnimation={startOfAnimation}
        />
      </>
      {endOfAnimation ? <Overlay /> : null}
    </>
  );
};
