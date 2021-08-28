import React, { Suspense, useEffect, useState } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import {
    Canvas,
    CinematicHalfScreen,
    LoadingScreen,
    LoadingBar
} from './Scene.styles';
import Effects from '../Effects/Postprocessing';
import CarModel from '../CarModel/Car';
import { Overlay } from '../Overlay/Overlay';
import { Controls } from '../controls/controls';
import { useAnimationControls } from '../../Context/animationControls';
import {
    AMOUNT_OF_TIME_LOADING_SPINNER,
    START_ANIMATION
} from '../../constants';

export const Scene = () => {
    const { endOfLoading, setEndOfLoading } = useAnimationControls(state => ({
        endOfLoading: state.endOfLoading,
        setEndOfLoading: state.setEndOfLoading
    }))
    const { endOfAnimation, startOfAnimation, setStartOfAnimation } = useAnimationControls(state => ({
        setStartOfAnimation: state.setStartOfAnimation,
        startOfAnimation: state.startOfAnimation,
        endOfAnimation: state.endOfAnimation,
    }))
    const {
        active,
        progress,
        errors,
        item,
        loaded,
        total
    } = useProgress();

    useEffect(() => {
        if (progress >= 100) {

            setTimeout(() => {
                setEndOfLoading(true);
                console.log({ timeout: true })
            }, AMOUNT_OF_TIME_LOADING_SPINNER);

            setTimeout(() => {
                setStartOfAnimation(true);
                console.log({ timeout: true })
            }, START_ANIMATION)
        }
    }, [progress])


    return (
        <>
            {progress !== 100 && (
                <LoadingScreen />
            )}
            <Canvas
                shadows
                onCreated={(gl) => {
                    console.log({ gl })
                    const renderer = gl.gl;
                    const height = window.innerHeight;
                    const width = window.innerWidth;
                    // let pixelRatio = window.devicePixelRatio || 0;
                    // // let pixelRatio = window.devicePixelRatio || 0;
                    renderer.setSize(width, height);
                    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                }}
                camera={{
                    position: [0, 1.0, 5.0],
                }}
            >

                <color attach="background" args={["white"]} roughness={1.0} />
                <gridHelper args={[10, 10]} />
                <Suspense fallback={null}>
                    <color attach="background" args={["black"]} />

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
            </Canvas >
            <>
                <CinematicHalfScreen
                    top
                    endOfAnimation={endOfAnimation}
                    startOfAnimation={startOfAnimation}
                >
                </CinematicHalfScreen>
                <LoadingBar className="ripple">
                    <div className={`${endOfLoading && 'fade-out'}`}></div>
                    <div className={`${endOfLoading && 'fade-out'}`}></div>
                </LoadingBar>
                <CinematicHalfScreen
                    top={false}
                    endOfAnimation={endOfAnimation}
                    startOfAnimation={startOfAnimation}
                />
            </>
            <Overlay />
        </>
    )
}