import React, { Suspense } from 'react';
import { Canvas } from './Scene.styles';
import { OrbitControls, Plane } from "@react-three/drei";
import Effects from '../Effects/Postprocessing';
import CarModel from '../CarModel/Car';
import * as THREE from 'three';
import { softShadows } from "@react-three/drei"


// Inject soft shadow shader
// softShadows()

export const Scene = () => {
    return (
        <Canvas shadows onCreated={(gl) => {
            console.log({ gl })
            const renderer = gl.gl;
            const height = window.innerHeight;
            const width = window.innerWidth;
            // let pixelRatio = window.devicePixelRatio || 0;
            // // let pixelRatio = window.devicePixelRatio || 0;
            renderer.setSize(width, height);
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }}>
            <color attach="background" args={["#393939"]} roughness={1.0} />
            <gridHelper args={[10, 10]} />
            <OrbitControls
                position={[0, 5, 10]}
                maxAzimuthAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 3}
                minAzimuthAngle={-Math.PI / 2}
                minPolarAngle={Math.PI / 3}
                minDistance={5}
                maxDistance={7}
            />

            <Suspense fallback={null}>
                <ambientLight intensity={0.4} color="white" />
                <directionalLight
                    castShadow
                    position={[2.5, 8, 5]}
                    intensity={10.5}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                    color="white"
                />
                <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
                <pointLight position={[0, -10, 0]} intensity={1.5} color="white" />
                <CarModel />
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeBufferGeometry attach="geometry" args={[100, 100]} />
                    <meshStandardMaterial attach="material" color="black" roughness={1.0} />
                </mesh>
                <Effects />
            </Suspense>
        </Canvas >
    )
}