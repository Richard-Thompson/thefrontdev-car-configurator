import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { END_CAMERA_POSITION } from 'components/utility/constants';
import { useControls } from '../../../context/controlsContext';

export const UpdateZoomInCamera = ({ nodes: initialNodes }) => {
  const [nodes] = useState(() => {
    const tempNodes = initialNodes;
    tempNodes.frontView = { position: END_CAMERA_POSITION };

    return tempNodes;
  });
  const {
    activeObject,
    setActiveObject,
    activeObjectName,
    setActiveObjectName,
    setNodes,
    controlsRef,
  } = useControls((state) => ({
    setActiveObject: state.setActiveObject,
    activeObject: state.activeObject,
    activeObjectName: state.activeObjectName,
    setActiveObjectName: state.setActiveObjectName,
    setNodes: state.setNodes,
    controlsRef: state.controlsRef,
  }));
  const { camera } = useThree();
  const [vectorLookAt] = useState(() => new THREE.Vector3());

  useEffect(() => {
    if (nodes) {
      setNodes(nodes);
    }

    function onPositionChange() {}

    if (controlsRef) {
      controlsRef.addEventListener('change', onPositionChange);
    }
  }, []);

  useSpring({
    config: { duration: activeObject ? 2000 : 0, clamp: true },
    percentage: activeObject ? 1 : 0,
    onChange: ({ value: { percentage } }) => {
      if (percentage > 0 && controlsRef) {
        if (activeObjectName !== 'frontView') {
          controlsRef.enabled = false;
          const end = nodes[activeObjectName].position;

          const endCloned = end;
          let endScaled = new THREE.Vector3(endCloned.x, endCloned.y, endCloned.z);
          endScaled = endScaled.multiplyScalar(0.01);

          camera.lookAt(vectorLookAt.lerp(endScaled, 0.05));
          endScaled.x = endScaled.x + endScaled.x + endScaled.x + endScaled.x;
          camera.position.lerp(endScaled, 0.05);
        } else {
          camera.lookAt(vectorLookAt.lerp(new THREE.Vector3(0, 0, 0), 0.05));
          const end = nodes[activeObjectName].position;
          camera.position.lerp(end, 0.05);
        }
      }
    },
    onStart: () => {},
    onRest: () => {
      // const end = nodes[activeObjectName].position;

      // const endCloned = end;
      // let endScaled = new THREE.Vector3(endCloned.x, endCloned.y, endCloned.z);
      // endScaled = endScaled.multiplyScalar(0.01);

      controlsRef.enabled = true;
      // controlsRef.target = endScaled;
      setActiveObject(false);
      setActiveObjectName(null);
    },
  });
  return null;
};
