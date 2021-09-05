import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { useControls } from '../../../context/controlsContext';

export const UpdateZoomInCamera = ({ nodes }) => {
  const {
    activeObject, setActiveObject, activeObjectName, setNodes, controlsRef,
  } = useControls(
    (state) => ({
      setActiveObject: state.setActiveObject,
      activeObject: state.activeObject,
      activeObjectName: state.activeObjectName,
      setNodes: state.setNodes,
      controlsRef: state.controlsRef,
    }),
  );
  const { camera } = useThree();
  const [initialPosition, setInitialPosition] = useState(camera.position);
  // const [initialTarget] = useMemo(() => [controlsRef?.target],
  //   []);

  useEffect(() => {
    if (nodes) {
      setNodes(nodes);
    }

    function onPositionChange() {
      if (controlsRef.enabled) {
        setInitialPosition(camera.position);
      }
    }

    if (controlsRef) {
      controlsRef.addEventListener('change', onPositionChange);
    }
  }, []);

  useSpring({
    config: { duration: activeObject ? 2000 : 0, clamp: true, precision: 1 },
    percentage: activeObject ? 1 : 0,
    onChange: ({ value: { percentage } }) => {
      if (percentage > 0 && controlsRef) {
        // percentage = Math.round(percent)
        controlsRef.enabled = false;
        const start = initialPosition;
        // console.log({ initialPosition })
        console.log({ percentage });
        // nodes[activeObjectName].scale = new THREE.Vector3(0.01, 0.01, 0.01)
        const end = nodes[activeObjectName].position;

        // console.log({ end })
        const endCloned = end;
        let endScaled = new THREE.Vector3(endCloned.x, endCloned.y, endCloned.z);
        endScaled = endScaled.multiplyScalar(0.01);

        camera.lookAt(endScaled);
        endScaled.x = endScaled.x + endScaled.x + endScaled.x + endScaled.x;
        // endScaled.z = endScaled.z + endScaled.z;

        const scalarVector = endScaled;

        const lerpedVector = new THREE.Vector3();
        lerpedVector.lerpVectors(start, scalarVector, percentage / 10);
        camera.position.z = lerpedVector.z;
        camera.position.x = lerpedVector.x;
        camera.position.y = lerpedVector.y;
      }
    },
    onStart: () => {},
    onRest: () => {
      // console.log({ nodes })
      // nodes[activeObjectName].scale = new THREE.Vector3(0.01, 0.01, 0.01)
      const end = nodes[activeObjectName].position;

      // console.log({ end })
      const endCloned = end;
      let endScaled = new THREE.Vector3(endCloned.x, endCloned.y, endCloned.z);
      endScaled = endScaled.multiplyScalar(0.01);

      controlsRef.enabled = true;
      controlsRef.target = endScaled;
      setActiveObject(false);
    },
  });
  return null;
};
