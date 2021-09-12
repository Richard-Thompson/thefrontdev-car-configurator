import { useEffect } from 'react';
import * as THREE from 'three';
import { useAnimations } from '@react-three/drei';
import { useAnimationControls } from 'context/animationControls';
import { useControls } from 'context/controlsContext';
import { useThree, useFrame } from '@react-three/fiber';
import { CINEMATIC_DURATION, END_CAMERA_POSITION } from 'components/utility/constants';

export const UpdateIntroCamera = ({
  animations, group: rootRef, camSphere, camLookAt,
}) => {
  const { startOfAnimation, endOfAnimation, setEndOfAnimation } = useAnimationControls(
    (state) => ({
      startOfAnimation: state.startOfAnimation,
      endOfAnimation: state.endOfAnimation,
      setEndOfAnimation: state.setEndOfAnimation,
    }),
  );
  const { controlsRef } = useControls((state) => ({
    controlsRef: state.controlsRef,
  }));
  const { camera } = useThree();
  const { actions, mixer } = useAnimations(animations, rootRef);

  useEffect(() => {
    if (startOfAnimation) {
      const lookatAction = actions['Sphere.001Action'];
      const camPosAction = actions.SphereAction;
      lookatAction.clampWhenFinished = true;
      camPosAction.clampWhenFinished = true;
      lookatAction.setDuration(CINEMATIC_DURATION).setLoop(THREE.LoopOnce, 0).play();
      camPosAction.setDuration(CINEMATIC_DURATION).setLoop(THREE.LoopOnce, 0).play();
      mixer.addEventListener('finished', () => {
        setEndOfAnimation(true);

        const { x, y, z } = END_CAMERA_POSITION;

        camera.position.x = x;
        camera.position.y = y;
        camera.position.z = z;
      });
    }
  }, [startOfAnimation]);

  useFrame(() => {
    if (camSphere.current && camLookAt.current && !endOfAnimation) {
      const { x, y, z } = camSphere.current.position;
      const camLookAtPosition = camLookAt.current.position;
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
      camera.lookAt(camLookAtPosition);

      if (controlsRef?.current) {
        controlsRef.current.update();
      }
    }
  });

  return null;
};
