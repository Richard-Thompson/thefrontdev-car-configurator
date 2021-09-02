/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { CINEMATIC_DURATION, END_CAMERA_POSITION } from 'components/utility/constants';
import { playAudio } from '../../utils';
import { useAnimationControls } from '../../../context/animationControls';
import { useControls } from '../../../context/controlsContext';

export default function Model(props) {
  const group = useRef();
  const camSphere = useRef(null);
  const camLookAt = useRef(null);
  const { nodes, materials, animations } = useGLTF('/car/final-1.gltf');
  const { camera } = useThree();

  const {
    isPlayingIntroSong, startOfAnimation, endOfAnimation, setEndOfAnimation,
  } = useAnimationControls((state) => ({
    isPlayingIntroSong: state.isPlayingIntroSong,
    startOfAnimation: state.startOfAnimation,
    endOfAnimation: state.endOfAnimation,
    setEndOfAnimation: state.setEndOfAnimation,
  }));

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
  const [initialPosition, setInitialPosition] = useState(camera.position);
  const { actions, mixer } = useAnimations(animations, group);
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

  useEffect(() => {
    if (isPlayingIntroSong) {
      playAudio(
        camera,
        '/car/audio/runaway-oakvale-of-albion-main-version-03-13-3073-timestrech.wav',
      );
    }
  }, [isPlayingIntroSong]);

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
        console.log({ finished: true });

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
      // console.log({ x, y, z, camera })
    }
  });

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
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {/* <Suspense fallback={null}>
                    <mesh>
                        <CarIntroAudio />

                    </mesh>

                </Suspense> */}
        <group
          name="RootNode_(gltf_orientation_matrix)"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <group name="RootNode_(model_correction_matrix)">
            <group name="Tesla_Model_Sfbx" rotation={[Math.PI / 2, 0, 0]}>
              <group name="RootNode">
                <group
                  name="cal"
                  position={[94.0564, 24.6265, 153.9808]}
                  rotation={[2.8608, 0.3026, 0.0857]}
                  scale={[1.0771, 1.0771, 1.0771]}
                >
                  <mesh
                    name="cal_Material008_0"
                    layers={1}
                    geometry={nodes.cal_Material008_0.geometry}
                    material={nodes.cal_Material008_0.material}
                  />
                </group>
                <group
                  name="cal001"
                  position={[-94.0564, 24.6265, 153.9808]}
                  rotation={[-0.2808, -0.3026, -0.0857]}
                  scale={[-1.0771, -1.0771, -1.0771]}
                >
                  <mesh
                    name="cal001_Material008_0"
                    layers={1}
                    geometry={nodes.cal001_Material008_0.geometry}
                    material={nodes.cal001_Material008_0.material}
                  />
                </group>
                <group
                  name="cal002"
                  position={[-94.0564, 24.6265, -179.1316]}
                  rotation={[-2.8588, 0, 0]}
                  scale={[-1.0771, -1.0771, -1.0771]}
                >
                  <mesh
                    name="cal002_Material008_0"
                    layers={1}
                    geometry={nodes.cal002_Material008_0.geometry}
                    material={nodes.cal002_Material008_0.material}
                  />
                </group>
                <group
                  name="cal003"
                  position={[94.0564, 24.6265, -179.1316]}
                  rotation={[0.2828, 0, 0]}
                  scale={[1.0771, 1.0771, 1.0771]}
                >
                  <mesh
                    name="cal003_Material008_0"
                    layers={1}
                    geometry={nodes.cal003_Material008_0.geometry}
                    material={nodes.cal003_Material008_0.material}
                  />
                </group>
                <group name="object" scale={0.1029}>
                  <mesh
                    name="object_emit_0"
                    layers={1}
                    geometry={nodes.object_emit_0.geometry}
                    material={materials.emit}
                  />
                </group>
                <group name="object001" scale={0.1029}>
                  <mesh
                    name="object001_int_0"
                    layers={1}
                    geometry={nodes.object001_int_0.geometry}
                    material={materials.material}
                  />
                </group>
                <group name="object002" scale={0.1029}>
                  <mesh
                    name="object002_red_0"
                    layers={1}
                    geometry={nodes.object002_red_0.geometry}
                    material={materials.material_6}
                  />
                </group>
                <group name="object003" scale={0.1029}>
                  <mesh
                    name="object003_Material004_0"
                    layers={1}
                    geometry={nodes.object003_Material004_0.geometry}
                    material={materials['Material.004']}
                  />
                </group>
                <group name="object004" scale={0.1029}>
                  <mesh
                    name="object004_glack_0"
                    layers={1}
                    geometry={nodes.object004_glack_0.geometry}
                    material={materials.glack}
                  />
                </group>
                <group name="object005" scale={0.1029}>
                  <mesh
                    name="object005_bod_0"
                    layers={1}
                    geometry={nodes.object005_bod_0.geometry}
                    material={materials.material_9}
                  />
                </group>
                <group name="object006" scale={0.1029}>
                  <mesh
                    name="object006_chr_0"
                    layers={1}
                    geometry={nodes.object006_chr_0.geometry}
                    material={materials.material_10}
                  />
                </group>
                <group name="object007" scale={0.1029}>
                  <mesh
                    name="object007_flack_0"
                    layers={1}
                    geometry={nodes.object007_flack_0.geometry}
                    material={materials.flack}
                  />
                </group>
                <group name="object008" scale={0.1029}>
                  <mesh
                    name="object008_Material002_0"
                    layers={1}
                    geometry={nodes.object008_Material002_0.geometry}
                    material={materials['Material.002']}
                  />
                </group>
                <group name="object009" scale={0.1029}>
                  <mesh
                    name="object009_Material005_0"
                    layers={1}
                    geometry={nodes.object009_Material005_0.geometry}
                    material={materials['Material.005']}
                  />
                </group>
                <group name="object010" scale={0.1029}>
                  <mesh
                    name="object010_glass_0"
                    layers={2}
                    geometry={nodes.object010_glass_0.geometry}
                    // material={materials.glass}
                  >
                    <meshStandardMaterial attach="material" color="green" />
                  </mesh>
                </group>
                <group name="object012" scale={0.1029}>
                  <mesh
                    name="object012_Material001_0"
                    layers={1}
                    geometry={nodes.object012_Material001_0.geometry}
                    material={materials['Material.001']}
                  />
                </group>
                <group name="object013" scale={0.1029}>
                  <mesh
                    name="object013_grill_0"
                    layers={1}
                    geometry={nodes.object013_grill_0.geometry}
                    material={materials.grill}
                  />
                </group>
                <group name="object014" scale={0.1029}>
                  <mesh
                    name="object014_Material003_0"
                    layers={1}
                    geometry={nodes.object014_Material003_0.geometry}
                    material={materials['Material.003']}
                  />
                </group>
                <group name="object015" scale={0.1029}>
                  <mesh
                    name="object015_rev_0"
                    layers={1}
                    geometry={nodes.object015_rev_0.geometry}
                    material={materials.material_18}
                  />
                </group>
                <group name="object016" scale={0.1029}>
                  <mesh
                    name="object016_refl_0"
                    layers={1}
                    geometry={nodes.object016_refl_0.geometry}
                    material={materials.refl}
                  />
                </group>
                <group
                  name="wheel"
                  position={[94.0564, 24.6265, 153.9808]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 10]}
                  scale={1.2222}
                >
                  <mesh
                    name="wheel_Material006_0"
                    layers={1}
                    geometry={nodes.wheel_Material006_0.geometry}
                    material={nodes.wheel_Material006_0.material}
                  />
                  <mesh
                    name="wheel_Material007_0"
                    layers={1}
                    geometry={nodes.wheel_Material007_0.geometry}
                    material={nodes.wheel_Material007_0.material}
                  />
                  <mesh
                    name="wheel_Rims_0"
                    layers={1}
                    geometry={nodes.wheel_Rims_0.geometry}
                    material={nodes.wheel_Rims_0.material}
                  />
                </group>
                <group
                  name="wheel001"
                  position={[-94.0564, 24.6265, 153.9808]}
                  rotation={[-Math.PI / 2, 0, 2.8274]}
                  scale={[1.2222, 1.2222, 1.2222]}
                >
                  <mesh
                    name="wheel001_Material006_0"
                    layers={1}
                    geometry={nodes.wheel001_Material006_0.geometry}
                    material={nodes.wheel001_Material006_0.material}
                  />
                  <mesh
                    name="wheel001_Material007_0"
                    layers={1}
                    geometry={nodes.wheel001_Material007_0.geometry}
                    material={nodes.wheel001_Material007_0.material}
                  />
                  <mesh
                    name="wheel001_Rims_0"
                    layers={1}
                    geometry={nodes.wheel001_Rims_0.geometry}
                    material={nodes.wheel001_Rims_0.material}
                  />
                </group>
                <group
                  name="wheel002"
                  position={[-94.0564, 24.6265, -179.1316]}
                  rotation={[-Math.PI / 2, 0, -Math.PI]}
                  scale={1.2222}
                >
                  <mesh
                    name="wheel002_Material006_0"
                    layers={1}
                    geometry={nodes.wheel002_Material006_0.geometry}
                    material={nodes.wheel002_Material006_0.material}
                  />
                  <mesh
                    name="wheel002_Material007_0"
                    layers={1}
                    geometry={nodes.wheel002_Material007_0.geometry}
                    material={nodes.wheel002_Material007_0.material}
                  />
                  <mesh
                    name="wheel002_Rims_0"
                    layers={1}
                    geometry={nodes.wheel002_Rims_0.geometry}
                    material={nodes.wheel002_Rims_0.material}
                  />
                </group>
                <group
                  name="wheel003"
                  position={[94.0564, 24.6265, -179.1316]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={1.2222}
                >
                  <mesh
                    name="wheel003_Material006_0"
                    layers={1}
                    geometry={nodes.wheel003_Material006_0.geometry}
                    material={nodes.wheel003_Material006_0.material}
                  />
                  <mesh
                    name="wheel003_Material007_0"
                    layers={1}
                    geometry={nodes.wheel003_Material007_0.geometry}
                    material={nodes.wheel003_Material007_0.material}
                  />
                  <mesh
                    name="wheel003_Rims_0"
                    layers={1}
                    geometry={nodes.wheel003_Rims_0.geometry}
                    material={nodes.wheel003_Rims_0.material}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group name="BezierCurve" position={[0, 0, 8.8341]} />
        <group name="Empty001" />
        <mesh
          ref={camSphere}
          name="Sphere"
          // layers={1}
          geometry={nodes.Sphere.geometry}
          material={nodes.Sphere.material}
          position={[0.085, -0.6858, 14.6326]}
          rotation={[1.6176, -0.0003, -0.0058]}
        />
        <mesh
          ref={camLookAt}
          name="Sphere001"
          // layers={1}
          geometry={nodes.Sphere001.geometry}
          material={nodes.Sphere001.material}
          opacity={0}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/car/final-1.gltf');
